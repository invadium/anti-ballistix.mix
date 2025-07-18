class TurretPadControl {

    constructor(st) {
        extend(this, {
            alias:   'control',
            name:    'turretPadControl',
            touched: -1,
        }, st)
    }

    preInstall(body) {
        if (!body.attitude) throw `an attitude pod is expected in [${body.name}]!`
        if (!body.primaryWeapon) throw `a primary weapon pod is expected in [${body.name}]!`
    }

    capture(controllerId) {
        if (this._controllerId !== controllerId) {
            lab.monitor.controller.bind(controllerId, this)
            log(`[${this.__.name}] captured by controller #${controllerId}`)
        } else {
            log(`[${this.__.name}] human #${controllerId} takes over!`)
        }
        this.__.activatePod(this)
    }

    botTakeover() {
        log(`[${this.__.name}] bot takes over!`)
        this.__.activatePod(this.__.bot)
    }

    humanTakeover() {
        log(`[${this.__.name}] human #${this._controllerId} takes over!`)
        this.__.activatePod(this)
    }

    jumpNext() {
        const __ = this.__

        let nextFlak
        const freeFlaks = lab.port.filter(e => (e instanceof dna.city.Flak && !e.turretPadControl._controllerId) )
        if (freeFlaks.length > 0) {
            // select the closest to the right
            let minX = 999999
            freeFlaks.forEach(flak => {
                if (flak.x > __.x && flak.x < minX) {
                    minX = flak.x
                    nextFlak = flak
                }
            })

            if (!nextFlak) {
                let minX = 999999
                freeFlaks.forEach(flak => {
                    if (flak.x < minX) {
                        minX = flak.x
                        nextFlak = flak
                    }
                })
            }
        }

        if (nextFlak) {
            log('capturing the next flak')
            nextFlak.turretPadControl.capture(this._controllerId)
            __.activatePod(__.bot) // 
            // TODO jump sfx
        } else {
            // TODO denied sfx
        }
    }

    isOccupied() {
        return !!this._controllerId
    }

    actuate(action) {
        const __ = this.__
        this.touched = env.time

        if (this.deactivated) {
            this.humanTakeover()
        }

        switch(action.name) {
            case 'A':
            case 'B':
                if (__.primaryWeapon) __.primaryWeapon.trigger()
                break

            case 'Y':
                this.jumpNext()
                break
        }
    }

    act(action, dt) {
        const __ = this.__
        this.touched = env.time

        switch(action.name) {
            case 'LEFT':
                __.attitude.left(dt)
                break
            case 'RIGHT':
                __.attitude.right(dt)
                break
        }
    }

    cutOff(action) {
        const __ = this.__
        this.touched = env.time
        if (this.disabled || __.disabled) return

        switch(action.name) {
            case 'A':
            case 'B':
                if (__.primaryWeapon) __.primaryWeapon.stop()
                break
        }
    }

    evo(dt) {
        if (this.touched < 0) return
        if (env.time - this.touched > env.tune.player.botTakeoverTimeout) {
            this.touched = -1
            this.botTakeover()
        }
    }

    enable() {
        this.disabled = false
    }

    disable() {
        // ignore disabled flag flip
        this.disabled = false
    }
}
