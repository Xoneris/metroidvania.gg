<?php

namespace App\Console\Commands;

use App\Models\Games;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class CheckIfReleaseDateUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:check-if-release-date-update';

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
        function convert_month_to_number($month_name) {

            $month_as_number = "";
            switch ($month_name) {
                case "Jan":
                    $month_as_number = "01";
                    break;
                case "Feb":
                    $month_as_number = "02";
                    break;
                case "Mar":
                    $month_as_number = "03";
                    break;
                case "Apr":
                    $month_as_number = "04";
                    break;
                case "May":
                    $month_as_number = "05";
                    break;
                case "Jun":
                    $month_as_number = "06";
                    break;
                case "Jul":
                    $month_as_number = "07";
                    break;
                case "Aug":
                    $month_as_number = "08";
                    break;
                case "Sep":
                    $month_as_number = "09";
                    break;
                case "Oct":
                    $month_as_number = "10";
                    break;
                case "Nov":
                    $month_as_number = "11";
                    break;
                case "Dec":
                    $month_as_number = "12";
                    break;
            }
            return $month_as_number;
        }

        $today = date("Y-m-d");
        $allGames = Games::select('id','name','release_date','release_window','steam')
            ->where('release_date', '>', $today)
            ->orWhere('release_window', '!=', '')
            ->get();

        # Discord Webhook
        $discord_webhook_id = config('discord.webhook.releaseChange.id');
        $discord_webhook_token = config('discord.webhook.releaseChange.token');

        foreach ($allGames as $game) {

            sleep(1);

            $steamParts = explode('/', $game['steam']); 
            $steamAppId = isset($steamParts[4]) ? $steamParts[4] : null; 
            
            if ($steamAppId) {
                
                $external_api = "https://store.steampowered.com/api/appdetails?appids={$steamAppId}&cc=us&l=en";
                $response = Http::get($external_api);

                if ($response->successful()) {
                    $data = $response->json();
                    
                    $game_is_coming_soon = $data[$steamAppId]['data']['release_date']['coming_soon'] ?? 0;
                    $game_release_date = $data[$steamAppId]['data']['release_date']['date'] ?? 0;

                    if ($game_release_date === "Coming soon" || $game_release_date === "To be announced") {
                        $game_release_date = "TBD";
                    }

                    if ($game_is_coming_soon === true) {

                        $current_release = $game->release_date ? $game->release_date : $game->release_window;

                        if (preg_match('/^[A-Z][a-z]{2} \d{1,2}, \d{4}$/', $game_release_date)) {
                            $derp = explode(' ', $game_release_date);

                            $additonalZeroForSingleDigitDays = strlen($derp[1]) === 2 ? "0" : "";
                            $newRelease = $derp[2] . "-" . convert_month_to_number($derp[0]) . "-" . $additonalZeroForSingleDigitDays . rtrim($derp[1], ",");
                            
                            if ($newRelease !== $game->release_date) {

                                
                                $game->release_date = $newRelease;
                                $game->release_window = "";
                                $game->save();

                                $this->info("{$game->name} - Current: {$current_release} New: {$newRelease}  - {$game->wasChanged()}");
                                
                                Http::post('https://discord.com/api/webhooks/'. $discord_webhook_id .'/'.$discord_webhook_token.'', [
                                    'embeds' => [[
                                        'title' => 'Release Date change - ' . $game["name"],
                                        'description' => "**Old:** " . $current_release . "\n**New:** " . $newRelease,
                                        'color' => hexdec('dd8500'),
                                    ]]
                                ]); 
                            }

                        } else if ($game_release_date !== $game->release_window) {


                            $game->release_date = "";
                            $game->release_window = $game_release_date;
                            $game->save();
                            
                            $this->info("{$game->name} - Current: {$current_release} New: {$game_release_date} - {$game->wasChanged()}");

                            Http::post('https://discord.com/api/webhooks/'. $discord_webhook_id .'/'.$discord_webhook_token.'', [
                                'embeds' => [[
                                    'title' => 'Release Date change - ' . $game["name"],
                                    'description' => "**Old:** " . $current_release . "\n**New:** " . $game_release_date,
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
