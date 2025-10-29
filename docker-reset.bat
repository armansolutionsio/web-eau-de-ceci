@echo off
REM Script para limpiar y reiniciar Docker completamente en Windows

echo Limpiando contenedores huerfanos...
docker-compose down --remove-orphans

echo Eliminando volumenes...
docker-compose down -v --remove-orphans

echo Construyendo imagenes...
docker-compose build --no-cache

echo Levantando servicios...
docker-compose up

echo Listo!
