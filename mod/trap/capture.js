function capture(st) {
    if (env.state !== 'city') return
    log('capturing the player')

    // TODO create a flak?
    // ...

    const flak = lab.port.flak
    lab.monitor.controller.bind(st.action.controllerId, flak.control)

    // activate
    if (st.action.pushable) lab.monitor.controller.push(st.action, st.dt, st.source)
    else lab.monitor.controller.act(st.action, st.source)
}
