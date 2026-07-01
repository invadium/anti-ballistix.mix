function compileScenarioList() {
    // TODO list all scenario ids and titles
    const scenariosItem = this.__.getItemById('scenarios')

    scenariosItem.options = []

    $.scenario._menuList.forEach(scenarioItem => {
        scenariosItem.options.push(scenarioItem)
    })
}

function compileFlaksSelectionList() {
    const flaks = this.__.getItemById('flaks')

    flaks.options = []

    let defaultFlak = 0
    for (let i = 0, flakId = env.tune.flaks.min; flakId <= env.tune.flaks.max; i++, flakId++) {
        flaks.options.push({
            title: `${flakId}`,
            val:   flakId,
        })
        if (flakId === env.tune.flaks.default) defaultFlak = i
    }
    flaks.current = defaultFlak
}

function toggleResumeGameVisibility() {
    const resumeItem = this.__.items.filter(e => e.id === 'resume')[0]

    resumeItem.hidden = !job.control.mission.inProgress()
}

function newGame() {
    // pick the selected scenario
    const __ = this.__
    const scenarioOptions = __.getItemById('scenarios')
    const idx = scenarioOptions.current || 0
    const selectedScenario = scenarioOptions.options[idx]

    const flaksOptions = __.getItemById('flaks')
    const flaks = flaksOptions.options[ flaksOptions.current || 0 ]
    selectedScenario.flaks = flaks.val

    signal('game/scenario', selectedScenario)
}

function setup() {
    $.scenario.catalog()
    this.__.items.title = res.txt.label.title 
    this.compileScenarioList()
    this.compileFlaksSelectionList()
}

function resumeGame() {
    if (job.control.mission.inProgress()) {
        job.control.state.transitTo('city')
    }
}

function onActivate() {
    this.toggleResumeGameVisibility()
    this.__.touch()
    lab.background = env.style.color.sky
}

function onDeactivate() {
}
