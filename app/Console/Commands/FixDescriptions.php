<?php

namespace App\Console\Commands;

use App\Models\Games;
use Illuminate\Console\Command;

class FixDescriptions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fix-descriptions';

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
        $this->info("Fixing descriptions...");
        $allGames = Games::all();

        foreach($allGames as $game) {

            $description = $game->description;
            $fix = str_replace('\"', "" ,$description);

            if ($fix !== $game->description) {
                $game->description = $fix;
                $game->save();
                $this->line("Fixed: {$game->name}");   
            }

        }
        $this->info("Fixing done!");
    }
}
