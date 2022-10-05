import Head from 'next/head';
import { useRef, useLayoutEffect, useEffect, useState, useContext } from 'react';
import styles from '../styles/gameTwo/gameTwo.module.css';
import AlienShip from '../assets/alienShip';
import Astronaut from '../assets/astronaut';
import { useRouter } from 'next/router';
import { AppContext } from '../AppContext';
import EndTrainingTwoModal from '../components/endTrainingTwoModal';
import useSound from 'use-sound';

// STD: Work on sounds
// Get working on division


function GameTwo({ wrongAlien, stopMusic }) {
    //sounds 
    const [playCorrectAnswer] = useSound('/sounds/correctAnswer.wav')
    const [playIcorrectAnswer] = useSound('/sounds/wrongAnswer.wav')
    const [playButtonPress] = useSound('/sounds/calculatorClick.wav')


    // Get data from URL
    const router = useRouter();
    const { username, gameType } = router.query

    // Data from Context API
    const { numberRange } = useContext(AppContext)

    // canvas variables
    const size = { width: 120, height: 600 };
    const canvasRef = useRef(null);
    const ctx = useRef<CanvasRenderingContext2D>(null)
    // reference to the animation reference to stop animation
    const requestIdRef = useRef(null);
    const astronaut = useRef<Astronaut>(null);
    const alien = useRef<AlienShip>(null);

    // State for numbers in problem, score, level, and speed
    const number1 = useRef<number>(null);
    const number2 = useRef<number>(null);
    const divisorSubtrahend = useRef<number>(null);
    const dividendMinuend = useRef<number>(null);
    const answer = useRef<number>(null);
    const [endGame, setEndGame] = useState<boolean>(false);
    const [highscore, setHighscore] = useState<number>(0);
    const [newHighscore, setNewHighscore] = useState<boolean>(false);
    const score = useRef<number>(0);
    const problemTimer = useRef<number>(100);
    const [cards, setCards] = useState<number[]>([]);
    const userResponseUI = useRef(null)
    const captured = useRef<boolean>(false)

    const tick = () => {
        if (!canvasRef.current) return;
        canvasRef.current.getContext('2d').clearRect(0, 0, size.width, size.height);
        renderFrame();
        requestIdRef.current = requestAnimationFrame(tick);
    };

    const renderFrame = (): void => {
        if (!captured.current) {
            checkCollision();
        }
        astronaut.current.chaseAstronaut();
        alien.current.moveAlienship();
    };

    // check for collision
    function checkCollision(): void {
        if (astronaut.current.position.y <= alien.current.position.y + 65) {
            stopMusic();
            captured.current = true
            alien.current.velocity.y = 0;
            setStopProblemTimer(true);
            handleCollision();
            endGameFunction()
        } else if (astronaut.current.position.y > size.height) {
            stopMusic();
            captured.current = false
            alien.current.velocity.y = 0;
            setStopProblemTimer(true);
            endGameFunction();
            setEndGame(true);
            // correct music
        }
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

    function handleCollision() {
        // gameover sound
        wrongAlien();
        setTimeout(() => {
            // animation take off
            alien.current.velocity.y -= 10.1;
            astronaut.current.velocity.y -= 10;
        }, 1000)
        setTimeout(() => {
            setStopProblemTimer(true);
            setEndGame(true)
        }, 2000)
    }


    // Assessment Logic and functions
    function correctAnswer() {
        //play sound
        playCorrectAnswer()
        // play correct sound and change color
        userResponseUI.current.style.color = 'green';
        // move astronaut
        astronaut.current.nudgeAstronaut();
        // add to score
        score.current += problemTimer.current * 5
        // clear numbers and generate new
        if(!endGame) {
            setTimeout(() => {
                number1.current = null;
                number2.current = null;
                setCards([])
                generateProblem();
                problemTimer.current = 100;
                if(userResponseUI.current) {
                    userResponseUI.current.style.color = 'white';
                }
            }, 300)
        }

    }
    function incorrectAnswer() {
        // play sound
        playIcorrectAnswer();
        // play correct sound and change color
        userResponseUI.current.style.color = 'red';
        // clear number but leave same problem
        setTimeout(() => {
            number1.current = null;
            number2.current = null;
            userResponseUI.current.style.color = 'white';
        }, 300)


    }
    function assessResponse() {
        // assess multiplication
        if (gameType === 'multiplication') {
            if (numberRange > 12) {
                if (number1.current * number2.current === answer.current) {
                    correctAnswer();
                } else {
                    incorrectAnswer();
                }
            } else {
                if ((number1.current === numberRange || number2.current === numberRange) && number1.current * number2.current === answer.current) {
                    correctAnswer();
                } else {
                    incorrectAnswer();
                }
            }
            // assess division    
        } else if (gameType === 'division') {
            if (number1.current === dividendMinuend.current && number2.current === divisorSubtrahend.current) {
                correctAnswer();
            } else {
               incorrectAnswer();
            }
        } else if (gameType === 'subtraction') {
            if (number1.current - number2.current === answer.current) {
                correctAnswer();
            } else {
               incorrectAnswer();
            }
        } else if (gameType === 'addition') {
        if (number1.current + number2.current === answer.current) {
            correctAnswer();
        } else {
           incorrectAnswer();
        }
    }
    }
    function setNumbers(card: number) {
        if (!number1.current) {
            number1.current = card
            return;
        } else if (!number2.current) {
            number2.current = card
            assessResponse();
        }
    }

    // Make a new problem, reset aliens array to zero
    function generateProblem(): void {
        // set up multiplication Problem
        if (gameType === 'multiplication') {
            // Set up cards
            // for multiplication, we can just give the numbers 1 through 12. Just set answer
            for (let i = 0; i < 12; i++) {
                setCards(cards => [...cards, i + 1])
            }
            if (numberRange > 12) {
                const rand1 = randomNumberGenerator(12);
                const rand2 = randomNumberGenerator(12);
                answer.current = rand1 * rand2
            } else {
                const rand2 = randomNumberGenerator(12);
                answer.current = numberRange * rand2
            }
        // set up multiplication Problem
        } else if (gameType === 'division') {
            if (numberRange > 12) {
                divisorSubtrahend.current = randomNumberGenerator(12); //divisor
                dividendMinuend.current = divisorSubtrahend.current * randomNumberGenerator(12); //dividend
                answer.current = dividendMinuend.current / divisorSubtrahend.current;
            } else {
                divisorSubtrahend.current = numberRange; //divisor
                dividendMinuend.current = numberRange * randomNumberGenerator(12); //dividend
                answer.current = dividendMinuend.current / divisorSubtrahend.current;
            }
            // set up cards
            for (let i = 0; i < 12; i++) {
                if (i === 0) {
                    setCards(cards => [...cards, dividendMinuend.current])
                } else if (i === 1) {
                    setCards(cards => [...cards, divisorSubtrahend.current])
                } else {
                    setCards(cards => [...cards, randomNumberGenerator(divisorSubtrahend.current * 12)])
                }
            }
            setCards(cards => cards.sort(() => Math.random() - 0.5))
        
            // Set up addition problems
        } else if (gameType === 'addition') {

            const rand1 = randomNumberGenerator(numberRange / 2);
            const rand2 = randomNumberGenerator(numberRange / 2);
            answer.current = rand1 + rand2
             // set up cards
             for (let i = 0; i < 12; i++) {
                if (i === 0) {
                    setCards(cards => [...cards, rand1])
                } else if (i === 1) {
                    setCards(cards => [...cards, rand2])
                } else {
                    setCards(cards => [...cards, randomNumberGenerator(numberRange)])
                }
            }
            setCards(cards => cards.sort(() => Math.random() - 0.5))

    

        } else if (gameType === 'subtraction') {
            const randomNum1 = randomNumberGenerator(numberRange / 2);
            const randomNum2 = randomNumberGenerator(numberRange / 2);
            divisorSubtrahend.current = (Math.min(randomNum1, randomNum2)); //Subtrahend
            dividendMinuend.current = (Math.max(randomNum1, randomNum2)) //Minued
            answer.current = dividendMinuend.current - divisorSubtrahend.current;
             // set up cards
             for (let i = 0; i < 12; i++) {
                if (i === 0) {
                    setCards(cards => [...cards, dividendMinuend.current])
                } else if (i === 1) {
                    setCards(cards => [...cards, divisorSubtrahend.current])
                } else {
                    setCards(cards => [...cards, randomNumberGenerator(numberRange)])
                }
            }
            setCards(cards => cards.sort(() => Math.random() - 0.5))
        }
    }

    const alienSpeed = useRef<number>(null)
    useLayoutEffect(() => {
        if (gameType === 'addition' || gameType === 'subtraction') {
            alienSpeed.current = 0.02
        } else {
            alienSpeed.current = 0.45

        }
        ctx.current = canvasRef.current.getContext('2d');
        // create instances of spaceship
        astronaut.current = new Astronaut(ctx.current, 50, 50, {
            x: ctx.current.canvas.width / 2 - 25,
            y: 100
        },
            '/astronaut.png',
            {
                x: 0,
                y: 0
            }
        )
        alien.current = new AlienShip(ctx.current, 120, 120, {
            x: ctx.current.canvas.width / 2 - 60,
            y: -15
        },
            '/alienGameTwo.png',
            {
                x: 0,
                y: alienSpeed.current
            }
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
            wrongAlien();
            setCards([]);
            problemTimer.current = 100;
            generateProblem()
            problemTimerControl();
        }
    }

    // Start timers
    useEffect(() => {
        problemTimerControl();
    }, [problemTrigger])

    // Set up first problem
    useEffect(() => {
        generateProblem();
    }, [])


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
                <EndTrainingTwoModal
                    currentScore={score.current}
                    newHighscore={newHighscore}
                    finishedRace={captured.current}
                />
                :
                <div className={styles.mainGameTwoPage}>
                    <div className={`flex-box-sb ${styles.gameData}`}>
                        <p>Score Multiplier<br /> {problemTimer.current}</p>
                        {gameType === 'multiplication' &&
                            <p className={styles.numberRangeUI}>{`Multiples: ${numberRange > 12 ? 'final' : numberRange}`}</p>
                        }
                        {gameType === 'division' &&
                            <p className={styles.numberRangeUI}>{`Factors: ${numberRange > 12 ? 'final' : numberRange}`}</p>
                        }
                    </div>
                    {/* div for the gameboard, problem and score */}
                    <main className='flex-box-sb'>
                        <canvas width={120} height={600} ref={canvasRef} />
                        <div className={`flex-box-col-se ${styles.gameboardSection}`}>
                            <div className={styles.currentProblem}>
                                <p>Target</p>
                                <h3>{answer.current}</h3>
                            </div>
                            <div ref={userResponseUI} className={`flex-box-sb ${styles.userResponseUI}`}>
                                <span>{number1.current}</span>
                                {gameType === 'division' &&
                                    <>÷</>
                                }
                                {gameType === 'multiplication' &&
                                    <>x</>
                                }
                                {gameType === 'addition' &&
                                    <>+</>
                                }
                                {gameType === 'subtraction' &&
                                    <>-</>
                                }
                                <span>{number2.current}</span>
                            </div>
                            <div className={`flex-box-sa-wrap ${styles.gameboard}`}>
                                {cards.map((card, index) =>
                                    <h2
                                        onClick={() => {
                                            playButtonPress();
                                            setNumbers(card)
                                        }}
                                        key={index}
                                        className={styles.numberCard}
                                    >{card}</h2>
                                )}
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