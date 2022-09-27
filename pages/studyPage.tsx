import { useRef, useLayoutEffect, useEffect, useState } from 'react';
import styles from '../styles/studyPage/studyPage.module.css';
import Alien from '../assets/alienClass';
import Spaceship from '../assets/spaceship';
import Bullet from '../assets/bullets';



function StudyPage() {
    const size = { width: 370, height: 600 };
    const canvasRef = useRef(null);
    const ctx = useRef<CanvasRenderingContext2D>(null)
    // reference to the animation reference to stop animation
    const requestIdRef = useRef(null);
    const spaceship = useRef<Spaceship>(null);
    const bullets = useRef<Bullet[]>([]);
    const aliens = useRef<Alien[]>([])

    // State for numbers in problem
    const [number1, setNumber1] = useState<number>(null)
    const [number2, setNumber2] = useState<number>(null)
    const answer = useRef<number>(null)
    const [score, setScore] = useState<number>(0)
    const [speed, setSpeed] = useState<number>(.5)

    const renderFrame = ():void => {
        spaceship.current.draw();
        // Shoot Bullets
        if (bullets.current) {
            bullets.current.forEach((bullet, i) => {
                bullet.update();
                if (bullet.y < 0) {
                    bullets.current.splice(i, 1)
                }
            })
        }
        // Draw aliens in Array
        if (aliens.current) {
            aliens.current.forEach((alien, i) => {
                alien.moveAlien();
            })
        }
        // Check for bullet collision with aliens
        checkCollision(
            bullets.current,
            aliens.current
        )
    };

    // check for collision
    function checkCollision(
        bullets: Array<Bullet>,
        aliens: Array<Alien>): void {
        aliens.forEach((alien, i) => {
            bullets.forEach((bullet, j) => {
                if (
                    bullet.y + 5 < alien.y + 10 &&
                    bullet.x < alien.x + 30 &&
                    bullet.x > alien.x - 30 &&
                    bullet.y - 5 > alien.y - 10
                ) {
                    bullets.splice(j, 1);
                    handleCollision(alien, ctx.current);
                }
            })
        })
    }

    function randomNumberGenerator(max: number): number {
        return Math.floor(Math.random() * max + 1);
    }

    function randomMultipleGenerator(multiple: number, exclude: number): number {
        const randomMultiple = multiple * randomNumberGenerator(12);
        if (randomMultiple === exclude) {
            randomMultipleGenerator(multiple, exclude)
        } else {
            return randomMultiple;
        }
    }

    function handleCollision(alien: Alien, ctx: CanvasRenderingContext2D) {
        if (alien.answer === answer.current) {
            bullets.current.length = 0;
            generateProblem(ctx)
            setScore(score + 100)
        }
    }

    console.log(score)

    // Make a new set of aliens for new problem
    function createAliens(ctx: CanvasRenderingContext2D, answer: number):void {
        const possibleSpeeds: number[] = [.5, -.5, -1, 1, 2, -2]
        for (let i = 0; i < 4; i++) {
            const randomMultiple = randomMultipleGenerator(8, 56)
            // if randomMultiple is not available, redo the loop so alien is not generated nameless. 
            if (!randomMultiple) {
                i--
                continue;
            }else {
                aliens.current.push(
                    new Alien(
                        ctx,
                        randomNumberGenerator(size.width),
                        randomNumberGenerator(size.height / 2),
                        30,
                        i === 2 ? answer : randomMultiple,
                        Math.random() > .5 ? speed : -speed,
                        Math.random() > .5 ? speed : -speed
                    )
                )
            }
        }
    }

    // Make a new problem, reset aliens array to zero
    function generateProblem(ctx: CanvasRenderingContext2D): void {
        if (aliens.current) {
            aliens.current.length = 0;
        }
        const rand1 = randomNumberGenerator(12);
        const rand2 = randomNumberGenerator(12);
        setNumber1(rand1)
        setNumber2(rand2)
        answer.current = rand1 * rand2
        createAliens(ctx, answer.current)
    }

    const tick = () => {
        if (!canvasRef.current) return;
        canvasRef.current.getContext('2d').clearRect(0, 0, size.width, size.height);
        renderFrame();
        requestIdRef.current = requestAnimationFrame(tick);
    };

    useLayoutEffect(() => {
        ctx.current = canvasRef.current.getContext('2d');
        // create instances of spaceship and aliens
        spaceship.current = new Spaceship(ctx.current)
        generateProblem(ctx.current)
        requestIdRef.current = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(requestIdRef.current);
        };
    }, []);

    // Listen for key events
    useEffect(() => {
        window.onkeydown = checkKey;
    }, [])

    // function to set up key presses
    function checkKey(e) {
        e = e || window.event;
        if (e.keyCode == '32') {
            bullets.current.push(new Bullet(
                ctx.current,
                spaceship.current.position.x + 85,
                spaceship.current.position.y,
                5))
        }
        else if (e.keyCode == '37') {
            spaceship.current.position.x -= 6;
        }
        else if (e.keyCode == '39') {
            spaceship.current.position.x += 6;
        }
    }

    return (

        <main className={styles.mainStudyPage}>
            <div className='flex-box-sa'>
                <p>Score: {score}</p>
                <div className="flex-box-sb">
                    <p>🚀</p>
                    <p>🚀</p>
                    <p>🚀</p>
                </div>
            </div>
            <p><span>{number1}</span> x <span>{number2}</span></p>
            <canvas width={370} height={600} ref={canvasRef} />
            {/* Controls */}
            <div>
                <p onClick={() => spaceship.current.position.x -= 6}>&lt;</p>
                <p onClick={() => spaceship.current.position.x += 6}>&gt;</p>
            </div>
        </main>
    )
}

export default StudyPage;