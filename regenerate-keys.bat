@echo off
setlocal
cd /d "%~dp0"

set "NODE_EXE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if not exist "%NODE_EXE%" set "NODE_EXE=node"

"%NODE_EXE%" tools\generate-demo-keys.mjs
if errorlevel 1 (
  echo Failed to regenerate RSA keys.
  pause
  exit /b 1
)

echo RSA keys regenerated.
pause
