class AlienShip {
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

    constructor(ctx: CanvasRenderingContext2D, width: number, height: number, position: {x: number, y: number}, imagePath:string, velocity?: {x: number, y: number}, ) {
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
            this.ctx.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height);
        }
    }
    moveAlienship() {
        this.draw();
        this.position.y += this.velocity.y
    }
}


export default AlienShip;