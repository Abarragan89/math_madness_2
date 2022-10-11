class Astroid {
    ctx:CanvasRenderingContext2D;
    x: number;
    y: number;
    radius: number;
    speed: number;
    problem: {
        num1: number
        num2: number
    }
    constructor( ctx:CanvasRenderingContext2D, x: number, y: number, radius: number, speed:number, problem: {num1:number, num2:number}) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed
        this.problem = problem
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        this.ctx.fillStyle = 'yellow';
        this.ctx.fill()
        this.ctx.closePath();
                // Set text inside alien
                const number1 = this.problem.num1.toString();
                const number2 = this.problem.num2.toString();
                this.ctx.beginPath();
                this.ctx.font = '14px Monospace'
                this.ctx.textBaseline = 'top';
                this.ctx.textAlign = 'center';
                this.ctx.fillStyle = 'red';
                this.ctx.fillText(`${number1}x${number2}`, this.x, this.y - 15);
                this.ctx.closePath();
                this.ctx.restore();
    }
    update() {
        this.draw();
        this.y += this.speed;
    }
}

export default Astroid;