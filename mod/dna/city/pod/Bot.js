const MOVE_LEFT  = 1,
      MOVE_RIGHT = 2

class Bot {

    constructor(st) {
        extend(this, {
            type:    'pod',
            subtype: 'ai',
            name:    'bot',
            alias:   'control',

            timeout: 0,
        }, st)

    }

    /*
    // TODO figure out where to move these checks
    //      shouldn't it be a dependency injection of some sorts?
    preInstall(body) {
        if (!body.attitude) throw `an attitude pod is expected in [${body.name}]!`
        if (!body.primaryWeapon) throw `a primary weapon pod is expected in [${body.name}]!`
    }
    */
    
    onInstall() {
        this.botActions = [
            {
                name:    'idle',
                minTime:   .5,
                maxTime:  1.5,
            },
            {
                flak:  this.__,
                name: 'move-left',
                evo: function(dt) {
                    this.flak.attitude.left(dt)
                    if (this.flak.attitude.atMin()) {
                        this.flak.bot.action = this.flak.bot.botActions[MOVE_RIGHT]
                    }
                },
                minTime: .5,
                maxTime:  2,
            },
            {
                flak:  this.__,
                name: 'move-right',
                evo: function(dt) {
                    this.flak.attitude.right(dt)
                    if (this.flak.attitude.atMax()) {
                        this.flak.bot.action = this.flak.bot.botActions[MOVE_LEFT]
                    }
                },
                minTime: .5,
                maxTime:  2,
            },
            {
                flak:  this.__,
                name: 'fire',
                start: function(dt) {
                    if (env.disableAutoFlak) return
                    this.flak.primaryWeapon.trigger()
                },
                stop: function(dt) {
                    this.flak.primaryWeapon.stop()
                },
                minTime:  1,
                maxTime:  4,
            }
        ]
    }

    selectNextAction() {
        this.action = math.rnde(this.botActions)
        this.timeout = rnd(this.action.minTime, this.action.maxTime)
        if (this.action && this.action.start) this.action.start()
        //log(`[this.__.name] next action: ${this.action.name}`)
    }

    resetAction() {
        // stop the previous action
        if (this.action && this.action.stop) this.action.stop()
        this.action = null
        this.timeout = 0
    }

    isInControl() {
        return !this.deactivated
    }

    evo(dt) {
        const __ = this.__
        this.timeout -= dt

        if (this.action) {
            if (this.timeout < 0) {
                this.resetAction()
            } else {
                if (this.action.evo) this.action.evo(dt)
            }
        } else {
            this.selectNextAction()
        }
    }

    onDeactivate() {
        this.__.primaryWeapon.stop()
    }

}
