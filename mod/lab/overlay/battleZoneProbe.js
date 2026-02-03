function draw() {
    if (!env.showBattleZone) return

    const sy = ry(env.tune.battleZone.start),
          ey = ry(env.tune.battleZone.end),
          W  = ctx.width

    lineWidth(2)
    stroke('#ff0000')

    line(0, sy, W, sy)
    line(0, ey, W, ey)
}
