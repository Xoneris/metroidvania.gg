<?php

use App\Http\Controllers\ProfileController;
use App\Models\Games;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
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
        ->first();

    $bannerSectionComingSoon = Games::where('release_date', '>=', $today)
        ->orderBy('release_date', 'ASC')
        ->first();

    $bannerSectionKickstarterLive = Games::where('kickstarter_status', 'Live')
        ->first();

    $bannerSectionKickstarterUpcoming = Games::where('kickstarter_status', 'Upcoming')
        ->first();

    $bannerSectionGames = [
        $bannerSectionRecentRelease,
        $bannerSectionComingSoon,
        $bannerSectionKickstarterLive,
        $bannerSectionKickstarterUpcoming,
    ];

    #5 upcoming Games.
    $upcomingGames = Games::where('release_date', '>=', $today)
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

    #5 random Games releasing in 2024.
    $tomorrow = date("Y-m-d",strtotime("tomorrow"));
    $gamesReleasing2024 = Games::where('release_window', 'LIKE', '%2024%')
        ->orWhereBetween('release_date', [$tomorrow,'2024-12-31'])
        ->skip(0)
        ->take(5)
        ->inRandomOrder() 
        ->get();

    #5 random Games releasing in 2025.
    $gamesReleasing2025 = Games::where('release_window', 'LIKE', '%2025%')
        ->orWhereBetween('release_date', ['2025-01-01','2025-12-31'])
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
        'gamesWithDemos' => $gamesWithDemos,
        'earlyAccessGames' => $earlyAccessGames,
        'upcomingKickstarterGames' => $upcomingKickstarters,
        'releasingIn2024' => $gamesReleasing2024,
        'releasingIn2025' => $gamesReleasing2025,
        'releasingInTBD' => $gamesReleasingTBD,
        'lastAddedGames' => $lastAddedGames,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/2024', function () {

    $tomorrow = date("Y-m-d",strtotime("tomorrow"));
    $gamesReleasing2024 = Games::where('release_window', 'LIKE', '%2024%')
        ->orWhereBetween('release_date', [$tomorrow,'2024-12-31'])
        ->inRandomOrder() 
        ->get();

    return Inertia::render('SinglePage', [
        'games' => $gamesReleasing2024,
        'title' => 'Releasing in 2024',
    ]);
});

Route::get('/2025', function () {

    $gamesReleasing2025 = Games::where('release_window', 'LIKE', '%2025%')
        ->orWhereBetween('release_date', ['2025-01-01','2025-12-31'])
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

Route::get('/UpcomingKickstarter', function () {

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
        'title' => 'Change this',
    ]);
});

Route::get('/AllGames', function () {
    $allGames = Games::all();

    return Inertia::render('AllGames', [
        'games' => $allGames
    ]);
});

Route::get('/Login', function () {
    return Inertia::render('Auth/Login', []);
})->name('Login');

Route::get('/Dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

Route::get('/{slug}', function ($slug) {
    
    $singleGame = Games::where('slug', $slug)->first();

    return Inertia::render('SingleGamePage', [
        'singleGame' => $singleGame,
    ]);
});

require __DIR__.'/auth.php';
