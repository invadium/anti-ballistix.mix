function mouseDown(e) {
    if (env.debug && e.ctrlKey) {
        const ls = []
        this.__.pick(e.x, e.y, ls)

        dir(ls)
        if (ls.length === 0) {
            log.raw('=== none ===')
        } else if (ls.length === 1) {
            log.dump(ls[0])
        } else {
            ls.forEach(n => log.dump(n))
        }
    }
}
