function loadOpt() {
    if (typeof(Storage) === 'undefined') return
    try {
        const raw = window.localStorage.getItem(env.def.localStorageOptKey)
        if (raw) {
            log(`loaded options: ${raw}`)
            const opt = JSON.parse(raw) || {}
            augment(env.opt, opt)
        }

    } catch (e) {
        log.err(e)
        return {}
    }
}

function saveOpt() {
    if (typeof(Storage) === 'undefined') return
    try {
        window.localStorage.setItem(env.def.localStorageOptKey, JSON.stringify(env.opt))

    } catch (e) {
        log.err(e)
    }
}
