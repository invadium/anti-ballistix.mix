// translate ground local-relative z
function py(grz) {
    const py0 = lab.port.ly( this.__.screen.horizonLineY() ),
          py1 = lab.port.ly( ctx.height )
    return (py0 + grz * (py1 - py0))
}

function groundToBattlezoneRZ(grz) {
}

// translate to Z-order from the ground-local relative z
function Z(grz) {
    const brz = groundToBattlezoneRZ(grz)
    return 100 + brz * 100
}
