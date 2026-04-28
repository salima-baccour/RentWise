<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;


use App\Models\PriceTable;

class PriceTableController extends Controller
{
    public function getData(Request $request)
    {
        $tableName = $request->input('table_name');

        if (!$tableName) {
            return response()->json(['error' => 'Table name is required'], 400);
        }

        if (!Schema::hasTable($tableName)) {
            return response()->json(['error' => 'Table does not exist'], 400);
        }

        try {
            $data = PriceTable::selectTable($tableName)->get();

            $result = $data->map(function ($item) {
                return $this->mapPriceData($item);
            });

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getDataInRange(Request $request)
    {
        $tableName = $request->input('table_name');
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        if (!$tableName || !$startDate || !$endDate) {
            return response()->json(['error' => 'Table name, start date, and end date are required'], 400);
        }

        if (!Schema::hasTable($tableName)) {
            return response()->json(['error' => 'Table does not exist'], 400);
        }

        try {
            $data = PriceTable::getDataWithinDateRange($tableName, $startDate, $endDate);

            $result = $data->map(function ($item) {
                return $this->mapPriceData($item);
            });

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getCityData(Request $request)
    {
        $tableName = $request->input('table_name');
        $city = $request->input('city');

        if (!$tableName || !$city) {
            return response()->json(['error' => 'Table name and city are required'], 400);
        }

        if (!Schema::hasTable($tableName)) {
            return response()->json(['error' => 'Table does not exist'], 400);
        }

        try {
            $data = PriceTable::getCityPrices($tableName, $city);

            return response()->json($data);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getCityDataInRange(Request $request)
    {
        $tableName = $request->input('table_name');
        $city = $request->input('city');
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        if (!$tableName || !$city || !$startDate || !$endDate) {
            return response()->json(['error' => 'Table name, city, start date, and end date are required'], 400);
        }

        if (!Schema::hasTable($tableName)) {
            return response()->json(['error' => 'Table does not exist'], 400);
        }

        try {
            $instance = PriceTable::selectTable($tableName);
            if (!Schema::hasColumn($tableName, $city)) {
                return response()->json(['error' => "Column $city does not exist in the table $tableName"], 400);
            }

            $data = PriceTable::getCityPricesWithinDateRange($tableName, $city, $startDate, $endDate);

            $formattedData = [];
            foreach ($data as $item) {
                $formattedData[] = [
                    'quarter' => $item->Kwartal,
                    'price' => $item->$city
                ];
            }

            return response()->json($formattedData);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    private function mapPriceData($item): array
    {
        return [
            'quarter' => $item->Kwartal,
            'prices' => [
                'Bialystok' => $item->Bialystok,
                'Bydgoszcz' => $item->Bydgoszcz,
                'Gdansk' => $item->Gdansk,
                'Gdynia' => $item->Gdynia,
                'Katowice' => $item->Katowice,
                'Kielce' => $item->Kielce,
                'Krakow' => $item->Krakow,
                'Lublin' => $item->Lublin,
                'Lodz' => $item->Lodz,
                'Olsztyn' => $item->Olsztyn,
                'Opole' => $item->Opole,
                'Poznan' => $item->Poznan,
                'Rzeszow' => $item->Rzeszow,
                'Szczecin' => $item->Szczecin,
                'Warszawa' => $item->Warszawa,
                'Wroclaw' => $item->Wroclaw,
                'ZielonaGora' => $item->{'Zielona Gora'},
                '7_miast' => $item->{'7 miast'},
                '10_miast' => $item->{'10 miast'},
                '6_miast_bez_Warszawy' => $item->{'6 miast bez Warszawy'},
                '9_miast' => $item->{'9 miast'}
            ]
        ];
    }
}
