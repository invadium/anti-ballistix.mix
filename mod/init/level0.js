function init() {
    log('=== Init Level 0  ===')

    const bufCanvas = __$.pipeline.createFullscreenCanvasBuffer2D()
    lab.canvas = bufCanvas
    lab.ctx = bufCanvas.ctx
    lab.alt = {}
    lab.ctx._drawContext = $.createDrawContext(lab.ctx, lab.alt)
}
