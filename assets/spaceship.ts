class Spaceship {
    ctx:CanvasRenderingContext2D;
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

    constructor(ctx:CanvasRenderingContext2D) {
        const image = new Image();
        image.src = 'rocketShip3.png'
        this.image = image;
        this.width = 170
        this.height = 100
        this.ctx = ctx
        this.position = {
            x: this.ctx.canvas.width / 2 - this.width / 2, 
            y: this.ctx.canvas.height - (this.height)
        }
    }
    draw() {
        this.ctx.fillStyle = 'transparent'
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.ctx.drawImage(
            this.image, 
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height);
    }
}

 
export default Spaceship;