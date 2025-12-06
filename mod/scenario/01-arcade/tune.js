function tune(wave) {
    Object.keys(wave.fq).forEach(key => {
        for (let i = 0; i < wave.loop; i++) wave.fq[key] *= 1.1
    })
    if (wave.limits) {
        Object.keys(wave.limits).forEach(key => {
            for (let i = 0; i < wave.loop; i++) wave.limits[key] *= 1.1
        })
    }
}
