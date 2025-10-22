const df = {
    shots: 0,
}

const data = {}

function onNewScenario() {
    extend(data, df)
}

function newWave() {
}

function shot() {
    data.shots ++
}

function getData() {
    return data
}
