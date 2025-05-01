<?php

namespace App\Http\Controllers;

use App\Models\Games;
use App\Models\SubmitGames;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubmitGamesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $submittedGames = SubmitGames::all();

        return Inertia::render('Dashboard/SubmitGames', [
            'games' => $submittedGames,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        $fileName = $request->input('slug') . '.' . $request->file('thumbnail')->getClientOriginalExtension();
        $path = $request->file('thumbnail')->storeAs('thumbnails', $fileName, 'public');

        dd($request);

        # Put new game into the DB
        SubmitGames::create([
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
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(SubmitGames $submitGames)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SubmitGames $submitGames)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SubmitGames $submitGames)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SubmitGames $submitGames)
    {
        //
    }
}
