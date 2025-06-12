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
        ]
    ],
];