# ============================================
# Housing Prices Application - Makefile
# Convenient commands for Docker management
# ============================================

.PHONY: help build up down restart logs shell-backend shell-frontend clean migrate seed fresh test

# Default target
help:
	@echo "╔════════════════════════════════════════════════════════════╗"
	@echo "║        Housing Prices Application - Docker Commands        ║"
	@echo "╠════════════════════════════════════════════════════════════╣"
	@echo "║  make build      - Build all Docker images                 ║"
	@echo "║  make up         - Start all containers                    ║"
	@echo "║  make down       - Stop all containers                     ║"
	@echo "║  make restart    - Restart all containers                  ║"
	@echo "║  make logs       - Show logs from all containers           ║"
	@echo "║  make logs-b     - Show backend logs only                  ║"
	@echo "║  make logs-f     - Show frontend logs only                 ║"
	@echo "║  make shell-b    - Access backend container shell          ║"
	@echo "║  make shell-f    - Access frontend container shell         ║"
	@echo "║  make migrate    - Run database migrations                 ║"
	@echo "║  make seed       - Run database seeders                    ║"
	@echo "║  make fresh      - Fresh migration with seeding            ║"
	@echo "║  make clean      - Remove all containers and volumes       ║"
	@echo "║  make test       - Run all tests                           ║"
	@echo "║  make status     - Show container status                   ║"
	@echo "╚════════════════════════════════════════════════════════════╝"

# Build Docker images
build:
	@echo "🔨 Building Docker images..."
	docker compose build --no-cache

# Build with cache
build-cache:
	@echo "🔨 Building Docker images (with cache)..."
	docker compose build

# Start containers
up:
	@echo "🚀 Starting containers..."
	docker compose up -d
	@echo "✅ Application started!"
	@echo "   Frontend: http://localhost:4200"
	@echo "   Backend:  http://localhost:8000"

# Start with logs
up-logs:
	@echo "🚀 Starting containers with logs..."
	docker compose up

# Stop containers
down:
	@echo "🛑 Stopping containers..."
	docker compose down

# Restart containers
restart: down up

# Show logs
logs:
	docker compose logs -f

logs-b:
	docker compose logs -f backend

logs-f:
	docker compose logs -f frontend

logs-db:
	docker compose logs -f mysql

# Access container shells
shell-b:
	docker compose exec backend bash

shell-f:
	docker compose exec frontend sh

shell-db:
	docker compose exec mysql mysql -u root -p

# Database commands
migrate:
	@echo "📦 Running migrations..."
	docker compose exec backend php artisan migrate --force

seed:
	@echo "🌱 Running seeders..."
	docker compose exec backend php artisan db:seed --force

fresh:
	@echo "🔄 Fresh migration with seeding..."
	docker compose exec backend php artisan migrate:fresh --seed --force

# Testing
test:
	@echo "🧪 Running backend tests..."
	docker compose exec backend php artisan test

test-frontend:
	@echo "🧪 Running frontend tests..."
	docker compose exec frontend npm test -- --watch=false

# Clean up
clean:
	@echo "🧹 Cleaning up Docker resources..."
	docker compose down -v --remove-orphans
	docker system prune -f

# Deep clean (removes images too)
clean-all: clean
	@echo "🧹 Removing Docker images..."
	docker compose down --rmi all -v --remove-orphans

# Status
status:
	@echo "📊 Container status:"
	docker compose ps

# Health check
health:
	@echo "🏥 Health check..."
	@curl -s http://localhost:8000/api/health | jq . || echo "Backend not responding"
	@curl -s -o /dev/null -w "Frontend: %{http_code}\n" http://localhost:4200 || echo "Frontend not responding"

# Production deployment (example)
deploy-prod:
	@echo "🚀 Deploying to production..."
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

# Initialize project (first time setup)
init: build up
	@echo "⏳ Waiting for services to start..."
	@sleep 30
	@echo "✅ Project initialized!"
	@make status