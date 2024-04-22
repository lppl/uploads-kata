<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/config', function () {
    return response()->json([
        "uploadEndpoint" => 'http://localhost:8000/api/upload',
        "maxFileSize" => 5 * 1024 * 1024,
        "allowedFileTypes" => [
            "image/png",
            "image/jpeg",
            "image/bmp",
            "image/tiff",
            "image/webp",
        ],
        "minimumWidth" => 20,
        "minimumHeight" => 200,
    ]);
});

Route::resources([
    'api/upload' => \App\Http\Controllers\UploadController::class,
]);

