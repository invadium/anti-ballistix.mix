const Platform = require('dna/city/Platform')

class GuidedWeapon extends Platform {

    constructor(st) {
        super( extend({
            shockwave: 30,
        }, st) )
    }

    gridWave(target) {
        // get the grid coordinate of the hit
        let gpos

        if (target && target.dot) {
            gpos = target.dot.pos
        } else {
            const wx   = this.x,
                  wy   = this.y,
                  vy   = pin.cam.grid.wyToVPY(wy)   // quasi-normalized viewport Y
            gpos = pin.cam.grid.backTrace(wx, vy)   // grid-space coordinates
        }

        const shockwave = lab.port.spawn('Shockwave', {
            x:     gpos[0],
            y:     gpos[1],
            z:     gpos[2],
            force: this.shockwave,
        })
    }

}
