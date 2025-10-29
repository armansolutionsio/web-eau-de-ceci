@echo off
echo ====================================
echo  Eau de Ceci - Inicio Rapido
echo ====================================
echo.

REM Limpiar contenedores huerfanos
echo [1/3] Limpiando contenedores antiguos...
docker-compose down --remove-orphans 2>nul

echo.
echo [2/3] Construyendo imagenes...
docker-compose build

echo.
echo [3/3] Levantando servicios...
echo.
echo La aplicacion estara disponible en:
echo   http://localhost:8000
echo.
echo Para detener: Ctrl+C
echo.

docker-compose up
