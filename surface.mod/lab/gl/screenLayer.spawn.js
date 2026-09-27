const PLAIN = 0

// Spawn a layer to draw
const screenLayer = {
    DNA: 'Layer',
    Z:   5,

    mode: PLAIN,

    getTargetCanvas() {
        return $.lab.canvas
    },

    fixProgram() {
        switch(this.mode) {
            case PLAIN: this.program = lib.glPrograms.sepia; break;
        }
    },

    fixUniforms() {
        switch(this.mode) {
            case PLAIN:
                // no uniforms in the basic shader
                break
        }
    },

    setup() {
        if (env.config.plain) this.mode = PLAIN
    },
}
screenLayer.PLAIN = PLAIN
