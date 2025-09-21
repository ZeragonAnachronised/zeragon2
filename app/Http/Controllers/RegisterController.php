<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'min:6', 'confirmed'],
        ], [
            'name.required' => 'Поле "Имя" обязательно для заполнения.',
            'name.string'   => 'Поле "Имя" должно быть строкой.',
            'name.max'      => 'Поле "Имя" не должно превышать 255 символов.',
            'email.required' => 'Поле "Email" обязательно для заполнения.',
            'email.email'    => 'Поле "Email" должно содержать корректный адрес электронной почты.',
            'email.unique'   => 'Пользователь с таким email уже существует.',
            'password.required'  => 'Поле "Пароль" обязательно для заполнения.',
            'password.min'       => 'Поле "Пароль" должно содержать не менее 6 символов.',
            'password.confirmed' => 'Подтверждение пароля не совпадает.',
        ]);

        if($validator->fails()) {
            return inertia('Auth/Register', ['err' => $validator->errors()->first()]);
        }

        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
        ]);

        auth()->login($user);

        return redirect()->route('dashboard');
    }
}
