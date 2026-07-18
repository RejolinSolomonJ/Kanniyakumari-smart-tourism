$ErrorActionPreference = "Stop"

Write-Host "Downloading PostgreSQL binaries (this may take a minute)..."
Invoke-WebRequest -Uri "https://get.enterprisedb.com/postgresql/postgresql-15.8-1-windows-x64-binaries.zip" -OutFile "postgres.zip"

Write-Host "Extracting PostgreSQL..."
Expand-Archive -Path "postgres.zip" -DestinationPath ".\postgres_local" -Force

Write-Host "Initializing database..."
cd .\postgres_local\pgsql\bin
.\initdb.exe -D ..\data -U user -A trust

Write-Host "Starting PostgreSQL server on port 5432..."
.\pg_ctl.exe -D ..\data -l logfile start

Start-Sleep -Seconds 3

Write-Host "Creating database 'kanyakumari_tourism'..."
.\createdb.exe -U user -h localhost -p 5432 kanyakumari_tourism

Write-Host "PostgreSQL started successfully!"
