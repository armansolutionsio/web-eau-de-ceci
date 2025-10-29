@echo off
echo ========================================
echo  Deploy Rapido a Render
echo ========================================
echo.

echo [1/3] Agregando cambios a Git...
git add .

echo.
echo [2/3] Creando commit...
git commit -m "Fix: Use DATABASE_URL env var for Alembic migrations"

echo.
echo [3/3] Haciendo push a GitHub...
git push

echo.
echo ========================================
echo  Push completado!
echo ========================================
echo.
echo Render detectara el cambio y desplegara automaticamente.
echo.
echo Monitorea el deploy en:
echo   https://dashboard.render.com
echo.
pause
