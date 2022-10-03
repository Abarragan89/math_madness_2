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

    constructor(ctx: CanvasRenderingContext2D, width: number, height: number, position: {x: number, y: number}, imagePath:string) {
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
            x: 0,
            y: 0
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
    chaseAlienship() {
        this.draw();
        this.position.y += .06
    }
}


export default AlienShip;