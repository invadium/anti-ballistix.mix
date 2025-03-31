let id = 0

class Explosion {

    constructor(st) {
        augment(this, {
            team:  1,
            name: 'explosion' + (++id),
            x:     0,
            y:     0,
            force: 12,
            rays:      [],
            baseAngle: 0,
            spread:    TAU,
        }, st)

        for (let i = 0; i < this.force; i++) {
            const a = this.baseAngle +i * (this.spread / this.force)
            this.rays.push({
                a:         a,
                maxP:      0,
                minP:      0,
                speed:     100,
                maxLength: 40,
                maxReach:  100 + RND(20),
                state:     0,
                dead:      false,
            })
        }
    }

    evo(dt) {
        let deadCount = 0
        for (let i = 0; i < this.rays.length; i++) {
            const ray = this.rays[i]
            if (ray.dead) {
                deadCount ++
            } else {
                switch(ray.state) {
                    case 0:
                        ray.maxP += ray.speed * dt
                        if (ray.maxP >= ray.maxReach || ray.maxP - ray.minP >= ray.maxLength) {
                            ray.state = 1
                        }
                        break
                    case 1:
                        ray.maxP = min(ray.maxP + ray.speed * dt, ray.maxReach)
                        ray.minP += ray.speed * dt
                        if (ray.minP > ray.maxReach) {
                            ray.state = 2
                            ray.dead = true
                        }
                        break
                }
            }
        }
        if (deadCount >= this.rays.length) {
            kill(this)
        }
    }

    draw() {
        save()
        translate(this.x, this.y)

        const c = env.team.color(this),
              g = env.team.glow(this)

        for (let i = 0; i < this.rays.length; i++) {
            const ray = this.rays[i]
            if (!ray.dead) {
                const dx = cos(ray.a),
                      dy = sin(ray.a)
                neon.line(dx*ray.minP, dy*ray.minP, dx*ray.maxP, dy*ray.maxP, c, g)
            }
        }

        restore()
    }
}
