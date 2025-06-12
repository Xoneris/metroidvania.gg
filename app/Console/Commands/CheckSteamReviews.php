<?php

namespace App\Console\Commands;

use App\Models\Games;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CheckSteamReviews extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:check-steam-reviews';

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
        $releasedGames = Games::where('release_date', '<=', $today)
            ->get();

        foreach ($releasedGames as $game) {

            sleep(1);
            
            $steamParts = explode('/', $game['steam']); 
            $steamAppId = isset($steamParts[4]) ? $steamParts[4] : null; 
            
            if ($steamAppId) {
                
                $external_api = "https://store.steampowered.com/appreviews/{$steamAppId}?json=1&purchase_type=all&language=all";
                $response = Http::get($external_api);
                
                if ($response->successful()) {
                    $data = $response->json();
                    
                    $stream_review = $data["query_summary"] ?? 0;
                    if ($stream_review > 0 ) {
                        Cache::put("{$game->slug}-steam-review", $stream_review, now()->addHours(4));
                    } 
                }
            } 
        }
        $this->info("Steam review data refreshed and cached.");
    }
}
