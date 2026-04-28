<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use League\Csv\Reader;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Only seeds tables that are empty to prevent duplicate data on restarts.
     */
    public function run()
    {
        $tables = [
            'rynek_pierwotny_ceny_ofertowe' => 'RynekPierwotnyCenyOfertowe.csv',
            'rynek_pierwotny_ceny_transakcyjne' => 'RynekPierwotnyCenyTransakcyjne.csv',
            'rynek_wtorny_ceny_ofertowe' => 'RynekWtornyCenyOfertowe.csv',
            'rynek_wtorny_ceny_transakcyjne' => 'RynekWtornyCenyTransakcyjne.csv',
        ];

        foreach ($tables as $tableName => $csvFile) {
            $this->seedTableFromCsvIfEmpty($tableName, database_path('seeders/data/' . $csvFile));
        }
    }

    /**
     * Seed a table from CSV only if it's empty.
     * This prevents duplicate data when Docker container restarts.
     */
    private function seedTableFromCsvIfEmpty(string $tableName, string $filePath): void
    {
        // Check if table already has data
        $existingCount = DB::table($tableName)->count();
        
        if ($existingCount > 0) {
            $this->command->info("⏭️  Skipping {$tableName} - already contains {$existingCount} records");
            Log::info("Seeder skipped {$tableName} - already contains {$existingCount} records");
            return;
        }

        // Check if CSV file exists
        if (!file_exists($filePath)) {
            $this->command->error("❌ CSV file not found: {$filePath}");
            Log::error("Seeder error: CSV file not found: {$filePath}");
            return;
        }

        try {
            $csv = Reader::createFromPath($filePath, 'r');
            $csv->setHeaderOffset(0);
            $records = $csv->getRecords();
            
            $data = [];
            foreach ($records as $record) {
                $data[] = $record;
            }

            // Insert data in chunks to avoid memory issues
            $chunks = array_chunk($data, 100);
            foreach ($chunks as $chunk) {
                DB::table($tableName)->insert($chunk);
            }

            $count = count($data);
            $this->command->info("✅ Seeded {$tableName} with {$count} records");
            Log::info("Seeder completed {$tableName} with {$count} records");
            
        } catch (\Exception $e) {
            $this->command->error("❌ Error seeding {$tableName}: " . $e->getMessage());
            Log::error("Seeder error for {$tableName}: " . $e->getMessage());
            throw $e;
        }
    }
}
