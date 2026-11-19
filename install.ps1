# AI Agent Rules & Skills Installer (Windows PowerShell)
# Target: C:\Users\<Username>\.aside\u\0\
$ErrorActionPreference = 'Stop'

Write-Host "=== Installing AI Agent Rules, Skills & Memories ===" -ForegroundColor Cyan

$asideDir = Join-Path $env:USERPROFILE ".aside\u\0"
if (-not (Test-Path $asideDir)) {
    Write-Host "Creating Aside directory: $asideDir" -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $asideDir -Force | Out-Null
}

$repoUrl = "https://github.com/droidsunil12-dev/ai-agent-rules/archive/refs/heads/main.zip"
$zipPath = Join-Path $env:TEMP "ai-agent-rules.zip"
$extractPath = Join-Path $env:TEMP "ai-agent-rules-extract"

Write-Host "Downloading latest rules package from GitHub..." -ForegroundColor Green
Invoke-WebRequest -Uri $repoUrl -OutFile $zipPath

Write-Host "Extracting rules package..." -ForegroundColor Green
if (Test-Path $extractPath) { Remove-Item -Path $extractPath -Recurse -Force }
Expand-Archive -Path $zipPath -DestinationPath $extractPath -Force

$sourceRoot = Join-Path $extractPath "ai-agent-rules-main"
if (-not (Test-Path $sourceRoot)) {
    $sourceRoot = $extractPath
}

# 1. Copy root rules files
$filesToCopy = @("AGENTS.md", "SOUL.md", "SYSTEM-PROMPT-FOR-ANY-AI.md", "HOW-TO-USE-WITH-ANY-AI.md")
foreach ($file in $filesToCopy) {
    $src = Join-Path $sourceRoot $file
    if (Test-Path $src) {
        Copy-Item -Path $src -Destination $asideDir -Force
        Write-Host "Installed: $file" -ForegroundColor Gray
    }
}

# 2. Copy skills to skills\user
$srcSkills = Join-Path $sourceRoot "skills"
$dstSkills = Join-Path $asideDir "skills\user"
if (Test-Path $srcSkills) {
    if (-not (Test-Path $dstSkills)) { New-Item -ItemType Directory -Path $dstSkills -Force | Out-Null }
    Copy-Item -Path "$srcSkills\*" -Destination $dstSkills -Recurse -Force
    Write-Host "Installed all skills to $dstSkills" -ForegroundColor Gray
}

# 3. Copy memory to memory
$srcMem = Join-Path $sourceRoot "memory"
$dstMem = Join-Path $asideDir "memory"
if (Test-Path $srcMem) {
    if (-not (Test-Path $dstMem)) { New-Item -ItemType Directory -Path $dstMem -Force | Out-Null }
    Copy-Item -Path "$srcMem\*" -Destination $dstMem -Recurse -Force
    Write-Host "Installed memories to $dstMem" -ForegroundColor Gray
}

# Cleanup
Remove-Item -Path $zipPath -Force -ErrorAction SilentlyContinue
Remove-Item -Path $extractPath -Recurse -Force -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "=== AI Agent Rules Successfully Installed! ===" -ForegroundColor Green
Write-Host "Restart Aside or start a new agent session to immediately enforce all rules." -ForegroundColor Cyan
