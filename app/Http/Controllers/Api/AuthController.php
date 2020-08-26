<?php
/**
 * File AuthController.php
 *
 * @author Tuan Duong <bacduong@gmail.com>
 * @package Laravue
 * @version 1.0
 */
namespace App\Http\Controllers\Api;

use App\Http\Resources\UserResource;
use App\Laravue\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;


use View;
use Redirect;
use Carbon\Carbon;
use App\Laravue\Models\User;
use App\Laravue\Models\Role;
use App\Laravue\Acl;
use Messagable;
use Validator;
use Session;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Mail;

/**
 * Class AuthController
 *
 * @package App\Http\Controllers\Api
 */
class AuthController extends BaseController
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (!Auth::attempt($credentials)) {
            return response()->json(new JsonResponse([], 'login_error'), Response::HTTP_UNAUTHORIZED);
        }

        $user = $request->user();

        return response()->json(new JsonResponse(new UserResource($user)), Response::HTTP_OK);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        return response()->json((new JsonResponse())->success([]), Response::HTTP_OK);
    }

    public function signup(Request $request)
    {
        $validator = Validator::make($request->all(), User::$rules);
        for ($code_length = 25, $newcode = ''; strlen($newcode) < $code_length; $newcode .= chr(!rand(0, 2) ? rand(48, 57) : (!rand(0, 1) ? rand(65, 90) : rand(97, 122)))) ;
        if ($validator->passes()) {
            // validation passed

            //  USER
            $user = new User;
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->varify = $newcode;
            $user->save();
            // $user = new UserResource($user);
            $role = Role::findByName('user');
            $user->syncRoles($role);
            $user_id = $user->id;

            //MAIL
            $data = array(
                'email' => $request->email,
                'name' => $request->name ,
                'clickUrl' => URL::to('/user') . '/confirm/' . $newcode,
                'url' => URL::to('/user') . '/confirm/' . $newcode
            );

            Mail::send('emails.signup',['data'=>$data], function ($message) use ($data) {
                $message->to($data['email'],$data['name'])->subject('Welcome!');
            });

            return view('users.registered',compact('data'));
        
        } else {
            return Redirect::to('register')->withErrors($validator)->withInput();
        }

    }

    public function varify($code)
    {
        $user = User::where('varify','=',$code)->first();
        $user->email_verified_at = Carbon::parse(Carbon::now());
        $user->save();
        return Redirect::to('')->with('successMsg','your account has been verified ');
    }
}
