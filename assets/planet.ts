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
        //Atmosphere
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 500, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(0, 150, 200, .3)';
        this.ctx.fill();
        this.ctx.closePath();
        // green
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, 490, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(50, 120, 0, 1)';
        this.ctx.fill();
        this.ctx.closePath();

        // ocean on right
        this.ctx.beginPath()
        this.ctx.arc(this.x + 95, this.y - 379, 100, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(0, 100, 170, 1)';
        this.ctx.fill();
        this.ctx.closePath();

        // ocean on left
        this.ctx.beginPath()
        this.ctx.arc(this.x - 75, this.y - 414, 70, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(0, 100, 170, 1)';
        this.ctx.fill();
        this.ctx.closePath();





    }
}

export default PlantBase;