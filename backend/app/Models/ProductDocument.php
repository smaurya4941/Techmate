<?php

namespace App\Models;

use Database\Factories\ProductDocumentFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductDocument extends Model
{
    /** @use HasFactory<ProductDocumentFactory> */
    use HasFactory;

    public const TYPES = ['brochure', 'datasheet', 'manual', 'certificate', 'other'];

    /** @var list<string> */
    protected $fillable = [
        'product_id', 'title', 'document_type', 'file_path', 'original_filename',
        'mime_type', 'file_size_bytes', 'language_code', 'sort_order', 'is_public',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'file_size_bytes' => 'integer',
            'sort_order' => 'integer',
            'is_public' => 'boolean',
        ];
    }

    public function scopePublic(Builder $query): Builder
    {
        return $query->where('is_public', true);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class)->withTrashed();
    }
}
