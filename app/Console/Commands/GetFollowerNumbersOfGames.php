<?php

namespace App\Console\Commands;

use App\Models\Games;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class GetFollowerNumbersOfGames extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:get-follower-numbers-of-games';

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
        $apiKey = config('services.games_popularity.key');
        $today = date("Y-m-d");

        $allGames = Games::select('id','name','slug','release_date','release_window','steam')
            ->where('release_date', '>', $today)
            ->orWhere('release_window', '!=', '')
            ->get();

        foreach ($allGames as $game) {

            sleep(1);

            $steamParts = explode('/', $game['steam']); 
            $steamAppId = isset($steamParts[4]) ? $steamParts[4] : null; 
            
            if ($steamAppId) {
                
                $external_api = "https://games-popularity.com/swagger/api/game/followers/{$steamAppId}?apiKey={$apiKey}";
                $response = Http::get($external_api);

                if ($response->successful()) {
                    
                    $data = $response->json();
                    $followers = $data['history'][0]['followers'] ?? 0;

                    if ($followers > 0 ) {

                        Cache::put("{$game->slug}-follower-count", $followers, now()->addHours(24));

                    }
                }
            } 
        }
    }
}
