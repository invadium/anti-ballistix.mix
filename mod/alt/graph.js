function arrowLine( x1, y1, x2, y2, al, aw ) {
    save()
    translate(x1, y1)
    
    const dx = x2 - x1,
          dy = y2 - y1,
          a  = angleTo(dx, dy),
          ln = length(dx, dy)
    rotate(a)

    line( 0, 0,   ln, 0)
    line(ln, 0,  ln - al, -aw)
    line(ln, 0,  ln - al,  aw)

    restore()
}
