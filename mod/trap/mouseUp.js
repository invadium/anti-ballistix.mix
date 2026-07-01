function mouseUp(e) {
    // dispatch events to the active state lead node
    const state = job.control.state.leadNode()
    if (state) {
        if (isFun(state.mouseUp)) state.mouseUp(e)
        if (state.trap && isFun(state.trap.mouseUp)) state.trap.mouseUp(e)
    }
}
