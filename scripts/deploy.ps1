$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent

function Read-EnvValue {
  param([string]$Path, [string]$Name)
  if (-not (Test-Path -LiteralPath $Path)) { return $null }
  foreach ($line in Get-Content -LiteralPath $Path) {
    $trimmed = $line.Trim()
    if ($trimmed -eq '' -or $trimmed.StartsWith('#')) { continue }
    if ($trimmed.StartsWith('export ')) { $trimmed = $trimmed.Substring(7).Trim() }
    $eq = $trimmed.IndexOf('=')
    if ($eq -lt 1) { continue }
    if ($trimmed.Substring(0, $eq).Trim() -ne $Name) { continue }
    $value = $trimmed.Substring($eq + 1).Trim()
    if ($value.Length -ge 2 -and (($value[0] -eq '"' -and $value[-1] -eq '"') -or ($value[0] -eq "'" -and $value[-1] -eq "'"))) {
      $value = $value.Substring(1, $value.Length - 2)
    }
    return $value
  }
  return $null
}

$vpsDest = Read-EnvValue -Path (Join-Path $projectRoot '.env') -Name 'VPS_DEST'
if (-not $vpsDest) { throw 'VPS_DEST is not set in .env (expected format: user@host:/path/to/www).' }

Write-Output "Deploying to $vpsDest"
git -C $projectRoot checkout main
if (-not $?) { throw 'git checkout main failed.' }
git -C $projectRoot pull
if (-not $?) { throw 'git pull failed.' }

pnpm build
if (-not $?) { throw 'pnpm build failed.' }

$dist = Join-Path $projectRoot 'dist'
if (-not (Test-Path $dist)) { throw 'Build did not produce dist/' }
$items = @(Get-ChildItem -LiteralPath $dist | ForEach-Object { $_.FullName })
if ($items.Count -eq 0) { throw 'dist/ is empty; refusing to deploy.' }
scp -r @items $vpsDest
if (-not $?) { throw "scp to $vpsDest failed." }
Write-Output "Deployed $($items.Count) item(s) to $vpsDest"
