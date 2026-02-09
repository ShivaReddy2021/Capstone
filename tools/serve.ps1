<#
Simple PowerShell static server (no Python/Node required)
Usage: ./serve.ps1 -Root .\smrbuilders -Port 8000
#>
param(
  [string]$Root = ".",
  [int]$Port = 8000
)

Set-Location $Root
$prefix = "http://localhost:$Port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
try {
  $listener.Start()
  Write-Host "Serving $((Get-Location).Path) at $prefix - press Ctrl+C to stop"
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $req = $context.Request
    $resp = $context.Response
    $path = $req.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrEmpty($path)) { $path = 'index.html' }
    $file = Join-Path (Get-Location) $path
    if (Test-Path $file) {
      $ext = [System.IO.Path]::GetExtension($file).ToLower()
      switch ($ext) {
        '.html' { $ct='text/html' }
        '.css'  { $ct='text/css' }
        '.js'   { $ct='application/javascript' }
        '.svg'  { $ct='image/svg+xml' }
        '.png'  { $ct='image/png' }
        '.jpg' { $ct='image/jpeg' }
        '.jpeg' { $ct='image/jpeg' }
        default { $ct='application/octet-stream' }
      }
      $bytes = [System.IO.File]::ReadAllBytes($file)
      $resp.ContentType = $ct
      $resp.ContentLength64 = $bytes.Length
      $resp.OutputStream.Write($bytes,0,$bytes.Length)
    } else {
      $resp.StatusCode = 404
      $buf = [System.Text.Encoding]::UTF8.GetBytes('404 Not Found')
      $resp.OutputStream.Write($buf,0,$buf.Length)
    }
    $resp.OutputStream.Close()
  }
} finally {
  if ($listener -and $listener.IsListening) { $listener.Stop(); $listener.Close() }
}
