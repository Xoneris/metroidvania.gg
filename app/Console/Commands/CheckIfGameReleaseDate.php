<?php

namespace App\Console\Commands;

use App\Models\Games;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CheckIfGameReleaseDate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:check-if-game-release-date';

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
        // Log::channel('demo_check')->info("Daily Demo check: " . $today);

        $allGames = Games::all();

        foreach ($allGames as $game) {

            sleep(1);

            $steamParts = explode('/', $game['steam']); 
            $steamAppId = isset($steamParts[4]) ? $steamParts[4] : null; 
            
            if ($steamAppId) {
                
                $external_api = "https://store.steampowered.com/api/appdetails?appids={$steamAppId}&cc=us&l=en";
                $response = Http::get($external_api);

                if ($response->successful()) {
                    $data = $response->json();
                    
                    $game_has_demo = $data[$steamAppId]['data']['demos'][0]['appid'] ?? 0;

                    if ($game_has_demo > 0 ) {
                        if ($game->demo != 1) {
                            $game->demo = 1;
                            $game->save();
                            Log::channel('demo_check')->info("Updated: ". $game->name ." has a demo now!");
                        }
                    } else if ($game->demo != 0) {
                        $game->demo = 0;
                        $game->save();
                        Log::channel('demo_check')->info("Updated: ". $game->name ." no longer has a demo!");
                    }
                }
            } else if ($game->demo != 0) {
                $game->demo = 0;
                $game->save();
            }
        }
        Log::channel('demo_check')->info("------------------------------------------");
    }
}
