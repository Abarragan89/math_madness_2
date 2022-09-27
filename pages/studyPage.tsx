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

    // State for numbers in problem, score, level, and speed
    const [number1, setNumber1] = useState<number>(null)
    const [number2, setNumber2] = useState<number>(null)
    const [lostLife, setLostLife] = useState<number>(null)
    const answer = useRef<number>(null)
    const score = useRef<number>(0)
    const speed = useRef<number>(.5)
    const lives = useRef<number[]>([1, 2, 3])
    const totalCorrect = useRef<number>(0)
    const level = useRef<number>(1)

    const renderFrame = ():void => {
        spaceship.current.moveSpaceship();
        // Move spaceship 
        if(keys.right.pressed && spaceship.current.position.x + 80 >=0 && !keys.left.pressed) {
            spaceship.current.velocity.x -= .1;
        } else if (keys.left.pressed && spaceship.current.position.x + 95 <= size.width && !keys.right.pressed) {
            spaceship.current.velocity.x += .1;
        } else {
            spaceship.current.velocity.x = 0;
        }
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
    function checkCollision(bullets: Array<Bullet>, aliens: Array<Alien>): void {
        aliens.forEach((alien, i) => {
            bullets.forEach((bullet, j) => {
                if (
                    bullet.y + 5 < alien.y + 10 &&
                    bullet.x < alien.x + 30 &&
                    bullet.x > alien.x - 30 &&
                    bullet.y - 5 > alien.y - 10
                ) {
                    bullets.splice(j, 1);
                    handleCollision(alien, i,  ctx.current);
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

    function handleCollision(alien: Alien, i:number,  ctx: CanvasRenderingContext2D) {
        // if answer is correct: make new problem ,add to score, add to total correct, check for level/speed increase
        if (alien.answer === answer.current) {
            bullets.current.length = 0;
            generateProblem(ctx);
            score.current = score.current + 100 * speed.current;
            totalCorrect.current +=1
            if (totalCorrect.current >= 90) {
                speed.current = 3;
                level.current = 7;
            } else if (totalCorrect.current >= 75) {
                speed.current = 2.5;
                level.current = 6;
            } else if (totalCorrect.current >= 60) {
                speed.current = 2;
                level.current = 5;
            } else if (totalCorrect.current >= 45) {
                speed.current = 1.5
                level.current = 4;
            } else if (totalCorrect.current >= 30) {
                speed.current = 1;
                level.current = 3;
            } else if (totalCorrect.current >= 15) {
                speed.current = .5
                level.current = 2;
            }
        // if wrong, remove a life, check if game is over, and erase the alien that was shot. 
        } else {
            lives.current.pop();
            // set state for lost life to cause a rerender so UI displays correct number of lives. 
            setLostLife(randomNumberGenerator(1000000));
            if (lives.current.length === 0) {
                // end game
                console.log('end game')
            }
            aliens.current.splice(i, 1);
        }
    }
    console.log(lostLife)

    // Make a new set of aliens for new problem
    function createAliens(ctx: CanvasRenderingContext2D, answer: number):void {
        for (let i = 0; i < 4; i++) {
            const randomMultiple = randomMultipleGenerator(8, 56);
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
                        Math.random() > .5 ? speed.current: -speed.current,
                        Math.random() > .5 ? speed.current : -speed.current
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
        window.onkeydown = checkKeyDown;
        window.onkeyup = checkKeyUp;
    }, [])


    // key monitor
    const keys = {
        right: {
            pressed: false
        },
        left: {
            pressed: false
        },
        space: {
            pressed: false
        }
    }


    // function to set up key presses
    function checkKeyDown(e) {
        e = e || window.event;
        if (e.keyCode == '32') {
            keys.space.pressed = true;
            // bullets.current.push(new Bullet(
            //     ctx.current,
            //     spaceship.current.position.x + 85,
            //     spaceship.current.position.y,
            //     5))
        }
        else if (e.keyCode == '37') {
            keys.right.pressed = true;
            // spaceship.current.position.x -= 6;
        }
        else if (e.keyCode == '39') {
            keys.left.pressed = true;
            // spaceship.current.position.x += 6;
        }
    }
    function checkKeyUp(e) {
        e = e || window.event;
        if (e.keyCode == '32') {
            // keys.space.pressed = false;
            bullets.current.push(new Bullet(
                ctx.current,
                spaceship.current.position.x + 85,
                spaceship.current.position.y,
                5))
        }
        else if (e.keyCode == '37') {
            keys.right.pressed = false;
            // spaceship.current.position.x -= 6;
        }
        else if (e.keyCode == '39') {
            keys.left.pressed = false;
            // spaceship.current.position.x += 6;
        }
    }

    return (

        <main className={styles.mainStudyPage}>
            <div className='flex-box-sa'>
                <p>Score: {score.current}</p>
                <div className="flex-box-sb">
                    {lives.current.map((index) => 
                        <p key={index}>🚀</p>
                    )}
                </div>
            </div>
            <p><span>{number1}</span> x <span>{number2}</span></p>
            <canvas width={370} height={600} ref={canvasRef} />
            {/* Controls */}
            <div>
                <p onClick={() => spaceship.current.position.x -= 6}>&lt;</p>
                <p onClick={() => spaceship.current.position.x += 6}>&gt;</p>
            </div>
            <div className='flex-box-sa'>
                <p>Level: {level.current}</p>
                <div className="flex-box-sb">
                    <p>Highscore:</p>
                </div>
            </div> 
        </main>
    )
}

export default StudyPage;