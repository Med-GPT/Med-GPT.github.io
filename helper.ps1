#!/usr/bin/env pwsh

param(
    [string]$command,
    [switch]$force
)

$ErrorActionPreference = "Stop"

$branch = git rev-parse --abbrev-ref HEAD
$time = $(Get-Date -Format 'hh:mmtt - dd/MM/yy')
$pkg = Get-Content -Raw package.json | ConvertFrom-Json

$repo = "Med-GPT/Med-GPT"
$api = "https://api.github.com/repos/$repo/releases/latest"

switch ($command) {

    push {
        git add -A
        git commit -S
        git push origin $branch $($force ? '--force': $null)
    }

}
    
