function mouseDown(e) {
    // dispatch events to the active state lead node
    const state = lab.control.state.leadNode()
    if (state) {
        if (isFun(state.mouseDown)) state.mouseDown(e)
        if (state.trap && isFun(state.trap.mouseDown)) state.trap.mouseDown(e)
    }
}
