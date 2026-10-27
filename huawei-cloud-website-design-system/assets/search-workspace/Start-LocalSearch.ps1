param([string]$NodePath = '')
$ErrorActionPreference = 'Stop'
if (-not $NodePath) {
  $command = Get-Command node -ErrorAction SilentlyContinue
  if ($command) { $NodePath = $command.Source }
  else {
    $bundled = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
    if (Test-Path -LiteralPath $bundled) { $NodePath = $bundled }
    else { throw 'Node not found. Supply -NodePath or install Node >=22.12.' }
  }
}
if (-not (Test-Path -LiteralPath (Join-Path $PSScriptRoot 'dist\index.html'))) { throw 'Run pnpm install --frozen-lockfile and pnpm run build first.' }
Push-Location -LiteralPath $PSScriptRoot
try { & $NodePath 'server/server.mjs' } finally { Pop-Location }
