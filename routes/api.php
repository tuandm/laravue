<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix('auth')->group(function () {
    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login');
    Route::get('refresh', 'AuthController@refresh');
    Route::group(['middleware' => 'auth:api'], function(){
        Route::get('user', 'AuthController@user');
        Route::post('logout', 'AuthController@logout');
    });
});

Route::post('/user/login', function(Request $request) {
    $username = $request->input('username');
    $password = $request->input('password');
    if ($username === 'admin' && $password === 'admin') {
        return response()->json([
            'data' => array_merge(
                factory('App\User')->make()->toArray(),
                ['roles' => ['admin']]
            )
        ]);
    } else {
        abort(404, 'User is not found');
    }
});

Route::get('/user/info', function() {
    return response()->json([
        'data' => array_merge(
            factory('App\User')->make()->toArray(),
            ['roles' => ['admin']]
        )
    ]);
});

Route::get('/users', function () {
    if (rand(1, 10) < 3) {
        abort(500, 'We could not retrieve the users');
    }

    return factory('App\User', 10)->make();
});
