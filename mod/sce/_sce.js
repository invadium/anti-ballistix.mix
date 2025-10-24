const _sce = {
    name: 'sce',

    catalog: function() {
        const menuList = this._menuList = []

        const nameRegistry  = this._nameRegistry  = {}
        const aliasRegistry = this._aliasRegistry = {}

        this._ls.forEach((scenario, i) => {
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
    },

    locate: function(id) {
        const _ = this

        function define() {
            if (isNum(id)) {
                return _._ls[id]
            } else if (isStr(id)) {
                const nid = parseInt(id)
                if (isNaN(nid)) {
                    id = id.toLowerCase()
                    return _._nameRegistry[id] || _._aliasRegistry[id]
                } else {
                    return _._ls[nid]
                }
            } else {
                log.warn(`Unrecognized scenario id: [${id}]`)
                return
            }
        }

        const profile = define() || _._ls[1]
        const scenario = augment({}, _._dir['00-default']._dir, profile._dir)
        console.dir(scenario)

        return scenario
    },
}
