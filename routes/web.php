<?php

use App\Http\Controllers\ProfileController;
use App\Models\Game;
use Illuminate\Foundation\Application;
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

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('demos', function () {

    // $external_api = 'https://xoneris.pythonanywhere.com/api/games/demo/';
    // $apiRequest = Http::get($external_api);
    // if ($apiRequest){
    //     $gamesWithDemos = response()->json($apiRequest->json());
    // } else {
    //     $gamesWithDemos = response()->json(['error' => 'failed to fetch from steam api'], $apiRequest->status());
    // }
    $gamesWithDemos = Game::where('demo', 1)
        ->inRandomOrder()
        ->get();

    return Inertia::render('Demos', [
         'gamesWithDemos' => response()->json($gamesWithDemos)
    ]);
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/{slug}', function ($slug) {
    
    // $external_api = 'https://xoneris.pythonanywhere.com/api/games/' . $slug;
    // $apiRequest = Http::get($external_api);
    // $singleGame = response()->json($apiRequest);
    $call = Game::where('slug', $slug)->first();

    if ($call) {
        $singleGame = response()->json($call);
    } else {
        $singleGame = response()->json(['message' => 'Entry not found'], 404);
    }

    return Inertia::render('SingleGamePage', [
        'Game' => $singleGame,
    ]);
});

require __DIR__.'/auth.php';
