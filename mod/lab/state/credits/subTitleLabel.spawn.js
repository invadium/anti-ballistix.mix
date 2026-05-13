const subTitleLabel = {
    DNA:  'hud/Label',
    rx:   .5,
    rot: -.1 * PI,
    font:  env.style.font.subTitle.head,
    size:  env.style.font.subTitle.size,
    color: env.style.color.subTitle,
    text:  () => {
        return res.txt.label.subTitle
    },

    adjust: function() {
        // stick over the title
        this.y = ry(this.__.titleLabel.ry) - 1.3*this.size
    },
}
