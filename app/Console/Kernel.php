<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // $schedule->command('inspire')->hourly();
        $schedule->command('app:refresh-steam-sale-data')->everyFourHours();
        $schedule->command('app:refresh-gog-sale-data')->everyFourHours();
        $schedule->command('app:check-if-game-has-demo')->daily();
        $schedule->command('app:check-steam-reviews')->daily();
        $schedule->command('app:check-release-today')->everyTenMinutes();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
