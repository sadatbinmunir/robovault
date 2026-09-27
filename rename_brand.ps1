# Bulk rename ROBOCLAWW -> ROBOVAULT across all source files
$root = 'c:/Users/user/Desktop/SuDying/test project Robot'

$files = Get-ChildItem -Path $root -Recurse -File -Include *.tsx,*.ts,*.js,*.jsx,*.html,*.json,*.md |
    Where-Object { $_.FullName -notmatch 'node_modules' }

foreach ($file in $files) {
    $content = Get-Content -Raw -Path $file.FullName
    if ($null -eq $content) { continue }
    $new = $content -replace 'ROBOCLAWW', 'ROBOVAULT' -replace 'roboclaww', 'robovault'
    if ($new -ne $content) {
        Set-Content -Path $file.FullName -Value $new -NoNewline
        Write-Host "Updated: $($file.FullName)"
    }
}

# Fix the logo file name (handle the bad character in filename)
$imgDir = "$root/src/assets/images"
$badFile = Get-ChildItem -Path $imgDir | Where-Object { $_.Name -match 'robovaul' -and $_.Name -notmatch '^robovault_' }
if ($badFile) {
    Rename-Item -Path $badFile.FullName -NewName 'robovault_logo_1790436492408.jpg'
    Write-Host "Renamed logo: $($badFile.Name) -> robovault_logo_1790436492408.jpg"
} else {
    Write-Host "Logo already correctly named or not found."
}

Write-Host "Done!"
