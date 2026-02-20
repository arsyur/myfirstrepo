# Устанавливает MINIMAX_API_KEY в Vercel из локального .env
# Требует: .env с VERCEL_TOKEN и MINIMAX_API_KEY (и опционально VERCEL_PROJECT_NAME)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$envPath = Join-Path $root ".env"

if (-not (Test-Path $envPath)) {
  Write-Host "Create .env from .env.example and set VERCEL_TOKEN, MINIMAX_API_KEY"
  exit 1
}

$lines = Get-Content $envPath
$vars = @{}
foreach ($line in $lines) {
  if ($line -match '^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$') {
    $vars[$matches[1]] = $matches[2].Trim().Trim('"').Trim("'")
  }
}

$token = $vars["VERCEL_TOKEN"]
$key   = $vars["MINIMAX_API_KEY"]
$proj  = $vars["VERCEL_PROJECT_NAME"]
if (-not $proj) { $proj = "myfirstrepo" }

if (-not $token) { Write-Host "VERCEL_TOKEN missing in .env"; exit 1 }
if (-not $key)   { Write-Host "MINIMAX_API_KEY missing in .env"; exit 1 }

$body = @{
  key    = "MINIMAX_API_KEY"
  value  = $key
  type   = "encrypted"
  target = @("production")
} | ConvertTo-Json

$headers = @{
  "Authorization" = "Bearer $token"
  "Content-Type"  = "application/json"
}

$url = "https://api.vercel.com/v10/projects/$proj/env"
try {
  $r = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body
  Write-Host "MINIMAX_API_KEY set in Vercel (production). Redeploy the project to apply."
} catch {
  Write-Host "Error: $($_.Exception.Message)"
  if ($_.Exception.Response) {
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    Write-Host $reader.ReadToEnd()
  }
  exit 1
}
