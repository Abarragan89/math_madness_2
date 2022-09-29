class Spaceship {
    ctx: CanvasRenderingContext2D;
    position: {
        x: number,
        y: number
    };
    velocity: {
        x: number,
        y: number
    };
    width: number;
    height: number;
    image: CanvasImageSource;
    rotation: number;

    constructor(ctx: CanvasRenderingContext2D) {
        const image = new Image();
        image.src = 'rocketShip3.png'
        this.image = image;
        this.width = 120
        this.height = 80
        this.ctx = ctx
        this.position = {
            x: this.ctx.canvas.width / 2 - this.width / 2,
            y: this.ctx.canvas.height - (this.height)
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.rotation = 0;
    }
    draw() {
        if (this.image) {
            this.ctx.save();
            this.ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2)
            this.ctx.rotate(this.rotation)
            this.ctx.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2)
            this.ctx.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height);
            this.ctx.restore();
        }

        // just to make a line half way through the canvas
        // this.ctx.beginPath()
        // this.ctx.lineWidth = 5;
        // this.ctx.moveTo(0, this.ctx.canvas.height / 2);
        // this.ctx.lineTo(this.ctx.canvas.width, this.ctx.canvas.height / 2)
        // this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)'
        // this.ctx.stroke();

    }
    moveSpaceship() {
        if (this.image) {
            this.draw();
            this.position.x += this.velocity.x
        }
    }
}


export default Spaceship;