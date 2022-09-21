import { useEffect, useState, useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import EndGameModal from '../components/endGameModal';
import { AppContext } from '../AppContext';
import styles from '../styles/quizStyles/quizStyles.module.css';
import styles2 from '../styles/chooseGame/chooseGame.module.css';
import useSound from 'use-sound';

function MultiplicationQuiz({ startGame, setStartGame, showModal, setShowModal, stopMusic }) {

    // set up correct, incorrect and winning sounds
    const [playFailedMission] = useSound('/sounds/failedGame.wav', {
        volume: .5,
        interrupt: false
    })
    const [playPassedMission] = useSound('/sounds/passedGame.wav', {
        volume: .5,
        interrupt: false
    })
    const [playCalculatorClick] = useSound('/sounds/calculatorClick.wav');
    const [playProblemTimerExpired] = useSound('/sounds/problemTimerExpired.wav');
    const [playCorrectAnswer] = useSound('/sounds/correctAnswer.wav')
    const [playIncorrectAnswer] = useSound('/sounds/wrongAnswer.wav')
    const [winningScore, setWinningScore] = useState<number>(2)



    // Data from Context API
    const { numberRange } = useContext(AppContext)

    // Get Data from IndexedDB
    const [highscore, setHighscore] = useState<number>(null)
    // get username from URL to query in IndexedDB
    const router = useRouter();
    const { username, gameType } = router.query
    const [passedLevels, setPassedLevels] = useState<number>(null)
    const [finalHighscore, setFinalHighscore] = useState<number>(null)
    const [operationType, setOperationType] = useState<string[] | string>('')

    // retrieve data from database to show appropriate amount of squares
    useEffect(() => {
        if (username && gameType) {
            setOperationType(gameType)

            const indexedDB = window.indexedDB;
            const request = indexedDB.open('GameDatabase', 1);
            request.onsuccess = () => {
                const db = request.result
                const transaction = db.transaction('activeGames', 'readwrite')
                const objectStore = transaction.objectStore('activeGames')
                // target specific field for search
                const searchIndex = objectStore.index('search_name');
                searchIndex.get(username + gameType[0]).onsuccess = function (event) {
                    setPassedLevels((event.target as IDBRequest).result.level)
                    setHighscore((event.target as IDBRequest).result.highscore)
                    setFinalHighscore((event.target as IDBRequest).result.finalHighscore)
                }
            }
        }
    }, [username, gameType])
    const inputEl = useRef(null)
    // set up all variables for numbers, answers, responses, and timers
    const [userResponse, setUserResponse] = useState<string>('');
    const [numberOne, setNumberOne] = useState<number>(null);
    const [numberTwo, setNumberTwo] = useState<number>(null);
    const [correctAnswer, setCorrectAnswer] = useState<number>(null);

    // problem timer works better with useRef since it has to quickly reset and hold value
    const problemTimer = useRef<number>(100);
    const [mainTimer, setMainTimer] = useState<number>(100);
    const [currentScore, setCurrentScore] = useState<number>(0);

    // Set up numbers and answers
    function pickRandomNumbers(range: number, operation: string | string[]): void {
        if (operation === 'division') {
            if (range > 12) {
                const divisor = Math.floor(Math.random() * 12 + 1);
                const dividend = divisor * Math.floor(Math.random() * 12 + 1);
                setNumberOne(dividend);
                setNumberTwo(divisor);
                setCorrectAnswer(dividend / divisor);
            }else {
                const divisor = range;
                const dividend = range * Math.floor(Math.random() * 12 + 1);
                setNumberOne(dividend);
                setNumberTwo(divisor);
                setCorrectAnswer(dividend / divisor);
            }
        } else {
            // if they are in the final level, its a mix of everything
            if (range > 12) {
                const randomOne = Math.floor(Math.random() * range);
                const randomTwo = Math.floor(Math.random() * 12 + 1);
                setNumberOne(randomOne);
                setNumberTwo(randomTwo);
                setCorrectAnswer(randomOne * randomTwo);
            } else {
                const randomOne = range;
                const randomTwo = Math.floor(Math.random() * 12 + 1);
                setNumberOne(randomOne);
                setNumberTwo(randomTwo);
                setCorrectAnswer(randomOne * randomTwo);
            }
        }
    }

    // Set initial values and focus on input EL
    useEffect(() => {
        pickRandomNumbers(numberRange, gameType);
        inputEl.current.focus();
    }, [])

    // Set timers. I needed to make a problemTrigger variable to change within the setTimeout
    // of the problem timer. The useRef would cause weird inconsistent renders if it was a 
    // dependecy on the useEffect. I just needed a variable to trigger every 100ms. 
    const [problemTrigger, setProblemTrigger] = useState<boolean>(false);
    useEffect(() => {
        problemTimerControl();
        mainTimerControl();
    }, [problemTrigger])


    // check to see if the user reponse is correct. 
    interface eventObj {
        preventDefault: Function
    }
    function assessResponse(e: eventObj): void {
        e.preventDefault();
        const userProduct = parseInt(userResponse);
        if (userProduct === correctAnswer) {
            playCorrectAnswer();
            addToScore();
            setUserResponse('');
            pickRandomNumbers(numberRange, gameType);
            problemTimer.current = 100;
        } else {
            playIncorrectAnswer();
            setUserResponse('')
        }
    }

    // problem timer function
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
            playProblemTimerExpired();
            problemTimer.current = 100;
            pickRandomNumbers(numberRange, gameType);
            problemTimerControl();
        }
    }

    // main timer function
    function mainTimerControl(): void {
        if (mainTimer === 0 || currentScore >= winningScore && numberRange <= 12) {
            endGame();
            stopMusic();
            setStopProblemTimer(true);
        } else {
            setTimeout(() => setMainTimer(mainTimer - 1), 1000);
        }
    }

    // Add points to their score
    function addToScore() {
        const pointValue = problemTimer.current * 5
        setCurrentScore(currentScore + pointValue)
    }

    const [gameHasEnded, setGameHasEnded] = useState<boolean>(false)
    const [passed, setPassed] = useState<boolean>(false)

    // // Update highscore if new highscore
    function updateHighscore() {
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
                numberRange > 12 ? obj.finalHighscore = currentScore : obj.highscore = currentScore;
                if (currentScore > winningScore) {
                    playPassedMission();
                    // high score remain high score if on last level. Or else rest to zero
                    numberRange > 12 ? obj.finalHighscore = currentScore : obj.highscore = 0;
                    const possiblePromotion = numberRange + 1
                    obj.level = Math.max(obj.level, possiblePromotion)
                    obj.level > 13 ? obj.level = 13 : obj.level = obj.level;
                    setPassed(true)
                }
                objectStore.put(obj)
            }
        }
    }

    function endGame(): void {
        // End Game function
        if (currentScore > highscore) {
            updateHighscore();
        } else {
            playFailedMission()
        }
        setGameHasEnded(true)
    }


    return (
        <main className={styles.mainQuiz}>
            {gameHasEnded &&
                <EndGameModal
                    passed={passed}
                    currentScore={currentScore}
                    gameType={gameType}
                    username={username}
                    numberRange={numberRange}
                    startGame={startGame}
                    setStartGame={setStartGame}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    winningScore={winningScore}
                />
            }
            <>
                <h1>{gameType}</h1>
                <Link href='/'>
                    <p className={`${styles2.hollowBtn} ${styles.quitBtn}`}
                        onClick={() => stopMusic()}
                    >Abort</p>
                </Link>
                <div className='flex-box-sa'>
                    <div>
                        <p className={styles.timerLabels} >Problem Timer<br /><span>{problemTimer.current}</span></p>
                    </div>
                    <div>
                        <p className={styles.timerLabels} >Timer<br /><span>{mainTimer}</span></p>
                    </div>
                </div>
                <div className={styles.currentProblem}>
                    <span id='number1'>{numberOne}</span>
                    {gameType === 'division' ?
                        <span>÷</span>
                        :
                        <span>x</span>
                    }
                    <span id='number2'>{numberTwo}</span>
                </div>
                <form onSubmit={(e) => assessResponse(e)}>
                    <input
                        type="text"
                        onChange={(e) => setUserResponse(e.target.value)}
                        value={userResponse}
                        ref={inputEl}
                    />
                </form>


                <div>
                    <progress id='file' value={currentScore} max='20000'></progress>

                    <div>
                        <div className={styles.numberPads}>
                            <div className='flex-box-sa'>
                                <p onClick={() => { setUserResponse(userResponse + '1'), playCalculatorClick() }} className={styles.numberPad}>1</p>
                                <p onClick={() => { setUserResponse(userResponse + '2'), playCalculatorClick() }} className={styles.numberPad}>2</p>
                                <p onClick={() => { setUserResponse(userResponse + '3'), playCalculatorClick() }} className={styles.numberPad}>3</p>
                            </div>
                            <div className='flex-box-sa'>
                                <p onClick={() => { setUserResponse(userResponse + '4'); playCalculatorClick() }} className={styles.numberPad}>4</p>
                                <p onClick={() => { setUserResponse(userResponse + '5'), playCalculatorClick() }} className={styles.numberPad}>5</p>
                                <p onClick={() => { setUserResponse(userResponse + '6'); playCalculatorClick() }} className={styles.numberPad}>6</p>
                            </div>
                            <div className='flex-box-sa'>
                                <p onClick={() => { setUserResponse(userResponse + '7'); playCalculatorClick() }} className={styles.numberPad}>7</p>
                                <p onClick={() => { setUserResponse(userResponse + '8'); playCalculatorClick() }} className={styles.numberPad}>8</p>
                                <p onClick={() => { setUserResponse(userResponse + '9'); playCalculatorClick() }} className={styles.numberPad}>9</p>
                            </div>
                            <div className='flex-box-sa'>
                                <p className={`${styles.numberPad} ${styles.deleteBtn}`} onClick={() => setUserResponse('')}>Clear</p>
                                <p onClick={() => { setUserResponse(userResponse + '0'); playCalculatorClick() }} className={`${styles.numberPad} ${styles.numberPadZero}`}>0</p>
                                <p className={`${styles.numberPad} ${styles.enterBtn}`} onClick={assessResponse}>Enter</p>
                            </div>
                        </div>
                        <hr />
                        <div className='flex-box-sa'>
                            <div>
                                <p className={styles.highScore}>Highscore<br /><span>
                                    {
                                        numberRange < 12 ?
                                            passedLevels > numberRange ?
                                                "passed"
                                                :
                                                highscore
                                            :
                                            finalHighscore > winningScore ?
                                
                                                `passed ${finalHighscore}`
                                                :
                                                finalHighscore
                                    }
                                </span></p>
                            </div>
                            <div>
                                <p className={styles.highScore}>Score<br /><span>{currentScore}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </main>
    )
}

export default MultiplicationQuiz;