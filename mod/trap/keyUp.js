function keyUp(e) {
    let halt = false
    const state = lab.control.state.leadNode()
    if (state) {
        if (isFun(state.keyUp)) halt = state.keyUp(e)
        if (state.trap && isFun(state.trap.keyUp)) state.trap.keyUp(e)
    }

    /*
    if (halt) return
    */
}
