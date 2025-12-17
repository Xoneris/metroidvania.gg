<?php

namespace App\Services;

use App\Models\Game;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class NewsFeedService {

    private string $file = "news.json";

    public function getAll(): array {

        if (!Storage::disk('local')->exists($this->file)) {
            return [];
        }

        return json_decode(Storage::disk('local')->get($this->file), true) ?? [];
    }

    public function add(array $newEntry): array {

        $news = $this->getAll();

        // if (count($news) > 7) {
        //     array_shift($news);
        // }

        $news[] = [
            'game' => $newEntry['game'] ?? '',
            'slug' => $newEntry['slug'] ?? '',
            'type' => $newEntry['type'] ?? '',
            'release_old' => $newEntry['release_old'] ?? '',
            'release_new' => $newEntry['release_new'] ?? '',
            'has_demo' => $newEntry['has_demo'] ?? '',
            'created_at' => Carbon::now()->toDateTimeString(),
        ];

        $this->save($news);

        return $news;
    }

    private function save(array $news): void {

        Storage::disk('local')->put(
            $this->file,
            json_encode($news, JSON_PRETTY_PRINT)
        );
    }
}