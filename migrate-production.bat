@echo off
echo ========================================
echo  Migraciones a Produccion - Render
echo ========================================
echo.
echo Base de datos: arman_travel (Render PostgreSQL)
echo.

cd backend

echo [1/2] Ejecutando migraciones...
alembic -c alembic.production.ini upgrade head

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Las migraciones fallaron!
    echo.
    pause
    exit /b 1
)

echo.
echo [2/2] Verificando estado...
alembic -c alembic.production.ini current

echo.
echo ========================================
echo  Migraciones completadas exitosamente!
echo ========================================
echo.
echo Siguiente paso opcional:
echo   - Ejecutar seed-production.bat para agregar datos iniciales
echo.
pause
