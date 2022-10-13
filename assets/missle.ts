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
        // body of the missle
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, 7, 50)
        this.ctx.fillStyle = 'white';
        this.ctx.strokeStyle = 'white';
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();

        //missle tip
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + 3.5, this.y - 15)
        this.ctx.lineTo(this.x, this.y)
        this.ctx.lineTo(this.x + 7, this.y)
        this.ctx.lineTo(this.x + 3.5, this.y - 15)
        this.ctx.strokeStyle = 'red'
        this.ctx.fillStyle = 'red'
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();

        // missle wing (left)
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y + 35);
        this.ctx.lineTo(this.x - 3.5, this.y + 55);
        this.ctx.lineTo(this.x, this.y + 55)
        this.ctx.lineTo(this.x, this.y + 35)
        this.ctx.strokeStyle = 'red'
        this.ctx.fillStyle = 'red'
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();

        // missle wing (right)
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + 7, this.y + 35);
        this.ctx.lineTo(this.x + 10.5, this.y + 55);
        this.ctx.lineTo(this.x + 7, this.y + 55);
        this.ctx.lineTo(this.x + 7, this.y + 35);
        this.ctx.strokeStyle = 'red';
        this.ctx.fillStyle = 'red';
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }
    update() {
        this.draw();
        this.y -= 10;
    }
}

export default Missle;