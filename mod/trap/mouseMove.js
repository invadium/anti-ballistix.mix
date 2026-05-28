function mouseMove(e) {
    // dispatch events to the active state lead node
    const state = lab.control.state.leadNode()
    if (state) {
        if (isFun(state.mouseMove)) state.mouseMove(e)
        if (state.trap && isFun(state.trap.mouseMove)) state.trap.mouseMove(e)
    }
}
