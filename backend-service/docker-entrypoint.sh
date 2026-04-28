#!/bin/bash
set -e

echo "🚀 Starting Laravel application setup..."

# Wait for MySQL to be ready
echo "⏳ Waiting for MySQL connection..."
max_tries=30
counter=0
until php artisan db:monitor --databases=mysql 2>/dev/null || [ $counter -eq $max_tries ]; do
    echo "Waiting for database connection... (attempt $((counter+1))/$max_tries)"
    sleep 2
    counter=$((counter+1))
done

if [ $counter -eq $max_tries ]; then
    echo "❌ Could not connect to database after $max_tries attempts"
    exit 1
fi

echo "✅ Database connection established"

# Generate app key if not set
if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "base64:" ]; then
    echo "🔑 Generating application key..."
    php artisan key:generate --force
fi

# Clear and cache config
echo "🔧 Optimizing configuration..."
php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
echo "📦 Running database migrations..."
php artisan migrate --force

# Conditional seeding - only seed if tables are empty
echo "🌱 Checking if seeding is needed..."
SEED_NEEDED=$(php artisan tinker --execute="
    use Illuminate\Support\Facades\DB;
    \$count = DB::table('rynek_pierwotny_ceny_ofertowe')->count();
    echo \$count > 0 ? 'no' : 'yes';
" 2>/dev/null | tail -n1)

if [ "$SEED_NEEDED" = "yes" ]; then
    echo "📊 Seeding database with initial data..."
    php artisan db:seed --force
    echo "✅ Database seeded successfully"
else
    echo "ℹ️  Database already contains data, skipping seeding"
fi

# Create storage link if not exists
if [ ! -L "public/storage" ]; then
    echo "🔗 Creating storage link..."
    php artisan storage:link 2>/dev/null || true
fi

echo "✅ Application setup complete!"
echo "🌐 Starting server on port 8000..."

# Start the Laravel development server
exec php artisan serve --host=0.0.0.0 --port=8000
