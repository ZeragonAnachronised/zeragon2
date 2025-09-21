<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\SeminarController;
use App\Models\Seminar;
use App\Models\Image;

Route::get('/', function () {
    return Inertia::render('Home', [
        'user' => auth()->user(),
    ]);
});

Route::middleware('guest')->group(function () {
    Route::get('/register', fn() => Inertia::render('Auth/Register'))->name('register');
    Route::post('/register', [RegisterController::class, 'store']);

    Route::get('/login', fn() => Inertia::render('Auth/Login'))->name('login');
    Route::post('/login', [LoginController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard', [
        'user' => auth()->user(),
        'seminars' => Seminar::get(),
        'url' => Image::pluck('path')->map(fn ($path) => asset('storage/' . $path)),
    ]))->name('dashboard');

    Route::post('/seminars/{seminar}/signup', [SeminarController::class, 'signup']);
    Route::post('/photos', [PhotoController::class, 'store']);

    Route::get('/logout', [LoginController::class, 'destroy'])->name('logout');
});