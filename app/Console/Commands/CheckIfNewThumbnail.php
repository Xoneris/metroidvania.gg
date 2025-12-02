<?php

namespace App\Console\Commands;

use App\Models\Games;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class CheckIfNewThumbnail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:check-if-new-thumbnail';

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
        $allGames = Games::select('id','name','slug','release_date','release_window','steam')
            ->where('release_date', '>', $today)
            ->orWhere('release_window', '!=', '')
            ->get();

        # Discord Webhook
        $discord_webhook_id = config('discord.webhook.thumbnailChange.id');
        $discord_webhook_token = config('discord.webhook.thumbnailChange.token');

        foreach ($allGames as $game) {

            sleep(1);

            $steamParts = explode('/', $game['steam']); 
            $steamAppId = isset($steamParts[4]) ? $steamParts[4] : null; 
            
            if ($steamAppId) {
                
                $external_api = "https://store.steampowered.com/api/appdetails?appids={$steamAppId}&cc=us&l=en";
                $response = Http::get($external_api);

                if ($response->successful()) {

                    $data = $response->json();
                    $path = storage_path('app/public/thumbnails/' . $game->slug . '.jpg');

                    if (file_exists($path)) {
                    
                        $newThumbnail = $data[$steamAppId]['data']['header_image'];
                        $oldHash = md5_file($path);
                        $newHash = md5_file($newThumbnail);
                        
                        if ($newHash !== $oldHash) {
                            
                            // $this->info("{$game->name} has a outdated thumbnail");
                            $newThumbnailFile = Http::get($newThumbnail);

                            if ($newThumbnailFile->failed()) {
                                // return back()->withErrors(['file_url' => 'Unable to download file.']);
                                $this->info("{$game->name} unable to download file.");
                            } else {

                                $filename = $game->slug . ".jpg";
                                Storage::put("public/thumbnails/{$filename}", $newThumbnailFile->body());
                                $this->info("{$game->name} successfuly replaced");
                                Http::post('https://discord.com/api/webhooks/'. $discord_webhook_id .'/'.$discord_webhook_token.'', [
                                    'embeds' => [[
                                        'title' => $game["name"] . ' has a new thumbnail!',
                                        'image' => [
                                            'url' => 'https://www.metroidvania.gg/storage/thumbnails/' . $game->slug . '.jpg'
                                        ],
                                        'color' => hexdec('dd8500'),
                                    ]]
                                ]);
                            }
                        }
                    }

                    // if ($game_is_coming_soon === true) {

                    //     $current_release = $game->release_date ? $game->release_date : $game->release_window;

                    //     if (preg_match('/^[A-Z][a-z]{2} \d{1,2}, \d{4}$/', $game_release_date)) {
                    //         $derp = explode(' ', $game_release_date);

                    //         $additonalZeroForSingleDigitDays = strlen($derp[1]) === 2 ? "0" : "";
                    //         $newRelease = $derp[2] . "-" . convert_month_to_number($derp[0]) . "-" . $additonalZeroForSingleDigitDays . rtrim($derp[1], ",");
                            
                    //         if ($newRelease !== $game->release_date) {

                                
                    //             $game->release_date = $newRelease;
                    //             $game->release_window = "";
                    //             $game->save();

                    //             $this->info("{$game->name} - Current: {$current_release} New: {$newRelease}  - {$game->wasChanged()}");
                                
                    //             Http::post('https://discord.com/api/webhooks/'. $discord_webhook_id .'/'.$discord_webhook_token.'', [
                    //                 'embeds' => [[
                    //                     'title' => 'Release Date change - ' . $game["name"],
                    //                     'description' => "**Old:** " . $current_release . "\n**New:** " . $newRelease,
                    //                     'color' => hexdec('dd8500'),
                    //                 ]]
                    //             ]); 
                    //         }

                    //     } else if ($game_release_date !== $game->release_window) {


                    //         $game->release_date = "";
                    //         $game->release_window = $game_release_date;
                    //         $game->save();
                            
                    //         $this->info("{$game->name} - Current: {$current_release} New: {$game_release_date} - {$game->wasChanged()}");

                    //         Http::post('https://discord.com/api/webhooks/'. $discord_webhook_id .'/'.$discord_webhook_token.'', [
                    //             'embeds' => [[
                    //                 'title' => 'Release Date change - ' . $game["name"],
                    //                 'description' => "**Old:** " . $current_release . "\n**New:** " . $game_release_date,
                    //                 'color' => hexdec('dd8500'),
                    //             ]]
                    //         ]);

                    //     } 
                    // }
                }
            }
        }
    }
}
