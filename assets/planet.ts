class PlantBase {
    ctx:CanvasRenderingContext2D;
    x: number
    y: number
    constructor(ctx:CanvasRenderingContext2D) {
        this.ctx = ctx
        this.x = this.ctx.canvas.width / 2
        this.y = this.ctx.canvas.height + 450
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 500, 0, Math.PI * 2);
        this.ctx.fillStyle = 'brown';
        this.ctx.fill();
        this.ctx.closePath();
    }
}

export default PlantBase;