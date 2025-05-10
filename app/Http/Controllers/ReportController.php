<?php

namespace App\Http\Controllers;

use App\Models\Games;
use App\Models\Reports;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reports = Reports::all();

        return Inertia::render('Dashboard/Reports', [
            'reports' => $reports,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'game_name' => 'string|required',
            'report' => 'string|required',
        ]);

        Reports::create([
            'game_name' => $request['game_name'],
            'report' => $request['report'],
            'status' => 'open',
        ]);

        return redirect()->back()->with('success','Report submitted successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'status' => 'required|string'
        ]);
        $report = Reports::findOrFail($id);
        // $report->status = $request->input('status');
        $report->update($validated);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
