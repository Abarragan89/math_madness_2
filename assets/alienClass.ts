class Alien {
    x: number;
    y: number;
    r: number;
    ctx: CanvasRenderingContext2D
    answer: number;
    velX: number;
    velY: number;
    constructor
        (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, answer: number, velX: number, velY: number) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.answer = answer;
        this.ctx = ctx;
        this.velX = velX;
        this.velY = velY;
    }
    drawAlien() {
        // draw Alien
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.ellipse(this.x, this.y, 10, 30, Math.PI / 2, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'silver';
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();


        // Set text inside alien
        const text = this.answer.toString()
        this.ctx.beginPath();
        this.ctx.font = '20px Monospace'
        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(text, this.x, this.y);
        this.ctx.closePath();
        this.ctx.restore();
    }
    moveAlien() {
        this.drawAlien();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        Math.random() > 5 ? this.x += this.velX : this.x -= this.velX;
        Math.random() > 5 ? this.y += this.velY : this.y -= this.velY;

        if (this.x + this.r >= this.ctx.canvas.width) {
            this.velX = -this.velX;
            this.x = this.ctx.canvas.width - this.r;
        }
        if (this.x - this.r <= 0) {
            this.velX = -this.velX;
            this.x = this.r;
        }
        if (this.y + this.r >= this.ctx.canvas.height / 2) {
            this.velY = -this.velY;
            this.y = this.ctx.canvas.height / 2 - this.r;
        }
        if (this.y - this.r <= 0) {
            this.velY = -this.velY;
            this.y = this.r;
        }
    }
}

export default Alien;