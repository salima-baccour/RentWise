<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\PriceTableController;
use Illuminate\Support\Facades\DB;

// Health check endpoint for Docker and monitoring
Route::get('/health', function () {
    try {
        DB::connection()->getPdo();
        return response()->json([
            'status' => 'healthy',
            'database' => 'connected',
            'timestamp' => now()->toISOString()
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'unhealthy',
            'database' => 'disconnected',
            'error' => $e->getMessage(),
            'timestamp' => now()->toISOString()
        ], 503);
    }
});

// Authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
});

// ============================================
// Data API endpoints
// ============================================

// Interest rates
Route::get('/get_intrest_rates', [ApiController::class, 'getInterestRates']);

// Price data endpoints
Route::get('/get_data', [PriceTableController::class, 'getData']);
Route::get('/get_data_in_range', [PriceTableController::class, 'getDataInRange']);
Route::get('/get_city_data', [PriceTableController::class, 'getCityData']);
Route::get('/get_data_city_in_range', [PriceTableController::class, 'getCityDataInRange']);

// Legacy routes
Route::get('/price-table/{tableName}', [PriceTableController::class, 'getData']);
Route::get('/price-table/{tableName}/cities', [PriceTableController::class, 'getCities']);
Route::get('/price-table/{tableName}/quarters', [PriceTableController::class, 'getQuarters']);