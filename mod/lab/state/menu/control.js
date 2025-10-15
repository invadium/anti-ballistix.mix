function compileScenarioList() {
    // TODO list all scenario ids and titles
    const scenariosItem = this.__.items.filter(e => e.id === 'scenarios')[0]

    scenariosItem.options = []

    $.sce._menuList.forEach(scenarioItem => {
        scenariosItem.options.push(scenarioItem)
    })
}

function toggleResumeGameVisibility() {
    const resumeItem = this.__.items.filter(e => e.id === 'resume')[0]

    resumeItem.hidden = !lab.control.mission.inProgress()
}

function newGame() {
    // pick the selected scenario
    const __ = this.__
    const scenarioOptions = __.getItemById('scenarios')
    const idx = scenarioOptions.current || 0
    const selectedScenario = scenarioOptions.options[idx]
    signal('game/scenario', selectedScenario)
}

function onActivate() {
    this.__.items.title = res.txt.label.title 
    this.compileScenarioList()
    this.toggleResumeGameVisibility()
    lab.background = env.style.color.sky
}

function onDeactivate() {
}
