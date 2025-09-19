<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SeminarController extends Controller
{
    public function signup(Request $request, $seminarId)
    {
        // Здесь ты можешь записать user_id + seminar_id в таблицу
        // Например: SeminarUser::create([ 'user_id' => auth()->id(), 'seminar_id' => $seminarId ]);
        return back()->with('success', 'Вы успешно записались на семинар!');
    }
}
