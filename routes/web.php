<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SubmitGamesController;
use App\Models\Games;
use App\Models\Reports;
use App\Models\SubmitGames;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function (Request $request) {

    #In case people come to this site from a different website
    $otherWebsiteRef = $request->query('ref');

    #Games for Banner Section.
    $today = date("Y-m-d");

    $todayGames = Games::where('release_date', '=', $today)
        ->orderBy('release_date', 'DESC')
        ->get();

    $released = [];
    $notReleased = [];

    foreach($todayGames as $game){
        $isReleased = Cache::get("{$game->slug}-released");
        if ($isReleased) {
            $released[] = $game;
        } else {
            $notReleased[] = $game;
        }
    }

    if (!empty($released)){
        $bannerSectionRecentRelease = $released[array_rand($released)];
    } else {
        $bannerSectionRecentRelease = Games::where('release_date', '<', $today)
        ->orderBy('release_date', 'DESC')
        ->inRandomOrder()
        ->first();
    }

    if (!empty($notReleased)){
        $bannerSectionComingSoon = $notReleased[array_rand($notReleased)];
    } else {
        $bannerSectionComingSoon = Games::where('release_date', '>', $today)
        ->orderBy('release_date', 'ASC')
        ->inRandomOrder()
        ->first();
    }


    $bannerSectionKickstarterLive = Games::where('kickstarter_status', 'Live')
        ->inRandomOrder()
        ->first();

    $bannerSectionKickstarterUpcoming = Games::where('kickstarter_status', 'Upcoming')
        ->inRandomOrder()
        ->first();

        
    $bannerSectionGames = [
        $bannerSectionRecentRelease,
        $bannerSectionComingSoon,
        $bannerSectionKickstarterLive,
        $bannerSectionKickstarterUpcoming,
    ];
    // dd($bannerSectionGames);
        
    # Games releasing Today
    $todayGames = Games::where('release_date', '=', $today)
        ->orderBy('release_date', 'DESC')
        ->get();

    $gamesIsReleased = [];
    $gamesNotReleased = [];

    foreach($todayGames as $game){
        $isReleased = Cache::get("{$game->slug}-released");
        if ($isReleased) {
            $gamesIsReleased[] = $game;
        } else {
            $gamesNotReleased[] = $game;
        }
    }

    #5 upcoming Games.
    $upcomingGamesDB = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('release_date', '>', $today)
        ->orderBy('release_date', 'ASC')
        ->skip(0)
        ->take(5-count($gamesNotReleased))
        ->get()
        ->toArray();

    $upcomingGames = array_merge($gamesNotReleased,$upcomingGamesDB);

    #5 last released Games. 
    $recentlyReleasedDB = Games::where('release_date', '<', $today)
        ->orderBy('release_date', 'DESC')
        ->skip(0)
        ->take(5-count($gamesIsReleased))
        ->get()
        ->toArray();

    $recentlyReleased = array_merge($gamesIsReleased,$recentlyReleasedDB);

    #5 random games on (steam) sale
    $releasedGames = Games::where('release_date', '<=', $today)
        ->inRandomOrder() 
        ->get();

    foreach ($releasedGames as $game) {
        $discount = Cache::get("{$game->slug}-steam-discount", 0);
        $game->steam_discount = $discount;
    }
    
    $discountedGames = $releasedGames->filter(function ($game) {
        return $game->steam_discount > 0;
    })
        ->skip(0)
        ->take(5)
        ->values();

    #5 random Games with Demos.
    $gamesWithDemos = Games::where('demo', 1)
        ->skip(0)
        ->take(5)
        ->inRandomOrder()   
        ->get();

    #5 random Games in Early Access
    $earlyAccessGames = Games::where('early_access', 1)
        ->skip(0)
        ->take(5)    
        ->inRandomOrder()
        ->get();

    #5 upcoming Kickstarters
    $upcomingKickstarters = Games::where('kickstarter_status', 'Upcoming')
        ->skip(0)
        ->take(5)    
        ->inRandomOrder()
        ->get();

    #5 random Games releasing in 2025.
    $tomorrow = date("Y-m-d",strtotime("tomorrow"));
    $gamesReleasing2025 = Games::where('release_window', 'LIKE', '%2025%')
        ->orWhereBetween('release_date', [$tomorrow,'2025-12-31'])
        ->skip(0)
        ->take(5)
        ->inRandomOrder() 
        ->get();

    #5 random Games releasing in 2026.
    $gamesReleasing2026 = Games::where('release_window', 'LIKE', '%2026%')
        ->orWhereBetween('release_date', ['2026-01-01','2026-12-31'])
        ->skip(0)
        ->take(5)
        ->inRandomOrder() 
        ->get();

    #5 random Games releasing in TBD.
    $gamesReleasingTBD = Games::where('release_window', 'TBD')
        ->skip(0)
        ->take(5)
        ->inRandomOrder()
        ->get();

    #5 last added games. 
    $lastAddedGames = Games::orderBy('id', 'DESC')    
        ->skip(0)
        ->take(5)
        ->get();

    return Inertia::render('Home', [

        'bannerSectionGames' => $bannerSectionGames,
        'upcomingGames' => $upcomingGames,
        'recentlyReleased' => $recentlyReleased,
        'steamSale' => $discountedGames,
        'gamesWithDemos' => $gamesWithDemos,
        'earlyAccessGames' => $earlyAccessGames,
        'upcomingKickstarterGames' => $upcomingKickstarters,
        'releasingIn2025' => $gamesReleasing2025,
        'releasingIn2026' => $gamesReleasing2026,
        'releasingInTBD' => $gamesReleasingTBD,
        'lastAddedGames' => $lastAddedGames,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

// Route::get('/2024', function () {

//     $tomorrow = date("Y-m-d",strtotime("tomorrow"));
//     $gamesReleasing2024 = Games::where('release_window', 'LIKE', '%2024%')
//         ->orWhereBetween('release_date', [$tomorrow,'2024-12-31'])
//         ->inRandomOrder() 
//         ->get();

//     return Inertia::render('SinglePage', [
//         'games' => $gamesReleasing2024,
//         'title' => 'Releasing in 2024',
//     ]);
// });

Route::get('/coming-soon', function () {

    $today = date("Y-m-d");
    $upcomingGames = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('release_date', '>', $today)
        ->orderBy('release_date', 'ASC')
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $upcomingGames,
        'title' => 'Coming Soon',
    ]);
});

Route::get('/2025', function () {

    $tomorrow = date("Y-m-d",strtotime("tomorrow"));
    $gamesReleasing2025 = Games::where('release_window', 'LIKE', '%2025%')
        ->orWhereBetween('release_date', [$tomorrow,'2025-12-31'])
        ->inRandomOrder() 
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $gamesReleasing2025,
        'title' => 'Releasing in 2025',
    ]);
});

Route::get('/2026', function () {

    $gamesReleasing2026 = Games::where('release_window', 'LIKE', '%2026%')
        ->orWhereBetween('release_date', ['2026-01-01','2026-12-31'])
        ->inRandomOrder() 
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $gamesReleasing2026,
        'title' => 'Releasing in 2026',
    ]);
});

Route::get('/TBD', function () {

    $gamesReleasingTBD = Games::where('release_window', 'TBD')
        ->inRandomOrder()
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $gamesReleasingTBD,
        'title' => 'Releasing in TBD',
    ]);
});

Route::get('/EarlyAccess', function () {

    $earlyAccessGames = Games::where('early_access', 1)
        ->inRandomOrder()
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $earlyAccessGames,
        'title' => 'Games in Early Access',
    ]);
});

Route::get('/UpcomingKickstarters', function () {

    $upcomingKickstarters = Games::where('kickstarter_status', 'Upcoming')
        ->inRandomOrder()
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $upcomingKickstarters,
        'title' => 'Upcoming Kickstarters',
    ]);
});

Route::get('/Demos', function () {

    $gamesWithDemos = Games::where('demo', 1)
        ->inRandomOrder()
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $gamesWithDemos,
        'title' => 'Games with Demos',
    ]);
});

Route::get('/Released', function () {
    $today = date("Y-m-d");

    $todayGames = Games::where('release_date', '=', $today)
        ->orderBy('release_date', 'DESC')
        ->get();

    $gamesToday = [];

    foreach($todayGames as $game){
        $isReleased = Cache::get("{$game->slug}-released");
        if ($isReleased) {
            $gamesToday[] = $game;
        }
    }

    $releasedGames = Games::where('release_date', '<', $today)
        ->orderBy('release_date', 'DESC')
        ->get()
        ->toArray();

    $games = array_merge($gamesToday, $releasedGames);

    return Inertia::render('Released', [
        'games' => $games,
    ]);
});

Route::get('/Steam', function () {
    $steamGames = Games::where('steam', '!=', '')
        ->inRandomOrder() 
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $steamGames,
        'title' => 'Games on Steam',
    ]);
    
});

Route::get('/Epic', function () {
    $epicGames = Games::where('epic', '!=', '')
        ->inRandomOrder() 
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $epicGames,
        'title' => 'Games on Epic Games',
    ]);
});

Route::get('/GoG', function () {
    $gogGames = Games::where('gog', '!=', '')
        ->inRandomOrder() 
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $gogGames,
        'title' => 'Games on GoG',
    ]);
});

Route::get('/Playstation', function () {
    $playstationGames = Games::where('playstation', '!=', '')
        ->inRandomOrder() 
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $playstationGames,
        'title' => 'Games on Playstation',
    ]);
});

Route::get('/Xbox', function () {
    $xboxGames = Games::where('xbox', '!=', '')
        ->inRandomOrder() 
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $xboxGames,
        'title' => 'Games on Xbox',
    ]);
});

Route::get('/Nintendo', function () {
    $nintendoGames = Games::where('nintendo', '!=', '')
        ->inRandomOrder() 
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $nintendoGames,
        'title' => 'Games on Nintendo Switch',
    ]);
});

Route::get('/AllGames', function () {
    $allGames = Games::all();

    return Inertia::render('AllGames', [
        'games' => $allGames
    ]);
});

Route::get('/steam-reviews', function () {
    
    $today = date("Y-m-d");
    $releasedGames = Games::where('release_date', '<=', $today)
        ->orderBy('release_date', 'DESC')
        ->get();

    foreach ($releasedGames as $game) {

        $steam_review = Cache::get("{$game->slug}-steam-review", 0);
        $game->steam_review = $steam_review;

    }

    return Inertia::render('SteamReviews', [
        'games' => $releasedGames
    ]);
});

Route::get('/SubmitGame', function () {

    return Inertia::render('SubmitGames',[]);
});

Route::get('/steam-sale', function () {

        $today = date("Y-m-d");
        $releasedGames = Games::where('release_date', '<=', $today)
            ->orderBy('release_date', 'DESC')
            ->get();

        foreach ($releasedGames as $game) {
            $discount = Cache::get("{$game->slug}-steam-discount", 0);
            $game->steam_discount = $discount;
        }
        
        $discountedGames = $releasedGames->filter(function ($game) {
            return $game->steam_discount > 0;
        })->values();
    
    return Inertia::render('SteamSale', [
        'games' => $discountedGames,
        'title' => 'Steam games on Sale',
    ]);
});

Route::get('/gog-sale', function () {

        $today = date("Y-m-d");
        $releasedGoGGames = Games::where('release_date', '<=', $today)
            ->where('gog','!=','')
            ->orderBy('release_date', 'DESC')
            ->get();

        foreach ($releasedGoGGames as $game) {
            $discount = Cache::get("{$game->slug}-gog-discount", 0);
            $game->gog_discount = $discount;
        }
        
        $discountedGames = $releasedGoGGames->filter(function ($game) {
            return $game->gog_discount > 0;
        })->values();
    
    return Inertia::render('GoGSale', [
        'games' => $discountedGames,
        'title' => 'GoG games on Sale',
    ]);
});

Route::get('/Login', function () {
    return Inertia::render('Auth/Login', []);
});


Route::post('/Report', [ReportController::class, 'store']);
Route::put('/Report/{id}', [ReportController::class, 'update'])->middleware(['auth']);

Route::post('/SubmitGames', [SubmitGamesController::class, 'store']);

Route::post('/Login', [AuthenticatedSessionController::class, 'store'])->name('Login');

Route::middleware(['auth'])->prefix('Dashboard')->group(function () {

    Route::get('/', function () {
        return Inertia::render('Dashboard/DashboardHome');
    });
    
    Route::get('/AddGame', function () {
        return Inertia::render('Dashboard/AddGame');
    });

    Route::get('/EditGames', function () {
        
        $allGames = Games::orderBy('name','ASC')
            ->get();

        return Inertia::render('Dashboard/EditGames', [
            'games' => $allGames,
        ]);
    }); 

    Route::get('/demo-check', function () {
        $logPath = storage_path('logs/demo-check.log');
        $logLines = file($logPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        $messages = [];

        foreach ($logLines as $line) {
            // Match everything after the last colon and space
            if (preg_match('/:\s(.+)$/', $line, $matches)) {
                $messages[] = $matches[1];
            }
        }

        return Inertia::render('Dashboard/DemoCheck', [
            'logs' => $messages,
        ]);
    });

    Route::get('/SubmitGames', [SubmitGamesController::class, "index"]);
    Route::get('/Reports', [ReportController::class , "index"]);

    Route::get('/tracker', function () {


        return Inertia::render('Dashboard/Tracker');
    });

});

Route::middleware(['auth'])->patch('/Game/{id}/update', function (Request $request, $id) {

    $game = Games::where('id', $id)->first();

    # Validate
    # ...at some point

    $game->update($request->all());
});

Route::middleware(['auth'])->put('/Game/{slug}/Edit', function (Request $request, $slug) {

    $game = Games::where('slug', $slug)->first();

    # Validate 
    # ...later

    # Replace thumbnail
    # ...at some point
    # Should really do this, I could've used this a few times by now.
    

    # Discord Webhook
    $discord_webhook_id = config('discord.webhook.releaseChange.id');
    $discord_webhook_token = config('discord.webhook.releaseChange.token');

    $oldRelease = $game["release_date"] ? $game["release_date"] : $game["release_window"];
    $newRelease = $request["release_date"] ? $request["release_date"] : $request["release_window"];

    Http::post('https://discord.com/api/webhooks/'. $discord_webhook_id .'/'.$discord_webhook_token.'', [
        'embeds' => [[
            'title' => 'Release Date change - ' . $game["name"],
            'description' => "**Old:** " . $oldRelease . "\n**New:** " . $newRelease,
            'color' => hexdec('dd8500'),
        ]]
    ]);

    

    $game->update($request->all());

    // return to_route('Dashboard');
});

Route::middleware(['auth'])->post('/Game/New', function (Request $request) {

    if ($request['name'] !== "Test") {

        # Validate first
        # At... some point lol

        # Thumbnail
        if ($request["submittedGame"] !== true) {
            $fileName = $request->input('slug') . '.' . $request->file('thumbnail')->getClientOriginalExtension();
            $path = $request->file('thumbnail')->storeAs('thumbnails', $fileName, 'public');
        }

        # Put new game into the DB
        Games::create([
            'name' => $request['name'],
            'developer' => $request['developer'],
            'publisher' => $request['publisher'],
            'description' => $request['description'],
            'release_window' => $request['release_window'],
            'slug' => $request['slug'],
            'demo' => $request['demo'],
            'early_access' => $request['early_access'],
            'trailer' => $request['trailer'],
            'twitter' => $request['twitter'],
            'epic' => $request['epic'],
            'facebook' => $request['facebook'],
            'gog' => $request['gog'],
            'homepage' => $request['website'],
            'instagram' => $request['instagram'],
            'nintendo' => $request['switch'],
            'playstation' => $request['playstation'],
            'steam' => $request['steam'],
            'tiktok' => $request['tiktok'],
            'xbox' => $request['xbox'],
            'youtube' => $request['youtube'],
            'kickstarter_page' => $request['kickstarter_page'],
            'discord' => $request['discord'],
            'release_date' => $request['release_date'],
            'kickstarter_status' => $request['kickstarter_status'],
            // '' => $request[''],
        ]);

        if ($request["submittedGame"] === true) {
            
            $submittedGame = SubmitGames::where('slug', $request['slug'])->first();
            $submittedGame->isAdded = true;
            $submittedGame->save();
        }
    }
    
    # Discord Webhook
    $discord_webhook_id = config('discord.webhook.addedToSite.id');
    $discord_webhook_token = config('discord.webhook.addedToSite.token');

    Http::post('https://discord.com/api/webhooks/'. $discord_webhook_id .'/'.$discord_webhook_token.'', [
        'embeds' => [[
            'title' => 'New Game added to MetroidVania.GG!',
            'description' => "**Name:** " . $request['name'] . "\n\n**Description:** " . $request['description'] . "\n\n[Find out more!](https://www.metroidvania.gg/Game/" . $request['slug']. ")",
            'image' => [
                'url' => 'https://www.metroidvania.gg/storage/thumbnails/' . $request['slug'] . '.jpg'
            ],
            'color' => hexdec('dd8500'),
        ]]
    ]);
});

Route::get('/Game/{slug}', function ($slug) {
    
    $singleGame = Games::where('slug', $slug)->first();

    # Get Steam reviews if game is released

    $reviews = [
        'steam_reviews' => Cache::get("{$slug}-steam-review", 0)
    ];

    $discounts = [
        'steam_discount' => Cache::get("{$slug}-steam-discount", 0),
        'gog_discount' => Cache::get("{$slug}-gog-discount", 0)
    ];


    return Inertia::render('GamePage', [
        'singleGame' => $singleGame,
        'reviews' => $reviews,
        'discounts' => $discounts,
    ]);
});

require __DIR__.'/auth.php';
