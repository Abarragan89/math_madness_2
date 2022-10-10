import Head from 'next/head';
import { useRef, useLayoutEffect, useEffect, useState, useContext } from 'react';
import Alien from '../assets/alienClass';
import Spaceship from '../assets/spaceship';
import Bullet from '../assets/bullets';
import { useRouter } from 'next/router';
import { AppContext } from '../AppContext';
import EndTrainingModal from '../components/endTrainingModal';
import Explosion from '../assets/explosion';
import Astroid from '../assets/astroid';
import styles from '../styles/gameOne/gameOne.module.css';
import styles2 from '../styles/gameThree/gameThree.module.css'

import NumberSwiper from '../components/numberSwiper';



function GameThree({ wrongAlien, laserSound, destroyAlien, stopMusic }) {
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
    const spaceship = useRef<Spaceship>(null);
    const bullets = useRef<Bullet[]>([]);
    const aliens = useRef<Alien[]>([])
    const explosion = useRef<Explosion[]>([])

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
    const astroids = useRef<Astroid[]>([])
    const astroidSpeed = useRef<number>(.5)

    const tick = () => {
        if (!canvasRef.current) return;
        canvasRef.current.getContext('2d').clearRect(0, 0, size.width, size.height);
        renderFrame();
        requestIdRef.current = requestAnimationFrame(tick);
    };


    const renderFrame = (): void => {
        // Draw Astroids
        if (astroids.current) {
            astroids.current.forEach(astroid => {
                astroid.update();
            })
        }
    };


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
                setNumber1(rand1)
                setNumber2(rand2)
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
                setNumber1(numberRange)
                setNumber2(rand2)
                answer.current = numberRange * rand2
                astroids.current.push(new Astroid(
                    ctx,
                    Math.floor(Math.random() * size.width) - 20,
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
    }

    useLayoutEffect(() => {
        ctx.current = canvasRef.current.getContext('2d');
        // create instances of spaceship
        generateProblem(ctx.current)

        setInterval(() => {
            generateProblem(ctx.current)
        }, 5000)


        requestIdRef.current = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(requestIdRef.current);
        };
    }, []);


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
                    if (score.current > obj.game1Highscore[numberRange / 10 - 1]) {
                        obj.game1Highscore[numberRange / 10 - 1] = score.current
                        setNewHighscore(true)
                    }
                } else {
                    if (score.current > obj.game1Highscore[numberRange - 1]) {
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

                   
                    <NumberSwiper />


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