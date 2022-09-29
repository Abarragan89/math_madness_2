import { useRef, useLayoutEffect, useEffect, useState, useContext } from 'react';
import styles from '../styles/studyPage/studyPage.module.css';
import Alien from '../assets/alienClass';
import Spaceship from '../assets/spaceship';
import Bullet from '../assets/bullets';
import { useRouter } from 'next/router';
import { AppContext } from '../AppContext';
import EndTrainingModal from '../components/endTrainingModal';


function GameOne() {

    // Get data from URL
    const router = useRouter();
    const { username, gameType } = router.query

    // Data from Context API
    const { numberRange } = useContext(AppContext)

    // canvas variables
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
    const [endGame, setEndGame] = useState<boolean>(false)
    // this lostLife is just used to cause a rerender
    const [lostLife, setLostLife] = useState<number>(null)
    const [highscore, setHighscore] = useState<number>(0)
    const [newHighscore, setNewHighscore] = useState<boolean>(false)
    const answer = useRef<number>(null)
    const score = useRef<number>(0)
    const speed = useRef<number>(.5)
    const lives = useRef<number[]>([1, 2, 3])
    const totalCorrect = useRef<number>(0)
    const level = useRef<number>(1)

    const renderFrame = (): void => {
        spaceship.current.moveSpaceship();
        // Move spaceship 
        if (keys.right.pressed && spaceship.current.position.x + 55 >= 0 && !keys.left.pressed) {
            spaceship.current.velocity.x -= .1;
            spaceship.current.rotation = -0.15
        } else if (keys.left.pressed && spaceship.current.position.x + 70 <= size.width && !keys.right.pressed) {
            spaceship.current.velocity.x += .1;
            spaceship.current.rotation = 0.15

        } else {
            spaceship.current.velocity.x = 0;
            spaceship.current.rotation = 0

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
                    handleCollision(alien, i, ctx.current);
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

    function handleCollision(alien: Alien, i: number, ctx: CanvasRenderingContext2D) {
        // if answer is correct: make new problem ,add to score, add to total correct, check for level/speed increase
        if (alien.answer === answer.current) {
            bullets.current.length = 0;
            generateProblem(ctx);
            score.current = score.current + 100 * speed.current;
            totalCorrect.current += 1
            if (totalCorrect.current >= 45) {
                speed.current = 3;
                level.current = 7;
            } else if (totalCorrect.current >= 35) {
                speed.current = 2.5;
                level.current = 6;
            } else if (totalCorrect.current >= 25) {
                speed.current = 2;
                level.current = 5;
            } else if (totalCorrect.current >= 15) {
                speed.current = 1.5
                level.current = 4;
            } else if (totalCorrect.current >= 10) {
                speed.current = 1;
                level.current = 3;
            } else if (totalCorrect.current >= 4) {
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
                endGameFunction();
                setEndGame(true)
            }
            aliens.current.splice(i, 1);
        }
    }

    // Make a new set of aliens for new problem
    function createAliens(ctx: CanvasRenderingContext2D, answer: number): void {
        for (let i = 0; i < 4; i++) {
            const randomMultiple = randomMultipleGenerator(numberRange, answer);
            // if randomMultiple is not available, redo the loop so alien is not generated nameless. 
            if (!randomMultiple) {
                i--
                continue;
            } else {
                aliens.current.push(
                    new Alien(
                        ctx,
                        randomNumberGenerator(size.width),
                        randomNumberGenerator(size.height / 2),
                        30,
                        i === 2 ? answer : randomMultiple,
                        Math.random() > .5 ? speed.current : -speed.current,
                        Math.random() > .5 ? speed.current : -speed.current
                    )
                )
            }
        }
    }

    // Make a new problem, reset aliens array to zero
    function generateProblem(ctx: CanvasRenderingContext2D): void {
        // clear aliens
        aliens.current.length = 0;
        // set up multiplication Problem
        if (gameType === 'multiplication') {
            if (numberRange > 12) {
                const rand1 = randomNumberGenerator(12);
                const rand2 = randomNumberGenerator(12);
                setNumber1(rand1)
                setNumber2(rand2)
                answer.current = rand1 * rand2
            } else {
                const rand2 = randomNumberGenerator(12);
                setNumber1(numberRange)
                setNumber2(rand2)
                answer.current = numberRange * rand2
            }
            // set up multiplication Problem
        } else if (gameType === 'division') {
            if (numberRange > 12) {
                const divisor = randomNumberGenerator(12);
                const dividend = divisor * randomNumberGenerator(12);
                setNumber1(dividend);
                setNumber2(divisor);
                answer.current = dividend / divisor;
            } else {
                const divisor = numberRange;
                const dividend = numberRange * randomNumberGenerator(12);
                setNumber1(dividend);
                setNumber2(divisor);
                answer.current = dividend / divisor;
            }
            // Set up addition problems
        } else if (gameType === 'addition') {
            const randomOne = Math.floor(Math.random() * (numberRange / 2) + 1);
            const randomTwo = Math.floor(Math.random() * (numberRange / 2) + 1);
            setNumber1(randomOne);
            setNumber2(randomTwo);
            answer.current = randomOne + randomTwo;
        } else if (gameType === 'subtraction') {
            const randomOne = Math.floor(Math.random() * (numberRange / 2) + 1);
            const randomTwo = Math.floor(Math.random() * (numberRange / 2) + 1);
            setNumber1(Math.max(randomOne, randomTwo));
            setNumber2(Math.min(randomOne, randomTwo));
            answer.current = Math.max(randomOne, randomTwo) - Math.min(randomOne, randomTwo);
        }
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
    }


    // function to set up key presses
    function checkKeyDown(e) {
        if (e.keyCode == '37') {
            keys.right.pressed = true;
        }
        else if (e.keyCode == '39') {
            keys.left.pressed = true;
        }
    }
    function checkKeyUp(e) {
        if (e.keyCode == '32') {
            bullets.current.push(new Bullet(
                ctx.current,
                spaceship.current.position.x + 60,
                spaceship.current.position.y,
                3
            ))
        }
        else if (e.keyCode == '37') {
            keys.right.pressed = false;
        }
        else if (e.keyCode == '39') {
            keys.left.pressed = false;
        }
    }
    // // Update highscore if new highscore
    function endGameFunction() {
        const indexedDB = window.indexedDB;
        const request = indexedDB.open('GameDatabase', 1);
        request.onsuccess = () => {
            const db = request.result
            const transaction = db.transaction('activeGames', 'readwrite')
            const objectStore = transaction.objectStore('activeGames')
            // target specific field for search
            const searchIndex = objectStore.index('search_name');
            searchIndex.get(username + gameType[0]).onsuccess = function (event) {
                const obj = ((event.target as IDBRequest).result);
                // set the highscore or final highscore
                if (gameType === 'addition' || gameType === 'subtraction') {
                    console.log(numberRange)
                    if (score.current > obj.game1Highscore[numberRange / 10 - 1]) {
                        console.log(obj.game1Highscore, score.current)
                        obj.game1Highscore[numberRange / 10 - 1] = score.current
                        setNewHighscore(true)
                    }
                } else {
                    if (score.current > obj.game1Highscore[numberRange - 1]) {
                        console.log(obj.game1Highscore, score.current)
                        obj.game1Highscore[numberRange - 1] = score.current
                        setNewHighscore(true)
                    }
                }
                objectStore.put(obj)
            }
        }
    }

    // Get Highscore from database
    useEffect(() => {
        if (username && gameType) {
            const indexedDB = window.indexedDB;
            const request = indexedDB.open('GameDatabase', 1);
            request.onsuccess = () => {
                const db = request.result
                const transaction = db.transaction('activeGames', 'readwrite')
                const objectStore = transaction.objectStore('activeGames')
                // target specific field for search
                const searchIndex = objectStore.index('search_name');
                searchIndex.get(username + gameType[0]).onsuccess = function (event) {
                    if (gameType === 'addition' || gameType === 'subtraction') {
                        setHighscore((event.target as IDBRequest).result.game1Highscore[numberRange / 10 - 1])
                    } else {
                        setHighscore((event.target as IDBRequest).result.game1Highscore[numberRange - 1])
                    }
                }
            }
        }
    }, [username, gameType])

    return (
        <>
            {endGame ?
                <EndTrainingModal
                    currentScore={score.current}
                    newHighscore={newHighscore}
                />
                :
                <main className={styles.mainStudyPage}>
                    <div className='flex-box-sa'>
                        <p>Score: {score.current}</p>
                        <div className="flex-box-sb">
                            {lives.current.map((index) =>
                                <p key={index}>🚀</p>
                            )}
                        </div>
                    </div>
                    <p>
                        {gameType === 'division' &&
                            <>
                                <span>{number1}</span> ÷ <span>{number2}</span>
                            </>
                        }
                        {gameType === 'multiplication' &&
                            <>
                                <span>{number1}</span> x <span>{number2}</span>
                            </>
                        }
                        {gameType === 'addition' &&
                            <>
                                <span>{number1}</span> + <span>{number2}</span>
                            </>
                        }
                        {gameType === 'subtraction' &&
                            <>
                                <span>{number1}</span> - <span>{number2}</span>
                            </>
                        }
                    </p>
                    <canvas width={370} height={600} ref={canvasRef} />
                    {/* Controls */}
                    <div>
                        <p onClick={() => spaceship.current.position.x -= 6}>&lt;</p>
                        <p onClick={() => spaceship.current.position.x += 6}>&gt;</p>
                    </div>
                    <div className='flex-box-sa'>
                        <p>Level: {level.current}</p>
                        <div className="flex-box-sb">
                            <p>Highscore:{highscore}</p>
                        </div>
                    </div>
                </main>

            }
        </>
    )
}

export default GameOne;