const Platform = require('dna/city/Platform')

class GuidedWeapon extends Platform {

    constructor(st) {
        super(st)
    }

    gridWave(target) {
        // get the grid coordinate of the hit
        const wx   = this.x,
              wy   = this.y,
              vy   = pin.cam.grid.wyToVPY(wy),      // quasi-normalized viewport Y
              gpos = pin.cam.grid.backTrace(wx, vy)
        // touch the gird
        // const dot = pin.cam.grid.closestDot( gpos )
        // if (dot) dot.elevate()
        const shockwave = lab.port.spawn('Shockwave', {
            x:    gpos[0],
            y:    gpos[1],
            z:    gpos[2],
        })
    }

}
