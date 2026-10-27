$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$projectDirectory = if ($PSScriptRoot) { Split-Path -Parent $PSScriptRoot } else { (Get-Location).Path }
$imageDirectory = Join-Path $projectDirectory 'public/assets/images'
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$parameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
$parameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]85)
try {
    Get-ChildItem -LiteralPath $imageDirectory -Filter '*.png' -Recurse -File |
        Where-Object { $_.Directory.Name -ne 'logo' } |
        ForEach-Object {
            $taskImage = [System.Drawing.Image]::FromFile($_.FullName)
            try {
                $destination = [System.IO.Path]::ChangeExtension($_.FullName, '.jpg')
                $taskImage.Save($destination, $encoder, $parameters)
                Write-Output ([System.IO.Path]::GetFileName($destination))
            } finally { $taskImage.Dispose() }
        }
} finally { $parameters.Dispose() }
