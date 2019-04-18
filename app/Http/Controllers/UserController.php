<?php

namespace App\Http\Controllers;

use App\Http\Resources\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::collection(\App\User::paginate(15));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new User(\App\User::find($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $id)
    {
        $user = \App\User::find($id);
        if ($user === null) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $rules = array(
            'name' => 'required',
            'email' => 'required|email',
            'role' => 'required|not_in:admin',
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 403);
        } else {
            $user->name = $request->get('name');
            $user->email = $request->get('email');
            $user->save();
            return new User($user);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
