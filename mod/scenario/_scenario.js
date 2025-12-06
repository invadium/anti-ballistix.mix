const _scenario = {
    name: 'scenario',

    catalog: function() {
        const menuList      = this._menuList = []
        const idRegistry    = this._idRegistry    = []
        const nameRegistry  = this._nameRegistry  = {}
        const aliasRegistry = this._aliasRegistry = {}

        function scanFrame(node) {
            if (!isArr(node._ls)) return
            if (node.name.startsWith('debug') && !env.debug) return

            scanNode(node)
        }

        let id = 0
        function scanNode(node) {
            node._ls.forEach((scenario) => {
                if (!scenario.info) return scanFrame(scenario)

                scenario.attach(id++, 'id')
                scenario.attach(scenario.info.title, 'title')
                scenario.attach((scenario.info.alias
                    || scenario.title.toLowerCase().split(' ').join('-')).toLowerCase(), 'alias')
                idRegistry[scenario.id] = scenario

                if (scenario.name === '00-default') return

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
                    name:  scenario.name,
                    title: scenario.title,
                    alias: scenario.alias,
                })
            })
        }

        scanNode(this)

        menuList.sort((e, t) => {
            if (e.name < t.name) return -1
            else if (e.name > t.name) return 1
            else return 0
        })
    },

    locate: function(id) {
        const _ = this

        function define() {
            if (isNum(id)) {
                return _._idRegistry[id]
            } else if (isStr(id)) {
                const nid = parseInt(id)
                if (isNaN(nid)) {
                    id = id.toLowerCase()
                    return _._nameRegistry[id] || _._aliasRegistry[id]
                } else {
                    return _._idRegistry[nid]
                }
            } else {
                log.warn(`Unrecognized scenario id: [${id}]`)
                return
            }
        }

        const profile = define() || _._ls[1]
        const scenario = augment({}, _._dir['00-default']._dir, profile._dir)

        return scenario
    },
}
