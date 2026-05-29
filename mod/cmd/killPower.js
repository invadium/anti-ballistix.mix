function killPower(args) {
    lab.port.apply(powerStation => {
        powerStation.autoKill()
    }, e => e instanceof dna.city.PowerStation)
}
killPower.info = 'kill all power stations'
