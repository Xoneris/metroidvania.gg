<?php

use App\Models\Games;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::get('/games', function () {
    $games = Games::all();
    return response()->json($games);
});

Route::get('/games/demo', function () {
    $games = Games::where('demo', 1)
        ->inRandomOrder()
        ->get();
    return response()->json($games);
});

Route::get('/games/earlyaccess', function () {
    $games = Games::where('early_access', 1)
        ->inRandomOrder()
        ->get();
    return response()->json($games);
});

Route::get('/games/recentlyreleased', function () {
    $today = date("Y-m-d");
    $games = Games::where('release_date', '<=', $today)
        ->orderBy('release_date', 'DESC')
        ->get();
    return response()->json($games);
});

Route::get('/games/comingsoon', function () {
    $today = date("Y-m-d");
    $games = Games::where('release_date', '>=', $today)
        ->orderBy('release_date', 'ASC')
        ->get();
    return response()->json($games);
});

Route::get('/games/kickstarter/upcoming', function () {
    $games = Games::where('kickstarter_status', 'Upcoming')
        ->inRandomOrder()
        ->get();
    return response()->json($games);
});

Route::get('/games/kickstarter/live', function () {
    $games = Games::where('kickstarter_status', 'Live')
        ->inRandomOrder()    
        ->get();
    return response()->json($games);
});

Route::get('/games/TBD', function () {
    $games = Games::where('release_window', 'TBD')->get();
    return response()->json($games);
});

Route::get('/games/2024', function () {
    $tomorrow = date("Y-m-d",strtotime("tomorrow"));
    $games = Games::where('release_window', 'LIKE', '%2024%')
        ->orWhereBetween('release_date', [$tomorrow,'2024-12-31'])
        ->inRandomOrder() 
        ->get();
    return response()->json($games);
});

Route::get('/games/2025', function () {
    $games = Games::where('release_window', 'LIKE', '%2025%')
        ->orWhereBetween('release_date', ['2025-01-01','2025-12-31'])
        ->inRandomOrder() 
        ->get();
    return response()->json($games);
});

Route::get('/games/2026', function () {
    $games = Games::where('release_window', 'LIKE', '%2026%')
        ->orWhereBetween('release_date', ['2026-01-01','2026-12-31'])
        ->inRandomOrder() 
        ->get();
    return response()->json($games);
});

Route::get('/games/steam', function () {
    $games = Games::where('steam', '!=', '')
        ->inRandomOrder() 
        ->get();
    return response()->json($games);
});

Route::get('/games/epic', function () {
    $games = Games::where('epic', '!=', '')
        ->inRandomOrder() 
        ->get();
    return response()->json($games);
});

Route::get('/games/gog', function () {
    $games = Games::where('gog', '!=', '')
        ->inRandomOrder() 
        ->get();
    return response()->json($games);
});

Route::get('/games/playstation', function () {
    $games = Games::where('playstation', '!=', '')
        ->inRandomOrder() 
        ->get();
    return response()->json($games);
});

Route::get('/games/xbox', function () {
    $games = Games::where('xbox', '!=', '')
        ->inRandomOrder() 
        ->get();
    return response()->json($games);
});

Route::get('/games/switch', function () {
    $games = Games::where('nintendo', '!=', '')
        ->inRandomOrder() 
        ->get();
    return response()->json($games);
});

Route::get('/games/{slug}', function ($slug) {
    $game = Games::where('slug', $slug)->first();
    if ($game) {
        return response()->json($game);
    } else {
        return response()->json(['message' => 'Entry not found'], 404);
    }
});

Route::get('/games/steamID/{steamappid}', function ($steamAppId){

    $external_api = 'https://store.steampowered.com/appreviews/' . $steamAppId . '?json=1&purchase_type=all';
    $steamReviews = Http::get($external_api);
    if ($steamReviews){
        return response()->json($steamReviews->json());
    } else {
        return response()->json(['error' => 'failed to fetch from steam api'], $steamReviews->status());
    }
});
