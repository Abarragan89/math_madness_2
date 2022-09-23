import { useEffect, useRef, useLayoutEffect } from 'react';
import styles from '../styles/studyPage/studyPage.module.css';
import Alien  from '../assets/alienClass';



function StudyPage() {
    const size = { width: 370, height: 500 };

    const canvasRef = useRef(null);
    // reference to the animation reference to stop animation
    const requestIdRef = useRef(null);

    const alien1 = useRef(null);
    const alien2 = useRef(null);
    const alien3 = useRef(null);
    const alien4 = useRef(null);



    // // Set up canvas
    // const canvas = canvasRef.current
    // const context = canvas.getContext('2d')
    // // Set up image
    // const spaceship = new Image();
    // spaceship.src = '/rocketShip.png';
    // // Put properties of image in object
    // const spaceshipPos = {
    //     x: canvas.width / 2,
    //     y: 450,
    //     width: 170,
    //     height: 100
    // }
    // // animate function for image
    // function animate() {
    //     context.clearRect(0, 250, canvas.width, canvas.height);  // clear canvas
    //     context.drawImage(spaceship, spaceshipPos.x, spaceshipPos.y, 170, 100);   // draw image at current position
    //     spaceshipPos.x -= 4
    //     if (spaceshipPos.x > 250) requestAnimationFrame(animate)        // loop
    //   }
    // spaceship.onload = animate

    // const updateBall = () => {
    //     const ball = alien1Ref.current;
    //     ball.x += ball.vx;
    //     ball.y += ball.vy;
    //     if (ball.x + ball.radius >= size.width) {
    //         ball.vx = -ball.vx;
    //         ball.x = size.width - ball.radius;
    //     }
    //     if (ball.x - ball.radius <= 0) {
    //         ball.vx = -ball.vx;
    //         ball.x = ball.radius;
    //     }
    //     if (ball.y + ball.radius >= size.height / 2) {
    //         ball.vy = -ball.vy;
    //         ball.y = size.height / 2 - ball.radius;
    //     }
    //     if (ball.y - ball.radius <= 0) {
    //         ball.vy = -ball.vy;
    //         ball.y = ball.radius;
    //     }
    // };

    // class Alien {
    //     x: number;
    //     y: number;
    //     r: number;
    //     ctx
    //     answer: string;
    //     velX:number;
    //     velY:number;
    //     constructor
    //     (ctx, x: number, y: number, r: number, answer: string, velX:number, velY:number) {
    //         this.x = x,
    //         this.y = y,
    //         this.r = r,
    //         this.answer = answer;
    //         this.ctx = ctx;
    //         this.velX = velX;
    //         this.velY = velY;
    //     }
    //     drawAlien() {
    //         this.ctx.save();
    //         this.ctx.beginPath();
    //         this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    //         this.ctx.fillStyle = 'green';
    //         this.ctx.fill();
    //         this.ctx.closePath();
    //         this.ctx.restore();
    //     }
    //     moveAlien() {
    //         this.drawAlien();
    //         this.x += this.velX;
    //         // this.y += this.velY;
    //         if (this.x + this.r >= this.ctx.width) {
    //             this.velX = -this.velX;
    //             this.x = this.ctx.width - this.r;
    //         }
    //         if (this.x - this.r <= 0) {
    //             this.velX = -this.velX;
    //             this.x = this.r;
    //         }
    //         if (this.y + this.r >= this.ctx.height / 2) {
    //             this.velY = -this.velY;
    //             this.y = this.ctx.height / 2 - this.r;
    //         }
    //         if (this.y - this.r <= 0) {
    //             this.velY = -this.velY;
    //             this.y = this.r;
    //         }
    //     }
    // }


    const renderFrame = () => {
        alien1.current.moveAlien();
        alien2.current.moveAlien();
        alien3.current.moveAlien();
        alien4.current.moveAlien();
        console.log(alien1)
    };

    const tick = () => {
        if (!canvasRef.current) return;
        canvasRef.current.getContext('2d').clearRect(0, 0, size.width, size.height / 2);

        renderFrame();
        requestIdRef.current = requestAnimationFrame(tick);
    };

    useLayoutEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        alien1.current = new Alien(ctx, 300, 20, 15, '56', 1, 1);
        alien2.current = new Alien(ctx, 120, 60, 15, '56', 1, 1);
        alien3.current = new Alien(ctx, 0, 100, 15, '56', 1, 1);
        alien4.current = new Alien(ctx, 200, 140, 15, '56', 1, 1);

        requestIdRef.current = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(requestIdRef.current);
        };
    }, []);


    return (
        <main className={styles.mainStudyPage}>
            <div className='flex-box-sa'>
                <p>Score: 192</p>
                <div className="flex-box-sb">
                    <p>🚀</p>
                    <p>🚀</p>
                    <p>🚀</p>
                </div>
            </div>
            <p><span>num1</span> x <span>num2</span></p>
            <canvas width={370} height={500} ref={canvasRef} />

        </main>
    )
}

export default StudyPage;