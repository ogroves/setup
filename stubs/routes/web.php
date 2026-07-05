<?php

use Illuminate\Support\Facades\Route;

# App
Route::fallback(function () {
    return view('app');
})->name('app');
