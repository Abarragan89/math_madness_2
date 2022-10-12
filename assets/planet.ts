class PlantBase {
    ctx:CanvasRenderingContext2D;

    constructor(ctx:CanvasRenderingContext2D) {
        this.ctx = ctx
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.ctx.canvas.width / 2, this.ctx.canvas.height + 450, 500, 0, Math.PI * 2);
        this.ctx.fillStyle = 'brown';
        this.ctx.fill();
        this.ctx.closePath();
    }
}

export default PlantBase;