import Head from 'next/head';
import { useRef, useLayoutEffect, useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { AppContext } from '../AppContext';
import EndTrainingModal from '../components/endTrainingModal';
import Astroid from '../assets/astroid';
import styles from '../styles/gameOne/gameOne.module.css';
import styles2 from '../styles/gameThree/gameThree.module.css'
import NumberSwiper from '../components/numberSwiper';
import Missle from '../assets/missle';
import BigExplosion from '../assets/bigExplosion';
import useSound from 'use-sound';
import PlanetBase from '../assets/planet';



function GameThree({ wrongAlien, laserSound, destroyAlien, stopMusic }) {
    // Set up sounds
    const [playIncorrectAnswer] = useSound('/sounds/wrongAnswer.wav');
    const [playCorrectAnswer] = useSound('/sounds/correctAnswerGameThree.wav', {
        volume: 0.3
    })


    // Get data from URL
    const router = useRouter();
    const { username, gameType } = router.query

    // Data from Context API
    const { numberRange } = useContext(AppContext)

    // canvas variables
    const size = { width: 360, height: 500 };
    const canvasRef = useRef(null);
    const ctx = useRef<CanvasRenderingContext2D>(null)
    // reference to the animation reference to stop animation
    const requestIdRef = useRef(null);

    // State for numbers in problem, score, level, and speed
    const [endGame, setEndGame] = useState<boolean>(false)
    // this lostLife is just used to cause a rerender
    const [lostLife, setLostLife] = useState<number>(null)
    const [highscore, setHighscore] = useState<number>(0)
    const [newHighscore, setNewHighscore] = useState<boolean>(false)
    const answer = useRef<number>(null)
    const score = useRef<number>(0)
    const lives = useRef<number[]>([1, 2, 3])
    const totalCorrect = useRef<number>(0)
    const level = useRef<number>(1);
    const astroids = useRef<Astroid[]>([]);
    const missles = useRef<Missle[]>([]);
    const explosions = useRef<BigExplosion[]>([]);
    const astroidSpeed = useRef<number>(.2);
    const astroidFrequency = useRef<number>(5000)
    const finalAnswer = useRef<number>(null)
    const inputEl = useRef(null)
    const planet = useRef<PlanetBase>(null);
    const asteroidTimer = useRef(null);

    const tick = () => {
        if (!canvasRef.current) return;
        canvasRef.current.getContext('2d').clearRect(0, 0, size.width, size.height);
        renderFrame();
        requestIdRef.current = requestAnimationFrame(tick);
    };

    const renderFrame = (): void => {
        if(planet.current) {
            planet.current.draw();
        }
        // Draw Astroids
        if (astroids.current) {
            astroids.current.forEach(astroid => {
                astroid.update();
                // check astroid hitting planet
                checkCollisionWithPlanet()
            })
        }
        // Draw Missles
        if (missles.current) {
            missles.current.forEach(missle => {
                missle.update();
            })
        }
        // Check collisions with bullet and asteroid
        checkCollision(
            missles.current,
            astroids.current
        )
        // Draw Explosions
        if (explosions.current) {
            explosions.current.forEach(explosion => {
                explosion.moveParticle();
            })
        }
    }

    function checkCollisionWithPlanet() {
        const distanceX = planet.current.x - astroids.current[0].x;
        const distanceY = planet.current.y - astroids.current[0].y;
        let radii_sum = 500 + 30;
        if (distanceX * distanceX + distanceY * distanceY <= radii_sum * radii_sum) {
            endGameFunction();
            setEndGame(true)
        }
    }


    // check for collision with missle adn bullet
    function checkCollision(missles: Array<Missle>, astroids: Array<Astroid>): void {
        astroids.forEach((astroid, i) => {
            missles.forEach((missle, j) => {
                if (missle.y < astroid.y) {
                    missles.splice(j, 1);
                    astroids.splice(i, 1)
                    for(let i = 0; i < 20; i++) {
                        explosions.current.push(new BigExplosion(ctx.current, missle.x, missle.y, 10))
                    }
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
    function randomSumGenerator(num: number, exclude: number): number {
        const randomSum = randomNumberGenerator(num);
        if (randomSum === exclude) {
            randomMultipleGenerator(num, exclude)
        } else {
            return randomSum;
        }
    }

    // Make a new problem, reset aliens array to zero
    function generateProblem(ctx: CanvasRenderingContext2D): void {
        // set up multiplication Problem
        if (gameType === 'multiplication') {
            if (numberRange > 12) {
                const rand1 = randomNumberGenerator(12);
                const rand2 = randomNumberGenerator(12);
                answer.current = rand1 * rand2
                // astroids.current.push(new Astroid(
                //     ctx,
                //     size.width / 2,
                //     -10,
                //     10,
                //     astroidSpeed.current
                // ))
            } else {
                const rand2 = randomNumberGenerator(12);
                answer.current = numberRange * rand2
                astroids.current.push(new Astroid(
                    ctx,
                    randomNumberGenerator(300) + 30,
                    -50,
                    30,
                    astroidSpeed.current,
                    { num1: numberRange, num2: rand2 }
                ))
            }
            // set up multiplication Problem
        } else if (gameType === 'division') {
            if (numberRange > 12) {
                const divisor = randomNumberGenerator(12);
                const dividend = divisor * randomNumberGenerator(12);
                answer.current = dividend / divisor;
            } else {
                const divisor = numberRange;
                const dividend = numberRange * randomNumberGenerator(12);
                answer.current = dividend / divisor;
            }
            // Set up addition problems
        } else if (gameType === 'addition') {
            const randomOne = Math.floor(Math.random() * (numberRange / 2) + 1);
            const randomTwo = Math.floor(Math.random() * (numberRange / 2) + 1);
            answer.current = randomOne + randomTwo;
        } else if (gameType === 'subtraction') {
            const randomOne = Math.floor(Math.random() * (numberRange / 2) + 1);
            const randomTwo = Math.floor(Math.random() * (numberRange / 2) + 1);
            answer.current = Math.max(randomOne, randomTwo) - Math.min(randomOne, randomTwo);
        }
    }

    // Don't have focus on keyboard immediately so keyboard on mobile will not appear. 
    // Only after a key is pressed is focused but on the element.
    function focusOnInput() {
        if(inputEl.current) {
            inputEl.current.focus();
        }
    }

    useLayoutEffect(() => {
        window.onkeydown = focusOnInput;
        ctx.current = canvasRef.current.getContext('2d');
        // create instances of spaceship
        generateProblem(ctx.current)
        // create the planet surface
        planet.current = new PlanetBase(ctx.current)

        if (asteroidTimer.current) {
            clearInterval(asteroidTimer.current)
        }
        asteroidTimer.current = setInterval(() => {
            generateProblem(ctx.current)
        }, astroidFrequency.current)

        requestIdRef.current = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(requestIdRef.current);
        };
    }, [astroidFrequency.current]);


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
                    if (score.current > obj.game3Highscore[numberRange / 10 - 1]) {
                        obj.game3Highscore[numberRange / 10 - 1] = score.current
                        setNewHighscore(true)
                    }
                } else {
                    if (score.current > obj.game3Highscore[numberRange - 1]) {
                        obj.game3Highscore[numberRange - 1] = score.current
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
                        setHighscore((event.target as IDBRequest).result.game3Highscore[numberRange / 10 - 1])
                    } else {
                        setHighscore((event.target as IDBRequest).result.game3Highscore[numberRange - 1])
                    }
                }
            }
        }
    }, [username, gameType])

    function fireMissle() {
        // get the coordinates for the astroid
        const posX = astroids.current[0].x
        missles.current.push(new Missle(
            ctx.current,
            posX,
            size.height,
            10,
            0
        ))

    }

    function assessResponse() {
        // clear the input element
        inputEl.current.value = '';
        // get the numbers from the astroid closest to impact
        const number1 = astroids.current[0].problem.num1
        const number2 = astroids.current[0].problem.num2

        if (finalAnswer.current === number1 * number2) {
            playCorrectAnswer();
            fireMissle();
            totalCorrect.current += 1
            score.current += (1000 * astroidSpeed.current)
            if (totalCorrect.current === 35) {
                astroids.current.length = 1;
                level.current = 5
                astroidFrequency.current = 1000
                astroidSpeed.current = 1.2
            } else if (totalCorrect.current === 25) {
                astroids.current.length = 1;
                level.current = 4
                astroidFrequency.current = 2000
                astroidSpeed.current = 1.1
            } else if (totalCorrect.current === 15) {
                astroids.current.length = 1;
                level.current = 3
                astroidFrequency.current = 3000
                astroidSpeed.current = .8
            } else if (totalCorrect.current === 5) {
                astroids.current.length = 1;
                level.current = 2
                astroidFrequency.current = 4000
                astroidSpeed.current = .5
            }
            // changing this state just to cause a render to show score
            setLostLife(randomNumberGenerator(1000000));
        } else {
            playIncorrectAnswer();
        }
    }

    const [isText, setIsText] = useState<boolean>(false)

    return (
        <>
            <Head>
                <title>Alien Invasion</title>
            </Head>
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
                                <p className={styles.lives} key={index}>🚀</p>
                            )}
                        </div>
                    </div>
                    <canvas width={360} height={500} ref={canvasRef} />
                    {/* Controls */}

                    <div>
                        <NumberSwiper
                            finalAnswer={finalAnswer}
                            assessResponse={assessResponse}
                            isText={isText}
                        />
                        <input
                            onFocus={() => setIsText(true)}
                            onKeyDown={(e) => e.key === 'Enter' && assessResponse()}
                            onChange={(e) => finalAnswer.current = parseInt(e.target.value)}
                            type="text" ref={inputEl} />

                        <button onClick={assessResponse}>
                            Fire
                        </button>
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

export default GameThree;