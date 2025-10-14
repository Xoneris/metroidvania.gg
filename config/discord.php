<?php

return [
    'webhook' => [
        'isReleased' => [
            'id' => env('DISCORD_ISRELEASED_WEBHOOK_ID'),
            'token' => env('DISCORD_ISRELEASED_WEBHOOK_TOKEN'),
        ],
        'addedToSite' => [
            'id' => env('DISCORD_ISADDED_WEBHOOK_ID'),
            'token' => env('DISCORD_ISADDED_WEBHOOK_TOKEN'),
        ],
        'demoCheck' => [
            'id' => env('DISCORD_DEMOCHECK_WEBHOOK_ID'),
            'token' => env('DISCORD_DEMOCHECK_WEBHOOK_TOKEN'),
        ],
        'sale' => [
            'id' => env('DISCORD_SALE_WEBHOOK_ID'),
            'token' => env('DISCORD_SALE_WEBHOOK_TOKEN'),
        ],
        'releaseChange' => [
            'id' => env('DISCORD_RELEASE_CHANGE_WEBHOOK_ID'),
            'token' => env('DISCORD_RELEASE_CHANGE_WEBHOOK_TOKEN'),
        ],
        'submittedReports' => [
            'id' => env('DISCORD_RELEASE_SUBMITTED_REPORTS_ID'),
            'token' => env('DISCORD_RELEASE_SUBMITTED_REPORTS_TOKEN'),
        ],
        'submittedGames' => [
            'id' => env('DISCORD_RELEASE_SUBMITTED_GAMES_ID'),
            'token' => env('DISCORD_RELEASE_SUBMITTED_GAMES_TOKEN'),
        ],
    ],
];