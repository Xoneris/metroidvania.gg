<?php

namespace App\Console\Commands;

use App\Models\Games;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class RefreshSteamSaleData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:refresh-steam-sale-data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Refreshes Steam Sale data';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $today = date("Y-m-d");
        $releasedGames = Games::where('release_date', '<=', $today)
            ->orderBy('release_date', 'DESC')
            ->get();

        foreach ($releasedGames as $game) {

            sleep(1);

            $steamParts = explode('/', $game['steam']); 
            $steamAppId = isset($steamParts[4]) ? $steamParts[4] : null; 
            
            if ($steamAppId) {
                
                $external_api = "https://store.steampowered.com/api/appdetails?appids={$steamAppId}&cc=us&l=en";
                $response = Http::get($external_api);
                
                if ($response->successful()) {
                    $data = $response->json();
                    
                    $discount_percent = $data[$steamAppId]['data']['price_overview']['discount_percent'] ?? 0;
                    if ($discount_percent > 0 ) {
                        Cache::put("{$game->slug}-steam-discount", $discount_percent, now()->addHours(4));
                    } 
                }
            } 
        }
        $this->info("Steam sale data refreshed and cached.");
    }
}
