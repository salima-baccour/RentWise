<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;


class PriceTable extends Model
{
    use HasFactory;

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'Kwartal' => 'datetime',
    ];

    protected $fillable = [
        'Bialystok',
        'Bydgoszcz',
        'Gdansk',
        'Gdynia',
        'Katowice',
        'Kielce',
        'Krakow',
        'Lublin',
        'Lodz',
        'Olsztyn',
        'Opole',
        'Poznan',
        'Rzeszow',
        'Szczecin',
        'Warszawa',
        'Wroclaw',
        'Zielona Gora',
        '7 miast',
        '10 miast',
        '6 miast bez Warszawy',
        '9 miast'
    ];

    public static function selectTable($tableName)
    {
        // Check if the table exists in the database
        if (!Schema::hasTable($tableName)) {
            throw new \Exception("Table $tableName does not exist.");
        }

        $instance = new static;
        $instance->setTable($tableName);
        return $instance;
    }

    public static function getDataWithinDateRange($tableName, $startDate, $endDate)
    {
        $instance = self::selectTable($tableName);

        return $instance->whereBetween('Kwartal', [$startDate, $endDate])->get();
    }

    public static function getCityPrices($tableName, $city)
    {
        $instance = self::selectTable($tableName);

        // Ensure the city column exists
        if (!in_array($city, $instance->getFillable())) {
            throw new \Exception("City $city does not exist in the table $tableName.");
        }

        return $instance->select('Kwartal', $city)->get();
    }

    public static function getCityPricesWithinDateRange($tableName, $city, $startDate, $endDate)
    {
        $instance = self::selectTable($tableName);

        // Ensure the city column exists
        if (!in_array($city, $instance->getFillable())) {
            throw new \Exception("City $city does not exist in the table $tableName.");
        }

        return $instance->whereBetween('Kwartal', [$startDate, $endDate])->select('Kwartal', $city)->get();
    }
}
