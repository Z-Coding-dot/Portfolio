# Render the navbar logo's split Z as native vector app icons.
param([string]$OutputDirectory = (Join-Path (Get-Location) 'public/icons'))

Add-Type -AssemblyName System.Drawing

function Write-ZIcon([string]$IconName, [int]$IconSize) {
    $iconBitmap = New-Object System.Drawing.Bitmap($IconSize, $IconSize)
    $iconGraphics = [System.Drawing.Graphics]::FromImage($iconBitmap)
    $iconGraphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#0c0a09'))
    $iconGraphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $iconGraphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $iconScale = $IconSize / 512.0
    $iconTransform = [System.Drawing.Drawing2D.Matrix]::new(
        (4.9 * $iconScale), 0, 0, (4.9 * $iconScale), (128 * $iconScale), (108 * $iconScale)
    )
    $iconGraphics.Transform = $iconTransform
    $gradientBrush = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
        [System.Drawing.PointF]::new(0, 0), [System.Drawing.PointF]::new(52, 62),
        [System.Drawing.ColorTranslator]::FromHtml('#F508CF'),
        [System.Drawing.ColorTranslator]::FromHtml('#4B9CF4')
    )
    $gradientStops = [System.Drawing.Drawing2D.ColorBlend]::new(3)
    $gradientStops.Colors = [System.Drawing.Color[]]@(
        [System.Drawing.ColorTranslator]::FromHtml('#F508CF'),
        [System.Drawing.ColorTranslator]::FromHtml('#04DAFE'),
        [System.Drawing.ColorTranslator]::FromHtml('#4B9CF4')
    )
    $gradientStops.Positions = [single[]]@(0, 0.5, 1)
    $gradientBrush.InterpolationColors = $gradientStops
    $iconPen = [System.Drawing.Pen]::new($gradientBrush, 12)
    $iconPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $iconPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $iconPen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    try {
        $iconGraphics.DrawLines($iconPen, [System.Drawing.PointF[]]@(
            [System.Drawing.PointF]::new(7, 6),
            [System.Drawing.PointF]::new(45, 6),
            [System.Drawing.PointF]::new(31, 21)
        ))
        $iconGraphics.DrawLines($iconPen, [System.Drawing.PointF[]]@(
            [System.Drawing.PointF]::new(18, 41),
            [System.Drawing.PointF]::new(6, 55),
            [System.Drawing.PointF]::new(45, 55)
        ))
        $iconBitmap.Save((Join-Path $OutputDirectory $IconName), [System.Drawing.Imaging.ImageFormat]::Png)
    } finally {
        $iconPen.Dispose()
        $gradientBrush.Dispose()
        $iconGraphics.Dispose()
        $iconTransform.Dispose()
        $iconBitmap.Dispose()
    }
}

Write-ZIcon 'z-192.png' 192
Write-ZIcon 'z-512.png' 512
Write-ZIcon 'z-maskable-512.png' 512
Write-ZIcon 'z-apple-touch-152.png' 152
Write-ZIcon 'z-apple-touch-167.png' 167
Write-ZIcon 'z-apple-touch-180.png' 180
