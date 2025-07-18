function capture(st) {
    if (env.state !== 'city') return

    // TODO create a flak?
    // ...

    const freeFlaks = lab.port.filter(e => (e instanceof dna.city.Flak && !e.turretPadControl._controllerId) )
    console.dir(freeFlaks)

    if (freeFlaks.length > 0) {
        log('capturing the player')
        const flak = freeFlaks[0]
        flak.turretPadControl.capture(st.action.controllerId)
        //lab.monitor.controller.bind(st.action.controllerId, flak.control)

        // activate
        if (st.action.pushable) lab.monitor.controller.push(st.action, st.dt, st.source)
        else lab.monitor.controller.act(st.action, st.source)
    }

}
