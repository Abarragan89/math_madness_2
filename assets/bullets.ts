class Bullet {
    ctx:CanvasRenderingContext2D;
    x: number;
    y: number;
    radius: number;
    constructor( ctx:CanvasRenderingContext2D, x: number, y: number, radius: number) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        this.ctx.fillStyle = 'orange';
        this.ctx.fill()
        this.ctx.closePath();
    }
    update() {
        this.draw();
        this.y -= 5;
    }
}

export default Bullet;