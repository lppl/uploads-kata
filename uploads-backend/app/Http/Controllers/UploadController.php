<?php

namespace App\Http\Controllers;

use \RuntimeException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UploadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $uploads = DB::table('uploads')->limit(10)->get();

        dump($uploads);
        return response()->json($uploads);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        throw new RuntimeException("Not implemented");
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @param $var
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        throw new RuntimeException("Not implemented");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $uploads = DB::table('uploads')->where('id', $id)->get();

        return response()->json($uploads);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        throw new RuntimeException("Not implemented");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        throw new RuntimeException("Not implemented");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $uploads = DB::table('uploads')->where('id', $id)->get();

        return response()->json($uploads);
    }
}
