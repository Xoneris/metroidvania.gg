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
            'token' => env('DISCORD_SALE_WEBHOOK_ID'),
        ],
        'releaseChange' => [
            'id' => env('DISCORD_RELEASE_CHANGE_WEBHOOK_ID'),
            'token' => env('DISCORD_RELEASE_CHANGE_WEBHOOK_ID'),
        ]
    ],
];