function scenario() {
    const menuList = $.sce._menuList = []

    const nameRegistry  = $.sce._nameRegistry  = {}
    const aliasRegistry = $.sce._aliasRegistry = {}

    $.sce._ls.forEach((scenario, i) => {
        scenario.attach(i, 'id')
        scenario.attach(scenario.info.title, 'title')
        scenario.attach((scenario.info.alias
            || scenario.title.toLowerCase().split(' ').join('-')).toLowerCase(), 'alias')

        if (i === 0) return // skip the 00-default scanerio

        let prev = nameRegistry[scenario.title.toLowerCase()]
        if (prev) {
            throw new Error(`scenario title [${scenario.title}] collision: [#${prev.id}]x[#${scenario.id}]`)
        }

        prev = aliasRegistry[scenario.alias]
        if (prev) {
            throw new Error(`scenario aliases [${scenario.alias}] collision: [#${prev.id}]x[#${scenario.id}]`)
        }
        nameRegistry[scenario.title.toLowerCase()] = scenario
        aliasRegistry[scenario.alias] = scenario

        menuList.push({
            id:    scenario.id,
            title: scenario.title,
            alias: scenario.alias,
        })
    })

    $.sce.locate = function(id) {
        if (isNum(id)) {
            return this._ls[id]
        } else if (isStr(id)) {
            const nid = parseInt(id)
            if (isNaN(nid)) {
                id = id.toLowerCase()
                return this._nameRegistry[id] || this._aliasRegistry[id]
            } else {
                return this._ls[nid]
            }
        } else {
            log.warn(`Unrecognized scenario id: [${id}]`)
            return
        }
    }
}
