function compileLevelList() {
}

function toggleResumeGameVisibility() {
    const resumeItem = this.__.items.filter(e => e.id === 'resume')[0]

    resumeItem.hidden = !lab.control.game.inProgress()
}

function onActivate() {
    this.__.items.title = res.txt.label.title 
    this.compileLevelList()
    this.toggleResumeGameVisibility()
    lab.background = env.style.color.sky
}

function onDeactivate() {
}
