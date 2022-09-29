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
        // draw Alien ellipse
        this.ctx.beginPath();
        this.ctx.ellipse(this.x, this.y, 10, 30, Math.PI / 2, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'rgb(137, 147, 141)';
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 1;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
        
        // draw alien window
        this.ctx.beginPath();
        this.ctx.ellipse(this.x, this.y - 5, 22, 22, 34.7, 270, 3);
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = 'rgba(14, 126, 130, 0.512)';
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();

        // draw alien lights #1 (center)
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y + 4.5, 2, Math.PI * 2, 0);
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = 'yellow'
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
        
        // draw alien lights #2 (center - left)
        this.ctx.beginPath();
        this.ctx.arc(this.x - 10, this.y + 3.5, 2, Math.PI * 2, 0);
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = 'yellow'
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();

        // draw alien lights #2 (far - left)
        this.ctx.beginPath();
        this.ctx.arc(this.x - 20, this.y + .5, 2, Math.PI * 2, 0);
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = 'yellow'
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();

        // draw alien lights #2 (center - right)
        this.ctx.beginPath();
        this.ctx.arc(this.x + 10, this.y + 3.5, 2, Math.PI * 2, 0);
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = 'yellow'
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();

         // draw alien lights #2 (far - left)
         this.ctx.beginPath();
         this.ctx.arc(this.x + 20, this.y + .5, 2, Math.PI * 2, 0);
         this.ctx.strokeStyle = 'black';
         this.ctx.lineWidth = 1;
         this.ctx.fillStyle = 'yellow'
         this.ctx.fill();
         this.ctx.stroke();
         this.ctx.closePath();


        // Set text inside alien
        const text = this.answer.toString();
        this.ctx.beginPath();
        this.ctx.font = '18px Monospace'
        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(text, this.x, this.y - 15);
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
        if (this.y + 10 >= this.ctx.canvas.height / 1.7) {
            this.velY = -this.velY;
            this.y = this.ctx.canvas.height / 1.7 - 10;
        }
        if (this.y - 30 <= 0) {
            this.velY = -this.velY;
            this.y = 30;
        }
    }
}

export default Alien;