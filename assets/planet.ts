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
        this.ctx.fillStyle = 'blue';
        this.ctx.fill();
        this.ctx.closePath();
        // green
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, 490, 0, Math.PI * 2);
        this.ctx.fillStyle = 'green';
        this.ctx.fill();
        this.ctx.closePath();

        // ocean on right
        this.ctx.beginPath()
        this.ctx.arc(this.x + 95, this.y - 390, 90, 0, Math.PI * 2);
        this.ctx.fillStyle = 'purple';
        this.ctx.fill();
        this.ctx.closePath();

        // ocean on left
        this.ctx.beginPath()
        this.ctx.arc(this.x - 65, this.y - 440, 45, 0, Math.PI * 2);
        this.ctx.fillStyle = 'purple';
        this.ctx.fill();
        this.ctx.closePath();



    }
}

export default PlantBase;