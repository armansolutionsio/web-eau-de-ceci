#!/bin/bash
# Script para limpiar y reiniciar Docker completamente

echo "🧹 Limpiando contenedores huérfanos..."
docker-compose down --remove-orphans

echo "🗑️  Eliminando volúmenes..."
docker-compose down -v --remove-orphans

echo "🏗️  Construyendo imágenes..."
docker-compose build --no-cache

echo "🚀 Levantando servicios..."
docker-compose up

echo "✅ Listo!"
