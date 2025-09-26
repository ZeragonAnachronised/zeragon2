<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\SeminarController;
use App\Models\Seminar;
use App\Models\Image;
use App\Models\Application;

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

Route::middleware('auth', 'role:user,admin')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard', [
        'user' => auth()->user(),
        'seminars' => Seminar::whereNotIn(
            'id',
            Application::where('user_id', auth()->id())->pluck('seminar_id')
        )->get(),
        'my' => Seminar::whereIn(
            'id',
            Application::where('user_id', auth()->id())->pluck('seminar_id')
        )->get(),
        'url' => Image::pluck('path')->map(fn ($path) => asset('storage/' . $path)),
        'role' => auth()->user()->role
    ]))->name('dashboard');

    Route::post('/seminars/{seminarId}/signup', [SeminarController::class, 'signup']);
    Route::post('/photos', [PhotoController::class, 'store']);

    Route::get('/logout', [LoginController::class, 'destroy'])->name('logout');
});

Route::middleware('auth', 'role:admin')->group(function () {
    Route::get('/admin', fn() => Inertia::render('Admin/Dashboard', [
        'user' => auth()->user(),
        'seminars' => Seminar::get(),
    ]));
    
    Route::post('/admin/seminar/{id?}', [SeminarController::class, 'create']);
    Route::get('/admin/seminar/{id?}', fn(?int $id = null) => Inertia::render('Admin/Seminar', [
        'seminar' => $id !== null ? Seminar::findOrFail($id) : null,
        'images' => Image::get()->map(fn ($img) => ['id' => $img->id, 'path' => asset('storage/' . $img->path)])->values()
    ]));
});