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

    $bannerSectionRecentRelease = Games::where('release_date', '<=', $today)
        ->orderBy('release_date', 'DESC')
        ->inRandomOrder()
        ->first();

    $bannerSectionComingSoon = Games::where('release_date', '>', $today)
        ->orderBy('release_date', 'ASC')
        ->inRandomOrder()
        ->first();

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

    #5 upcoming Games.
    $upcomingGames = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('release_date', '>', $today)
        ->orderBy('release_date', 'ASC')
        ->skip(0)
        ->take(5)
        ->get();

    #5 last released Games. 
    $recentlyReleased = Games::where('release_date', '<=', $today)
        ->orderBy('release_date', 'DESC')
        ->skip(0)
        ->take(5)
        ->get();

    #5 highest games on (steam) sale
    $releasedGames = Games::where('release_date', '<=', $today)
        ->orderBy('release_date', 'DESC')
        ->get();

    foreach ($releasedGames as $game) {
        $discount = Cache::get("{$game->slug}-steam-discount", 0);
        $game->discount = $discount;
    }
    
    $discountedGames = $releasedGames->filter(function ($game) {
        return $game->discount > 0;
    })
    ->sortByDesc('discount')
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
    $releasedGames = Games::where('release_date', '<=', $today)
        ->orderBy('release_date', 'DESC')
        ->get();

    return Inertia::render('Released', [
        'games' => $releasedGames,
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

    Route::get('/SubmitGames', [SubmitGamesController::class, "index"]);
    Route::get('/Reports', [ReportController::class , "index"]);
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
    $discord_webhook_id = config('discord.webhook.id');
    $discord_webhook_token = config('discord.webhook.token');

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
    if ($singleGame)

    $steamParts = explode('/', $singleGame['steam']); 
    $steamAppId = isset($steamParts[4]) ? $steamParts[4] : null; 

    if ($steamAppId) {

        $reviews = Cache::remember("{$slug}-reviews", 3600, function () use ($steamAppId) {

            $external_api = "https://store.steampowered.com/appreviews/{$steamAppId}?json=1&purchase_type=all";
            $response = Http::get($external_api);

            if ($response->successful()) {
                return $response->json();
            }

            return ['error' => 'failed to fetch from steam api'];
        });

        $discounts = [
            'steam_discount' => Cache::get("{$slug}-steam-discount", 0),
            'gog_discount' => Cache::get("{$slug}-gog-discount", 0)
        ];
    }

    // dd($discounts);

    return Inertia::render('GamePage', [
        'singleGame' => $singleGame,
        'reviews' => $reviews,
        'discounts' => $discounts,
    ]);
});

require __DIR__.'/auth.php';
