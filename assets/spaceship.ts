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
    imagePath: string

    constructor(ctx: CanvasRenderingContext2D, width: number, height: number, position: {x: number, y: number}, imagePath:string, velocity?: {x: number, y: number}) {
        const image = new Image();
        image.src = imagePath
        this.image = image;
        this.width = width;
        this.height = height;
        this.ctx = ctx
        this.position = {
            x: position.x,
            y: position.y
        }
        this.velocity = {
            x: velocity.x,
            y: velocity.y
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
    }
    moveSpaceship() {
        if (this.image) {
            this.draw();
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
    }
    // rotateSpaceship(direction:string) {
    //     this.ctx.save();
    //     this.ctx.translate(this.position.x, this.position.y);
    //     // Rotate
    //     if (direction === 'left') {
    //         this.ctx.rotate(-110 * Math.PI / 360);
    //     } else if (direction === 'right') {
    //         this.ctx.rotate(+110 * Math.PI / 360);
    //     }
    //     this.ctx.fillStyle = 'transparent'
    //     this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    //     this.ctx.drawImage(this.image, 0 - this.width / 2, 0 - this.height / 2, 150, 100);
    //     this.ctx.restore();
    // }
}


export default Spaceship;