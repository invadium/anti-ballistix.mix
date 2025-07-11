class Body extends LabFrame {

    constructor(st) {
        super( extend({ 
            x:     0,
            y:     0,
            r:     1,
            dir:   0,
            mass:  100,
        }, st) )

        // install pods
        const body = this
        if (isArray(this.pods)) {
            this.pods.forEach(pod => body.install(pod))
        }
    }

    // get a set of body-local coordinates from the provided world/parent coordinates
    lxy(px, py) {
        const cdir = -this.dir,
              lx = px - this.x,
              ly = py - this.y
        return [
            lx * cos(cdir) - ly * sin(cdir),
            lx * sin(cdir) + ly * cos(cdir),
        ]
    }

    // get a set of world/parent coordinates from the provided body-local coordinates
    pxy(lx, ly) {
        const { x, y, dir } = this
        const px = lx * cos(dir) - ly * sin(dir),
              py = lx * sin(dir) + ly * cos(dir)
        return [
            x + px,
            y + py,
        ]
    }

    pick(x, y, ls) {
        if (this.dead) return

        const lxy = this.lxy(x, y)
        const dist = math.length( lxy[0], lxy[1] )
        if (dist <= this.r) {
            ls.push(this)
            return this
        }
    }

    install(pod) {
        if (isArray(pod)) {
            for (let i = 0; i < pod.length; i++) {
                const p = pod[i]
                this.install(p)
            }
            return pod
        }

        // determine the install alias
        const name  = pod.name
        const alias = pod.alias || pod.name

        // run pre-install procedures
        if (isFun(pod.preInstall)) pod.preInstall(this)

        // uninstall the previous named pod if present
        this.uninstall(name)

        // deactivate the previous alias pods if present
        const prevPod = this[alias]
        if (prevPod) {
            this.deactivatePod(prevPod)
            if (prevPod.name === prevPod.alias) this.uninstall(prevPod)
        }

        // install a new one
        this.attach(pod, pod.name || pod.alias)
        //if (pod.name !== alias) this[alias] = pod
        this.activatePod(pod)

        if (isFun(pod.onInstall)) pod.onInstall()

        return pod
    }

    _getPod(pod) {
        if (!pod) return

        if (isString(pod)) {
            const podEntity = this[pod]
            if (!podEntity) return
            return podEntity
        } else if (isObj(pod)) {
            if (this._ls.indexOf(pod) < 0) return
            return pod
        }
    }

    activatePod(targetPod) {
        const pod = this._getPod(targetPod)
        if (!pod) return false // missing pod

        if (this[pod.alias] && this[pod.alias] !== pod) {
            this.deactivatePod(pod.alias, pod)
        }

        if (isFun(pod.deactivate)) {
            pod.deactivate()
        } else {
            pod.deactivated = false 

            if (isFun(pod.resume)) pod.resume()
            else pod.paused = false
            if (isFun(pod.show)) pod.show()
            else pod.hidden = false
            if (isFun(pod.enable)) pod.enable()
            else pod.disabled = false
        }
        if (pod.alias && pod.name !== pod.alias) {
            // assign to the alias
            this[pod.alias] = pod
        }
        if (isFun(pod.onActivate)) pod.onActivate()

        return true
    }

    deactivatePod(targetPod, nextPod) {
        const pod = this._getPod(targetPod)
        if (!pod) return false

        if (isFun(pod.deactivate)) {
            pod.deactivate()
        } else {
            pod.deactivated = true

            if (isFun(pod.disable)) pod.disable()
            else pod.disabled = true
            if (isFun(pod.pause)) pod.pause()
            else pod.paused = true
            if (isFun(pod.hide)) pod.hide()
            else pod.hidden = true
        }
        if (pod.name !== pod.alias) {
            // remove the aliased name
            delete this[pod.alias]
        }
        if (isFun(pod.onDeactivate)) pod.onDeactivate(nextPod)

        return true
    }

    isActivated(targetPod) {
        const pod = this._getPod(targetPod)
        if (!pod) return false
        return !pod.deactivated
    }

    uninstall(targetPod) {
        const pod = this._getPod(targetPod)
        if (!pod) return false

        if (isFun(pod.onUninstall)) pod.onUninstall()
        this.detach(pod)
        if (pod.alias && pod.alias !== pod.name) {
            delete this[pod.alias]
        }
        return true
    }

    evo(dt) {
        let dirtyZ = false
        let Z = Number.MIN_SAFE_INTEGER

        for (let i = 0; i < this._ls.length; i++) {
            const e = this._ls[i]
            if (e.evo && !e.dead && !e.paused && (!e.probe || env.debug)) {
                e.evo(dt)
            }
            if (e.Z) {
                if (e.Z < Z) dirtyZ = true
                Z = e.Z
            }
        }

        if (dirtyZ) this.orderZ()
    }

    draw() {
        for (let i = 0; i < this._ls.length; i++) {
            const e = this._ls[i]
            if (e.draw && !e.dead && !e.hidden &&(!e.probe || env.debug)) {
                e.draw()
            }
        }
    }

    getTitle() {
        return this.name || 'unknown-body'
    }
}
