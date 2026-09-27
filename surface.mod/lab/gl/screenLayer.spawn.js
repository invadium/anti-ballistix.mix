const PLAIN   = 0
const EFFECT1 = 1

// Spawn a layer to draw
const screenLayer = {
    DNA: 'Layer',
    Z:   5,

    mode: EFFECT1,

    getTargetCanvas() {
        return $.lab.canvas
    },

    fixProgram() {
        switch(this.mode) {
            case PLAIN: this.program = lib.glPrograms.plain; break;
            case EFFECT1: this.program = lib.glPrograms.sepia; break;
        }
    },

    fixUniforms() {
        switch(this.mode) {
            case PLAIN:
                // no uniforms in the basic shader
                break
            case EFFECT1:
                // no uniforms in the basic shader
                break
        }
    },

    setup() {
        if (env.config.plain) this.mode = PLAIN
    },
}
screenLayer.PLAIN = PLAIN
screenLayer.EFFECT1 = EFFECT1

