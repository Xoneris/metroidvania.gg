<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('submit_games', function (Blueprint $table) {
            // Basic info of the Game
            $table->id();
            $table->string('name');
            $table->string('developer');
            $table->string('publisher');
            $table->text('description');
            $table->string('release_window')->nullable();
            $table->string('slug');
            $table->boolean('demo');
            $table->boolean('early_access');
            $table->string('trailer');
            $table->string('twitter')->nullable();
            $table->string('epic')->nullable();
            $table->string('facebook')->nullable();
            $table->string('gog')->nullable();
            $table->string('homepage')->nullable();
            $table->string('instagram')->nullable();
            $table->string('nintendo')->nullable();
            $table->string('playstation')->nullable();
            $table->string('steam')->nullable();
            $table->string('tiktok')->nullable();
            $table->string('xbox')->nullable();
            $table->string('youtube')->nullable();
            $table->string('kickstarter_page')->nullable();
            $table->string('discord')->nullable();
            $table->date('release_date')->nullable();
            $table->string('kickstarter_status')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submit_games');
    }
};
