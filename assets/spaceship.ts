class Spaceship {
    ctx:CanvasRenderingContext2D
    x: number;
    y: number;
    width: number;
    height: number;
    image: CanvasImageSource;
    bulletX: number;
    bulletY: number;
    constructor(ctx:CanvasRenderingContext2D, x: number, y: number, width: number, height: number, image: CanvasImageSource) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width; 
        this.height = height;
        this.image = image;
        this.bulletX = this.x;
        this.bulletY = this.y;

    }
    drawSpaceship(){
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        // Rotate
        this.ctx.rotate(-110 * Math.PI / 360);
        this.ctx.fillStyle = 'transparent'
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.ctx.drawImage(this.image, 0 - this.width / 2, 0 - this.height / 2, 150, 100);
        this.ctx.restore();
    }
    // rotateSpaceship() {
    //     this.ctx.drawImage(this.image, this.x, this.y, 170, 100);
    //     this.ctx.rotate(75 * Math.PI / 180)
    // }

    moveSpaceship(direction:string) {
        if(direction === 'left') {
            this.ctx.clearRect(0, 250, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.drawImage(this.image, this.x, this.y, 170, 100); 
            this.bulletX -=4;
            this.x -= 4;
            this.drawSpaceship();
        }  else {
            this.ctx.clearRect(0, 250, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.drawImage(this.image, this.x, this.y, 170, 100); 
            this.bulletX +=4;
            this.x += 4;
            this.drawSpaceship();
        }
    }
    fireWeapon() {
        this.ctx.save();
        // this.ctx.translate(this.ctx.canvas.width, this.ctx.canvas.height)
        this.ctx.beginPath();
        this.ctx.arc(this.bulletX - 12, this.bulletY, 5, 0, Math.PI * 2);
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
        this.bulletY -= 1;
        
        if (this.bulletY > 0) {
            requestAnimationFrame(this.fireWeapon)  
            // this.fireWeapon();
        } else {
            this.bulletY = this.y;
            this.bulletX = this.x;
        }
    }
}

export default Spaceship;