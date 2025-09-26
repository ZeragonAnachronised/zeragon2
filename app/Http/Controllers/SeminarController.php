<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;
use App\Models\Seminar;
use App\Models\Image;

class SeminarController extends Controller
{
    public function signup(Request $request, $seminarId)
    {
        $seminar = Application::create([
            'user_id' => $request->user()->id,
            'seminar_id' => $seminarId
        ]);
        return back()->with('success', 'Вы успешно записались на семинар!');
    }

    public function create(Request $request, ?int $id = null) {
        if($id) {
            $seminar = Seminar::findOrFail($id);
            $seminar->update([
                'title' => $request->title,
                'about' => $request->about,
                'date' => $request->date,
                'img_id' => $request->img_id
            ]);
            return redirect('/admin/seminar/' . $seminar->id);
        }
        $seminar = Seminar::create([
            'title' => $request->title,
            'about' => $request->about,
            'date' => $request->date,
            'img_id' => $request->img_id
        ]);
        return redirect('/admin/seminar/' . $seminar->id);
    }
}
