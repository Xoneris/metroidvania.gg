<?php

namespace App\Console\Commands;

use App\Models\Games;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class CheckReleaseToday extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:check-release-today';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $today = date("Y-m-d");
        $releasingToday = Games::where('release_date', '=', $today)
            ->get();

        foreach ($releasingToday as $game) {

            if (!Cache::has("{$game->slug}-released")) {
                Cache::put("{$game->slug}-released", false, now()->addHours(24));
            } 
            
            if (Cache::get("{$game->slug}-released") == false) {

                $steamParts = explode('/', $game['steam']); 
                $steamAppId = isset($steamParts[4]) ? $steamParts[4] : null; 
            
                if ($steamAppId) {
                    
                    $external_api = "https://store.steampowered.com/api/appdetails?appids={$steamAppId}&cc=us&l=en";
                    $response = Http::get($external_api);
                    
                    if ($response->successful()) {
                        $data = $response->json();
                        
                        $isReleased = $data[$steamAppId]['data']['release_date']['coming_soon'];
                        
                        if (!$isReleased) {
                            
                            Cache::put("{$game->slug}-released", true, now()->addHours(24));
                        
                            $discord_webhook_id = config('discord.webhook.isReleased.id');
                            $discord_webhook_token = config('discord.webhook.isReleased.token');
                            
                            Http::post('https://discord.com/api/webhooks/'. $discord_webhook_id .'/'.$discord_webhook_token.'', [
                                'embeds' => [[
                                    'title' => 'New Game just released!',
                                    'description' => "**Name:** " . $game['name'] . "\n\n**Description:** " . $game['description'] . "\n\n[Find out more!](https://www.metroidvania.gg/Game/" . $game['slug']. ")",
                                    'image' => [
                                        'url' => 'https://www.metroidvania.gg/storage/thumbnails/' . $game['slug'] . '.jpg'
                                    ],
                                    'color' => hexdec('dd8500'),
                                ]]
                            ]);
                                    
                        } 
                    }
                } 
            }
        }
    }
}
