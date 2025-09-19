<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Image;

class PhotoController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|max:4096',
        ]);

        $path = $request->file('photo')->store('photos', 'public');

        $image = Image::create([
            'path' => $path
        ]);

        return back()->with('success', 'Фото успешно загружено!');
    }
}
