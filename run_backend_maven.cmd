@echo off
setlocal
set BACKEND_DIR=%~dp0backend
cd /d "%BACKEND_DIR%"

echo === Checking wrapper files ===
dir mvnw.cmd
dir .mvn\wrapper

echo === Running Maven wrapper ===
cmd /c mvnw.cmd -v
cmd /c mvnw.cmd spring-boot:run
endlocal

