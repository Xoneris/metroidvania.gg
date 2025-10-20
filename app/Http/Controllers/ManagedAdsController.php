<?php

namespace App\Http\Controllers;

use App\Models\ManagedAds;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ManagedAdsController extends Controller
{
    public function index() 
    {
        $ads = ManagedAds::all();

        return Inertia::render('Dashboard/AdManager', [
            'ads' => $ads,
        ]);
    }

    public function store(Request $request) 
    {
        // $validated = $request->validate([
        //     'game_name' => 'string|required',
        //     'report' => 'string|required',
        // ]);

        $fileName = $request->file('media')->getClientOriginalName();
        $path = $request->file('media')->storeAs('managed-images', $fileName, 'public');

        ManagedAds::create([
            'name' => $request['name'],            
            'media' => $fileName,
            'size' => $request['size'],
            'status' => $request['status'],
            'priority' => $request['priority'],
            'link' => $request['link'],
            'clickedAmount' => 0,
        ]);

    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'media' => 'required|string',
            'size' => 'required|string',
            'status' => 'required|string',
            'priority' => 'required|string',
            'link' => 'required|string',
        ]);

        $ad = ManagedAds::findOrFail($id);
        $ad->update($validated);
    }

    public function delete(string $id) 
    {
        $ad = ManagedAds::findOrFail($id);
        $ad->delete();
    }
}
