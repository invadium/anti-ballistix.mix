function pipeline() {
    /*
    //
    // TODO for some misterious reason the pipeline rendering sequence is compromised. WHY?????
    //
    const stage = $.pipeline.stage
    stage.detach( stage.background )

    stage.attach( {
        Z:     21,
        __$:   $,
        name: 'background',
        draw: function() {
            const _ = this.__$
            if (_.lab.background && !_.lab._dir.background) {
                //_.lab.ctx.draw.background( _.lab.background )
                //_.lab.ctx._drawContext.background( _.lab.background )
                //_.lab.ctx.draw.fill( '#808080' )
                //_.lab.ctx.draw.rect( 20, 20, 400, 400 )
                _.lab.ctx.fillStyle = '#808080'
                _.lab.ctx.fillRect(20, 20, 400, 400 )
            }
        },
    } )
    stage.attach( {
        Z:     61,
        __$:   $,
        name: 'postPostVFX',
        draw: function() {
            const _ = this.__$
            if (_.lab.background && !_.lab._dir.background) {
                //_.lab.ctx.draw.background( _.lab.background )
                //_.lab.ctx._drawContext.background( _.lab.background )
                //_.lab.ctx.draw.fill( '#808080' )
                //_.lab.ctx.draw.rect( 20, 20, 400, 400 )
                _.lab.ctx.fillStyle = '#4080be'
                _.lab.ctx.fillRect(200, 200, 300, 300 )
            }
        },
    } )
    stage.orderZ()
    */
}
pipeline.Z = 5

