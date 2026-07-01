function capture(st) {
    if (env.state !== 'city') return

    // TODO create a flak?
    // ...

    const freeFlaks = lab.port.filter(e => (e instanceof dna.city.Flak && !e.turretPadControl._controllerId) )

    if (freeFlaks.length > 0) {
        const flak = freeFlaks[0]
        flak.turretPadControl.capture(st.action.controllerId)
        //job.monitor.controller.bind(st.action.controllerId, flak.control)

        // activate
        if (st.action.pushable) job.monitor.controller.push(st.action, st.dt, st.source)
        else job.monitor.controller.act(st.action, st.source)
    }

}
