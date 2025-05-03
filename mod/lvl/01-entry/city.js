function city() {
    const src = this.src

    // TODO generalize into a common level generator
    //for (let i = 0; i < 176; i++) {
    for (let i = 0; i < 45; i++) {
        lab.backdrop.city.spawn( dna.city.Building, {
            rx: src.rnd() * 2 - 1,
            rz: src.rnd(),
            rw: src.rnd(),
            rh: src.rnd(),
        })
    }
}

