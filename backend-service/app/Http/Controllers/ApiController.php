<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use DOMDocument;

class ApiController extends Controller
{
    public function getInterestRates()
    {
        $path = database_path('seeders/data/stopy_procentowe.xml');

        $doc = new DOMDocument();
        $doc->load($path);

        $root = $doc->documentElement;
        $data = [];

        foreach ($root->getElementsByTagName('pozycje') as $pozycje) {
            $obowiazuje_od = $pozycje->getAttribute('obowiazuje_od');
            $oprocentowanie = $pozycje->getAttribute('oprocentowanie');

            $data[] = [
                'obowiazuje_od' => $obowiazuje_od,
                'oprocentowanie' => $oprocentowanie
            ];
        }

        return response()->json($data);
    }
}
