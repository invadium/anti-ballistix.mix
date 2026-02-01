function horizonLineY() {
    return env.tune.horizonLine * ctx.height
}

const screen = {

    horizonLineY,

    skyHeight: horizonLineY,

    groundHeight: function() {
        return ( ctx.height - horizonLineY() )
    },

}
