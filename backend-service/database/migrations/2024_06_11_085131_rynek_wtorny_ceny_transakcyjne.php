<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     */
    public function up()
    {
        Schema::create('rynek_wtorny_ceny_transakcyjne', function (Blueprint $table) {
            $table->date('Kwartal'); // Kolumna Kwartal jako typ date
            $table->integer('Bialystok');
            $table->integer('Bydgoszcz');
            $table->integer('Gdansk');
            $table->integer('Gdynia');
            $table->integer('Katowice');
            $table->integer('Kielce');
            $table->integer('Krakow');
            $table->integer('Lublin');
            $table->integer('Lodz');
            $table->integer('Olsztyn');
            $table->integer('Opole');
            $table->integer('Poznan');
            $table->integer('Rzeszow');
            $table->integer('Szczecin');
            $table->integer('Warszawa');
            $table->integer('Wroclaw');
            $table->integer('Zielona Gora');
            $table->integer('7 miast');
            $table->integer('10 miast');
            $table->integer('6 miast bez Warszawy');
            $table->integer('9 miast');
        });
    }

    /**
     * Reverse the migrations.
     *
     */
    public function down()
    {
        Schema::dropIfExists('rynek_wtorny_ceny_transakcyjne');
    }
};
