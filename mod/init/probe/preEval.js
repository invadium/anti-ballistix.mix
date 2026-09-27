function preEval(__$, script) {
    if (script.origin.startsWith('mod/') && lab.ctx) {
        script.context.canvas = lab.canvas
        script.context.ctx = lab.ctx
        Object.keys(lab.ctx._drawContext).forEach(key => {
            script.context[key] = lab.ctx._drawContext[key]
        })
    }
}

preEval.init = function() {}
