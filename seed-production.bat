@echo off
echo ========================================
echo  Seed Produccion - Render PostgreSQL
echo ========================================
echo.
echo Base de datos: arman_travel
echo.
echo ADVERTENCIA: Esto modificara datos de PRODUCCION
echo.
pause

python seed-production.py

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: El seed fallo!
    echo.
    pause
    exit /b 1
)

echo.
pause
