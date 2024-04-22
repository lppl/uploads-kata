<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::resources([
    'uploads' => \App\Http\Controllers\Uploads::class,
]);

