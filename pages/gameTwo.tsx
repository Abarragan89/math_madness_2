import Head from 'next/head';
import { useRef, useLayoutEffect, useEffect, useState, useContext } from 'react';
import styles from '../styles/gameTwo/gameTwo.module.css';
import AlienShip from '../assets/alienShip';
import Spaceship from '../assets/spaceship';
import Bullet from '../assets/bullets';
import { useRouter } from 'next/router';
import { AppContext } from '../AppContext';
import EndTrainingModal from '../components/endTrainingModal';


function GameTwo({ wrongAlien, laserSound, destroyAlien }) {
    // Get data from URL
    const router = useRouter();
    const { username, gameType } = router.query

    // Data from Context API
    const { numberRange } = useContext(AppContext)

    // canvas variables
    const size = { width: 80, height: 550 };
    const canvasRef = useRef(null);
    const ctx = useRef<CanvasRenderingContext2D>(null)
    // reference to the animation reference to stop animation
    const requestIdRef = useRef(null);
    const spaceship = useRef<Spaceship>(null);
    const alien = useRef<AlienShip>(null)

    // State for numbers in problem, score, level, and speed
    const [number1, setNumber1] = useState<number>(null)
    const [number2, setNumber2] = useState<number>(null)
    const answer = useRef<number>(null)
    const [endGame, setEndGame] = useState<boolean>(false)
    const [highscore, setHighscore] = useState<number>(0)
    const [newHighscore, setNewHighscore] = useState<boolean>(false)
    const score = useRef<number>(0)
    const problemTimer = useRef<number>(100);
    const [mainTimer, setMainTimer] = useState<number>(120);
    const [cards, setCards] = useState<number[]>([]);

    const tick = () => {
        if (!canvasRef.current) return;
        canvasRef.current.getContext('2d').clearRect(0, 0, size.width, size.height);
        renderFrame();
        requestIdRef.current = requestAnimationFrame(tick);
    };

    const renderFrame = (): void => {
        spaceship.current.moveSpaceship();
        alien.current.chaseAlienship();
        // spaceship.current.chaseSpaceship();
    };

    // check for collision
    function checkCollision(): void {
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

    function handleCollision(alien: AlienShip, i: number, j: number, ctx: CanvasRenderingContext2D) {

    }

    console.log(cards)

    function assessResponse() {
    
    }

    // Make a new problem, reset aliens array to zero
    function generateProblem(): void {
        for (let i = 0; i < 10; i++) {
            setCards(cards => [...cards, randomNumberGenerator(12)])
        }
        // set up multiplication Problem
        if (gameType === 'multiplication') {
            if (numberRange > 12) {
                const rand1 = randomNumberGenerator(12);
                const rand2 = randomNumberGenerator(12);
                setCards(cards => [...cards, rand1, rand2])
                // setNumber1(rand1)
                // setNumber2(rand2)
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
    }

    useLayoutEffect(() => {
        ctx.current = canvasRef.current.getContext('2d');
        // create instances of spaceship
        spaceship.current = new Spaceship(ctx.current, 100, 80, {
            x: ctx.current.canvas.width / 2 - 50,
            y: 30
        },
            '/rocketShipGameTwo.png'
        )
        alien.current = new AlienShip(ctx.current, 80, 80, {
            x: ctx.current.canvas.width / 2 - 40,
            y: -50
        },
            '/alienGameTwo.png'
        )
        requestIdRef.current = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(requestIdRef.current);
        };
    }, []);

    // problem timer function
    const [problemTrigger, setProblemTrigger] = useState<boolean>(false);
    const [stopProblemTimer, setStopProblemTimer] = useState<boolean>(false)
    function problemTimerControl(): void {
        if (stopProblemTimer) {
            return;
        } else if (problemTimer.current > 0) {
            setTimeout(() => {
                setProblemTrigger(!problemTrigger)
                problemTimer.current--
            }, 100)
        } else {
            // playProblemTimerExpired();
            problemTimer.current = 100;
            // pickRandomNumbers(numberRange, gameType);
            problemTimerControl();
        }
    }

    // main timer function
    function mainTimerControl(): void {
        if (mainTimer === 0) {
            endGameFunction()
            setStopProblemTimer(true);
        } else {
            setTimeout(() => setMainTimer(mainTimer - 1), 1000);
        }
    }

    // Start timers
    useEffect(() => {
        problemTimerControl();
        mainTimerControl();
    }, [problemTrigger])
    
    // Set up first problem
    useEffect(() => {
        generateProblem();
    }, [])

    function setUpProblem() {

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
                    if (score.current > obj.game2Highscore[numberRange / 10 - 1]) {
                        obj.game2Highscore[numberRange / 10 - 1] = score.current
                        setNewHighscore(true)
                    }
                } else {
                    if (score.current > obj.game2Highscore[numberRange - 1]) {
                        obj.game2Highscore[numberRange - 1] = score.current
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
                        setHighscore((event.target as IDBRequest).result.game2Highscore[numberRange / 10 - 1])
                    } else {
                        setHighscore((event.target as IDBRequest).result.game2Highscore[numberRange - 1])
                    }
                }
            }
        }
    }, [username, gameType])

    return (
        <>
            <Head>
                <title>Space Race</title>
            </Head>
            {endGame ?
                <EndTrainingModal
                    currentScore={score.current}
                    newHighscore={newHighscore}
                />
                :
                <div className={styles.mainGameTwoPage}>
                    <div className={`flex-box-sb ${styles.gameData}`}>
                        <p>Problem Timer <br /> {problemTimer.current}</p>
                        <p>Timer <br /> {mainTimer}</p>
                    </div>
                    {/* div for the gameboard, problem and score */}
                    <main className='flex-box-sb'>
                        <canvas width={80} height={550} ref={canvasRef} />
                        <div className={`flex-box-col-se ${styles.gameboardSection}`}>
                            <div className={styles.currentProblem}>
                                <p>Target</p>
                                <h3>{answer.current}</h3>
                            </div>
                            <div className={`flex-box-sa-wrap ${styles.gameboard}`}>
                                {cards.map((card, index) => 
                                    <h2 key={index} className={styles.numberCard}>{card}</h2>
                                )}
                                {/* <h2 className={styles.numberCard}>12</h2>
                                <h2 className={styles.numberCard}>12</h2>
                                <h2 className={styles.numberCard}>12</h2>
                                <h2 className={styles.numberCard}>12</h2>
                                <h2 className={styles.numberCard}>12</h2>
                                <h2 className={styles.numberCard}>12</h2>
                                <h2 className={styles.numberCard}>12</h2>
                                <h2 className={styles.numberCard}>12</h2>
                                <h2 className={styles.numberCard}>12</h2>
                                <h2 className={styles.numberCard}>12</h2>
                                <h2 className={styles.numberCard}>12</h2> */}
                            </div>
                            <div className='flex-box-sb'>
                                <p>Score <br /> {score.current}</p>
                                <p>Highscore <br /> {highscore}</p>
                            </div>
                        </div>
                    </main>
                </div>

            }
        </>
    )
}

export default GameTwo;