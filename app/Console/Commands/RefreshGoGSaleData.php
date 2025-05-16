<?php

namespace App\Console\Commands;

use App\Models\Games;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class RefreshGoGSaleData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:refresh-gog-sale-data';

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
        $releasedGoGGames = Games::where('release_date', '<=', $today)
            ->where('gog', '!=', '')
            ->get();

        foreach ($releasedGoGGames as $game) {

            sleep(1);

            $external_api = "https://www.gog.com/games/ajax/filtered?search={$game->name}&mediaType=game";
            $response = Http::get($external_api);
            
            if ($response->successful()) {
                $data = $response->json();
                
                $discount_percent = $data['products'][0]['price']['discountPercentage'] ?? 0;
                if ($discount_percent > 0 ) {
                    Cache::put("{$game->slug}-gog-discount", $discount_percent, now()->addHours(4));
                } 
            }
        }
        $this->info("GoG sale data refreshed and cached.");
    }
}
