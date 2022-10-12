class Missle {
    ctx:CanvasRenderingContext2D;
    x: number;
    y: number;
    radius: number;
    angle: number;
    constructor( ctx:CanvasRenderingContext2D, x: number, y: number, radius: number, angle: number) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.angle = angle;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        this.ctx.fillStyle = 'yellow';
        this.ctx.fill()
        this.ctx.closePath();
    }
    update() {
        this.draw();
        this.y -= 17;
    }
}

export default Missle;