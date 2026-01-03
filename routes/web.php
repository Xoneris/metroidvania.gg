<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SubmitGamesController;
use App\Http\Controllers\ManagedAdsController;
use App\Models\Games;
use App\Models\ManagedAds;
use App\Models\Reports;
use App\Models\SubmitGames;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Services\NewsFeedService;

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

Route::get('/', function (Request $request, NewsFeedService $news) {

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
        $bannerSectionRecentRelease = Games::select('id','name','slug','trailer')
            ->where('release_date', '<', $today)
            ->orderBy('release_date', 'DESC')
            ->inRandomOrder()
            ->first();
    }

    if (!empty($notReleased)){
        $bannerSectionComingSoon = $notReleased[array_rand($notReleased)];
    } else {
        $bannerSectionComingSoon = Games::select('id','name','slug','trailer')
            ->where('release_date', '>', $today)
            ->orderBy('release_date', 'ASC')
            ->inRandomOrder()
            ->first();
    }


    $bannerSectionKickstarterLive = Games::select('id','name','slug','trailer')
        ->where('kickstarter_status', 'Live')
        ->inRandomOrder()
        ->first();

    $bannerSectionKickstarterUpcoming = Games::select('id','name','slug','trailer')
        ->where('kickstarter_status', 'Upcoming')
        ->inRandomOrder()
        ->first();

    $newsfeed = array_reverse($news->getAll());
        
    $bannerSectionGames = [
        $bannerSectionRecentRelease,
        $bannerSectionComingSoon,
        $bannerSectionKickstarterLive,
        $bannerSectionKickstarterUpcoming,
    ];
        
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
    $recentlyReleasedDB = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('release_date', '<', $today)
        ->orderBy('release_date', 'DESC')
        ->skip(0)
        ->take(5-count($gamesIsReleased))
        ->get()
        ->toArray();

    $recentlyReleased = array_merge($gamesIsReleased,$recentlyReleasedDB);

    #5 random games on (steam) sale
    $releasedGames = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('release_date', '<=', $today)
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

    #5 random Games with high review scores
    $highlyRatedGames = [];
    $gamesToCheckReviewScore = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('release_date', '<=', $today)
        ->inRandomOrder()
        ->get();

    foreach ($gamesToCheckReviewScore as $game) {
        $cachedReviews = Cache::get("{$game->slug}-steam-review", 0);

        if ($cachedReviews) {

            if ($cachedReviews['review_score_desc'] === "Overwhelmingly Positive") {
                $highlyRatedGames[] = $game; 
            }
            
            if (count($highlyRatedGames) == 5){
                break;
            }
        }
    }

    #5 random Games with Demos.
    $gamesWithDemos = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('demo', 1)
        ->skip(0)
        ->take(5)
        ->inRandomOrder()   
        ->get();

    #5 random Games in Early Access
    $earlyAccessGames = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('early_access', 1)
        ->skip(0)
        ->take(5)    
        ->inRandomOrder()
        ->get();

    #5 upcoming Kickstarters
    $upcomingKickstarters = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('kickstarter_status', 'Upcoming')
        ->skip(0)
        ->take(5)    
        ->inRandomOrder()
        ->get();

    #5 random Games releasing in 2026.
    $tomorrow = date("Y-m-d",strtotime("tomorrow"));
    $gamesReleasing2026 = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('release_window', 'LIKE', '%2026%')
        ->orWhereBetween('release_date', [$tomorrow,'2026-12-31'])
        ->skip(0)
        ->take(5)
        ->inRandomOrder() 
        ->get();

    #5 random Games releasing in 2027.
    $gamesReleasing2027 = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('release_window', 'LIKE', '%2027%')
        ->orWhereBetween('release_date', ['2027-01-01','2027-12-31'])
        ->skip(0)
        ->take(5)
        ->inRandomOrder() 
        ->get();

    #5 random Games releasing in TBD.
    $gamesReleasingTBD = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('release_window', 'TBD')
        ->skip(0)
        ->take(5)
        ->inRandomOrder()
        ->get();

    #5 last added games. 
    $lastAddedGames = Games::select('id','name','slug','release_date','release_window','early_access')
        ->orderBy('id', 'DESC')    
        ->skip(0)
        ->take(5)
        ->get();

    return Inertia::render('Home', [

        'bannerSectionGames' => $bannerSectionGames,
        'newsFeed' => $newsfeed,
        'upcomingGames' => $upcomingGames,
        'recentlyReleased' => $recentlyReleased,
        'steamSale' => $discountedGames,
        'highlyRatedGames' => $highlyRatedGames,
        'gamesWithDemos' => $gamesWithDemos,
        'earlyAccessGames' => $earlyAccessGames,
        'upcomingKickstarterGames' => $upcomingKickstarters,
        'releasingIn2026' => $gamesReleasing2026,
        'releasingIn2027' => $gamesReleasing2027,
        'releasingInTBD' => $gamesReleasingTBD,
        'lastAddedGames' => $lastAddedGames,
        'canLogin' => Route::has('login'),
        // 'canRegister' => Route::has('register'),
    ]);
});

Route::get('/coming-soon', function () {

    $today = date("Y-m-d");
    $upcomingGames = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('release_date', '>', $today)
        ->orderBy('release_date', 'ASC')
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $upcomingGames,
        'pageTitle' => 'Games Coming Soon',
        'pageDescription' => 'A list of Metroidvania games with a fixed release dates and releasing moderatly soon.',
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

// Route::get('/2025', function () {

//     $tomorrow = date("Y-m-d",strtotime("tomorrow"));
//     $gamesReleasing2025 = Games::select('id','name','slug','release_date','release_window','early_access')
//         ->where('release_window', 'LIKE', '%2025%')
//         ->orWhereBetween('release_date', [$tomorrow,'2025-12-31'])
//         ->inRandomOrder() 
//         ->get();

//     return Inertia::render('SinglePage', [
//         'games' => $gamesReleasing2025,
//         'pageTitle' => 'Releasing in 2025',
//         'pageDescription' => 'A list of Metroidvania games in development set to release somewhere in 2025.',
//     ]);
// });

Route::get('/2026', function () {

    $gamesReleasing2026 = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('release_window', 'LIKE', '%2026%')
        ->orWhereBetween('release_date', ['2026-01-01','2026-12-31'])
        ->inRandomOrder() 
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $gamesReleasing2026,
        'pageTitle' => 'Releasing in 2026',
        'pageDescription' => 'A list of Metroidvania games in development set to release somewhere in 2026.',
    ]);
});

Route::get('/2027', function () {

    $gamesReleasing2027 = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('release_window', 'LIKE', '%2027%')
        ->orWhereBetween('release_date', ['2027-01-01','2027-12-31'])
        ->inRandomOrder() 
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $gamesReleasing2027,
        'pageTitle' => 'Releasing in 2027',
        'pageDescription' => 'A list of Metroidvania games in development set to release somewhere in 2027.',
    ]);
});

Route::get('/TBD', function () {

    $gamesReleasingTBD = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('release_window', 'TBD')
        ->inRandomOrder()
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $gamesReleasingTBD,
        'pageTitle' => 'Releasing in TBD',
        'pageDescription' => 'A list of Metroidvania games in development without any release dates yet.',
    ]);
});

Route::get('/EarlyAccess', function () {

    $earlyAccessGames = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('early_access', 1)
        ->inRandomOrder()
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $earlyAccessGames,
        'pageTitle' => 'Games in Early Access',
        'pageDescription' => 'A list of Metroidvania games currently in Early Access.',
    ]);
});

Route::get('/UpcomingKickstarters', function () {

    $upcomingKickstarters = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('kickstarter_status', 'Upcoming')
        ->inRandomOrder()
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $upcomingKickstarters,
        'pageTitle' => 'Upcoming Kickstarters',
        'pageDescription' => 'A list of Metroidvania games with a planned Kickstarter campaign coming up.',
    ]);
});

Route::get('/Demos', function () {

    $gamesWithDemos = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('demo', 1)
        ->inRandomOrder()
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $gamesWithDemos,
        'pageTitle' => 'Games with Demos',
        'pageDescription' => 'A list of Metroidvania games that currently have a demo on their Steam page.',
    ]);
});

Route::get('/Released', function () {
    $today = date("Y-m-d");

    $todayGames = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('release_date', '=', $today)
        ->orderBy('release_date', 'DESC')
        ->get();

    $gamesToday = [];

    foreach($todayGames as $game){
        $isReleased = Cache::get("{$game->slug}-released");
        if ($isReleased) {
            $gamesToday[] = $game;
        }
    }

    $releasedGames = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('release_date', '<', $today)
        ->orderBy('release_date', 'DESC')
        ->get()
        ->toArray();

    $games = array_merge($gamesToday, $releasedGames);

    return Inertia::render('Released', [
        'games' => $games,
    ]);
});

Route::get('/Steam', function () {
    $steamGames = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('steam', '!=', '')
        ->inRandomOrder() 
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $steamGames,
        'pageTitle' => 'Games on Steam',
        'pageDescription' => 'A list of Metroidvania games currently available on Steam.',
    ]);
    
});

Route::get('/Epic', function () {
    $epicGames = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('epic', '!=', '')
        ->inRandomOrder() 
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $epicGames,
        'pageTitle' => 'Games on Epic Games',
        'pageDescription' => 'A list of Metroidvania games currently available on Epic Games.',
    ]);
});

Route::get('/GoG', function () {
    $gogGames = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('gog', '!=', '')
        ->inRandomOrder() 
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $gogGames,
        'pageTitle' => 'Games on GoG',
        'pageDescription' => 'A list of Metroidvania games currently available on Good old Games (GoG).',
    ]);
});

Route::get('/Playstation', function () {
    $playstationGames = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('playstation', '!=', '')
        ->inRandomOrder() 
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $playstationGames,
        'pageTitle' => 'Games on Playstation',
        'pageDescription' => 'A list of Metroidvania games currently available on the Playstation store.',
    ]);
});

Route::get('/Xbox', function () {
    $xboxGames = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('xbox', '!=', '')
        ->inRandomOrder() 
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $xboxGames,
        'pagetitle' => 'Games on Xbox',
        'pageDescription' => 'A list of Metroidvania games currently available on the Xbox store.',
    ]);
});

Route::get('/Nintendo', function () {
    $nintendoGames = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('nintendo', '!=', '')
        ->inRandomOrder() 
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $nintendoGames,
        'pageTitle' => 'Games on Nintendo Switch',
        'pageDescription' => 'A list of Metroidvania games currently available on the Nintendo eShop.',
    ]);
});

Route::get('/AllGames', function () {
    $allGames = Games::select('id','name','slug','release_date','release_window','early_access')
        ->get();

    return Inertia::render('AllGames', [
        'games' => $allGames
    ]);
});

Route::get('/steam-reviews', function () {
    
    $today = date("Y-m-d");
    $releasedGames = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('release_date', '<=', $today)
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
        $releasedGames = Games::select('id','name','slug','release_date','release_window','early_access')
            ->where('release_date', '<=', $today)
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
        'pageTitle' => 'Steam games on Sale',
        'pageDescription' => 'A list of Metroidvania games currently on sale on Steam.',
    ]);
});

Route::get('/gog-sale', function () {

        $today = date("Y-m-d");
        $releasedGoGGames = Games::select('id','name','slug','release_date','release_window','early_access')
            ->where('release_date', '<=', $today)
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

Route::get('/adtest', function () {
    return Inertia::render('AdTesting', []);
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

    Route::get('/ad-manager', [ManagedAdsController::class, "index"]);
    Route::post('/ad-manager', [ManagedAdsController::class, "store"]);
    Route::post('/ad-manager/{id}', [ManagedAdsController::class, "update"]);
    Route::delete('/ad-manager/{id}', [ManagedAdsController::class, "delete"]);

    Route::get('/tracker', function () {

        return Inertia::render('Dashboard/Tracker');
    });

});

Route::middleware(['auth'])->post('/game/import', function (Request $request) {

    // https://store.steampowered.com/api/appdetails?appids=3943840&cc=us&l=en

    $steamParts = explode('/', $request->link); 
    $steamAppId = isset($steamParts[4]) ? $steamParts[4] : null; 

    if ($steamAppId) {
        
        $external_api = "https://store.steampowered.com/api/appdetails?appids={$steamAppId}&cc=us&l=en";
        $response = Http::get($external_api);

        if ($response->successful()) {

            $data = $response->json();

            $game['name'] = $data[$steamAppId]['data']['name'];
            $game['slug'] = strtolower(str_replace([":","'",".","_"," "],["","","","-","-"],$game['name']));
            $game['developer'] = $data[$steamAppId]['data']['developers'][0];
            $game['publisher'] = $data[$steamAppId]['data']['publishers'][0];
            $game['release_window'] = $data[$steamAppId]['data']['release_date']['date'];
            $game['release_date'] = ""; 
            $game['description'] = $data[$steamAppId]['data']['short_description'];
            $game['demo'] = isset($data[$steamAppId]['data']['demos'][0]['appid']) ? 1 : 0;
            $game['early_access'] = 0;
            $game['kickstarter_page'] = "";
            $game['kickstarter_status'] = "";
            $game['trailer'] = "";
            $game['twitter'] = "";
            $game['facebook'] = "";
            $game['instagram'] = "";
            $game['tiktok'] = "";
            $game['youtube'] = "";
            $game['discord'] = "";
            $game['homepage'] = $data[$steamAppId]['data']['website'];
            $game['steam'] = $request->link;
            $game['epic'] = "";
            $game['gog'] = "";
            $game['playstation'] = "";
            $game['xbox'] = "";
            $game['nintendo'] = "";

            $game['thumbnail_url'] = $data[$steamAppId]['data']['header_image'];

            return Inertia::render('Dashboard/AddGame', [
                'importedGame' => $game,
            ]);
            
            
        }
    }
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

    // if ($request->file('thumbnail') !== null) {

    //     $fileName = $request->input('slug') . '.' . $request->file('thumbnail')->getClientOriginalExtension();
    //     $path = $request->file('thumbnail')->storeAs('thumbnails', $fileName, 'public');
    // }

    
    # Discord Webhook
    // $discord_webhook_id = config('discord.webhook.releaseChange.id');
    // $discord_webhook_token = config('discord.webhook.releaseChange.token');

    // if ($game["release_date"] !== $request["release_date"] || $game["release_window"] !== $request["release_window"]) {

    //     $oldRelease = $game["release_date"] ? $game["release_date"] : $game["release_window"];
    //     $newRelease = $request["release_date"] ? $request["release_date"] : $request["release_window"];
        
    //     Http::post('https://discord.com/api/webhooks/'. $discord_webhook_id .'/'.$discord_webhook_token.'', [
    //         'embeds' => [[
    //             'title' => 'Release Date change - ' . $game["name"],
    //             'description' => "**Old:** " . $oldRelease . "\n**New:** " . $newRelease,
    //             'color' => hexdec('dd8500'),
    //         ]]
    //     ]);
    // }

    $game->update($request->all());

    // return to_route('Dashboard/EditGame');
});

Route::middleware(['auth'])->post('/Game/New', function (Request $request, NewsFeedService $news) {

    if ($request['name'] !== "Test") {

        # Validate first
        # At... some point lol

        # Thumbnail
        if ($request["submittedGame"] !== true) {

            if ($request->file('thumbnail') !== null) {
                $fileName = $request->input('slug') . '.' . $request->file('thumbnail')->getClientOriginalExtension();
                $path = $request->file('thumbnail')->storeAs('thumbnails', $fileName, 'public');
            } else if(isset($request->thumbnail_url)) {

                $response = Http::get($request->thumbnail_url);
                if ($response->failed()) {
                    return back()->withErrors(['file_url' => 'Unable to download file.']);
                }
                $filename = $request->slug . ".jpg";
                Storage::put("public/thumbnails/{$filename}", $response->body());
            }
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

    $release_date = $request['release_date'] ? $request['release_date'] : $request['release_window'];

    $news->add([
        'game' => $request->name, 
        'slug' => $request->slug,
        'type' => 'just_added',
    ]);

    Http::post('https://discord.com/api/webhooks/'. $discord_webhook_id .'/'.$discord_webhook_token.'', [
        'embeds' => [[
            'title' => 'New Game added to MetroidVania.GG!',
            'description' => "**Name:** " . $request['name'] . "\n\n **Release Date:** " . $release_date ." \n\n**Description:** " . $request['description'] . "\n\n[Find out more!](https://www.metroidvania.gg/Game/" . $request['slug']. ")",
            'image' => [
                'url' => 'https://www.metroidvania.gg/storage/thumbnails/' . $request['slug'] . '.jpg'
            ],
            'color' => hexdec('dd8500'),
        ]]
    ]); 
});

Route::get('/Game/{slug}', function ($slug) {
    
    $singleGame = Games::where('slug', $slug)->first();

    $similarGames = Games::select('id','name','slug','release_date','release_window','early_access')
        ->skip(0)
        ->take(4)
        ->inRandomOrder() 
        ->get();

    # Get Steam reviews if game is released
    $reviews = [
        'steam_reviews' => Cache::get("{$slug}-steam-review", 0)
    ];

    # Get discounts if game is released
    $discounts = [
        'steam_discount' => Cache::get("{$slug}-steam-discount", 0),
        'gog_discount' => Cache::get("{$slug}-gog-discount", 0)
    ];

    return Inertia::render('GamePage', [
        'singleGame' => $singleGame,
        'reviews' => $reviews,
        'discounts' => $discounts,
        'similarGames' => $similarGames,
    ]);
});

Route::get('/developer/{developer}', function ($developer) {
    
    $games = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('developer', $developer)
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $games,
        'pageTitle' => 'Games developed by '. $developer,
        'pageDescription' => 'A list of Metroidvania games developed by.'. $developer,
    ]);
});

Route::get('/publisher/{publisher}', function ($publisher) {
    
    $games = Games::select('id','name','slug','release_date','release_window','early_access')
        ->where('publisher', $publisher)
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $games,
        'pageTitle' => 'Games published by '. $publisher,
        'pageDescription' => 'A list of Metroidvania games published by.'. $publisher,
    ]);
});

Route::get('/managed-content/{ad_id}', function ($ad_id) {

    $ad = ManagedAds::find($ad_id);
    if (!$ad) {
        abort(404);
    }

    $ad->increment('clickedAmount');
    return redirect()->away($ad->link);

});

require __DIR__.'/auth.php';
