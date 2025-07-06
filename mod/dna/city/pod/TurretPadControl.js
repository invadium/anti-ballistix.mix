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
        lab.monitor.controller.bind(controllerId, this)
        this.__.activatePod(this)
        log(`[${this.__.name}] captured by human #${controllerId}!`)
    }

    botTakeover() {
        log(`[${this.__.name}] bot takes over!`)
        this.__.activatePod(this.__.bot)
    }

    humanTakeover() {
        log(`[${this.__.name}] human takes over!`)
        this.__.activatePod(this)
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
