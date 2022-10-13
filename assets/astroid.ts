class Astroid {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    radius: number;
    speed: number;
    problem: {
        num1: number
        num2: number
    }
    randomShape: number;
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, speed: number, problem: { num1: number, num2: number }, randomShape: number) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed
        this.problem = problem
        this.randomShape = randomShape
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y - 38 + this.randomShape);
        this.ctx.lineTo(this.x + 5 , this.y - 35 + this.randomShape)
        this.ctx.lineTo(this.x + 10, this.y - 33 + this.randomShape)
        this.ctx.lineTo(this.x + 15 , this.y - 38 + this.randomShape);
        this.ctx.lineTo(this.x + 25 , this.y - 35 + this.randomShape);
        this.ctx.lineTo(this.x  + 35 , this.y - 30)
        this.ctx.lineTo(this.x  + 30 , this.y - 10)
        this.ctx.lineTo(this.x + 40 , this.y)

        this.ctx.lineTo(this.x + 20 , this.y + 10 + this.randomShape)
        this.ctx.lineTo(this.x + 10 , this.y + 17 + this.randomShape)

        this.ctx.lineTo(this.x, this.y + 29 + this.randomShape);
        this.ctx.lineTo(this.x - 15 , this.y + 30 + this.randomShape)
        this.ctx.lineTo(this.x - 25 , this.y + 26 + this.randomShape)
        this.ctx.lineTo(this.x - 30 , this.y + 22 + this.randomShape)
        this.ctx.lineTo(this.x - 25 , this.y + 5)
        this.ctx.lineTo(this.x - 32 , this.y - 18 + this.randomShape)
        this.ctx.lineTo(this.x - 15 , this.y - 24 + this.randomShape)
        this.ctx.lineTo(this.x - 25 , this.y - 28 + this.randomShape)
        this.ctx.lineTo(this.x, this.y - 30 + this.randomShape)
        this.ctx.strokeStyle = 'white'
        this.ctx.fillStyle = 'gray'
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();


        // Set text inside asteroid
        const number1 = this.problem.num1.toString();
        const number2 = this.problem.num2.toString();
        this.ctx.beginPath();
        this.ctx.font = '14px Monospace'
        this.ctx.textBaseline = 'top';55
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`${number1}x${number2}`, this.x, this.y);
        this.ctx.closePath();
        this.ctx.restore();
    }
    update() {
        this.draw();
        this.y += this.speed;
    }
}

export default Astroid;