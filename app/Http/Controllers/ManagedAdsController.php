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

        // dd($request);

        $fileName = $request->file('mediaFile')->getClientOriginalName();
        $path = $request->file('mediaFile')->storeAs('managed-images', $fileName, 'public');

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
        $ad = ManagedAds::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'size' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'priority' => 'required|string|max:255',
            'link' => 'required|url|max:255',
            'mediaFile' => 'nullable|file|image|mimes:jpg,jpeg,png,gif,webp|max:2048',
        ]);

        if ($request->hasFile('mediaFile')) {
            $file = $request->file('mediaFile');
            $fileName = $file->getClientOriginalName();
            $path = $file->storeAs('managed-images', $fileName, 'public');
            $ad->media = $fileName;
        }

        $ad->name = $validated['name'];
        $ad->size = $validated['size'];
        $ad->status = $validated['status'];
        $ad->priority = $validated['priority'];
        $ad->link = $validated['link'];

        $ad->save();
    }

    public function delete(string $id) 
    {
        $ad = ManagedAds::findOrFail($id);
        $ad->delete();
    }
}
