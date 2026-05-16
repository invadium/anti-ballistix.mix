function horizonLineY() {
    throw new Error('deprecated!')
    return env.tune.horizonLine * ctx.height
}

const screen = {

    horizonLineY,

    skyHeight: horizonLineY,

    groundHeight: function() {
        throw new Error('deprecated!')
        return ( ctx.height - horizonLineY() )
    },

}
