import { useEffect, useState, useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import EndGameModal from '../components/endGameModal';
import { AppContext } from '../AppContext';
import styles from '../styles/quizStyles/quizStyles.module.css';

function TimeQuiz() {
    
    // Data from Context API
    const { numberRange } = useContext(AppContext)
    console.log(numberRange)

    // Get Data from IndexedDB
    const [highscore, setHighscore] = useState<number>(null)
    // get username from URL to query in IndexedDB
    const router = useRouter();
    const { username, gameType } = router.query
    const [passedLevels, setPassedLevels] = useState<number>(null)
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
                const searchIndex = objectStore.index('player_name');
                searchIndex.get(username).onsuccess = function (event) {
                    setPassedLevels((event.target as IDBRequest).result.level)
                    setHighscore((event.target as IDBRequest).result.highscore)
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
    const [mainTimer, setMainTimer] = useState<number>(10);
    const [currentScore, setCurrentScore] = useState<number>(0);

    // Set up numbers and answers
    function pickRandomNumbers(range): void {
        const randomOne = Math.floor(Math.random() * range + 1);
        setNumberOne(randomOne);
        const randomTwo = Math.floor(Math.random() * 12 + 1);
        setNumberTwo(randomTwo);
        setCorrectAnswer(randomOne * randomTwo);
    }

    // Set initial values and focus on input EL
    useEffect(() => {
        pickRandomNumbers(numberRange);
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
            addToScore();
            setUserResponse('');
            pickRandomNumbers(numberRange);
            problemTimer.current = 100;
        } else {
            setUserResponse('')
        }
    }

    // problem timer function
    const [stopProblemTimer, setStopProblemTimer] = useState<boolean>(false)
    function problemTimerControl(reset: string = ''): void {
        if (stopProblemTimer) {
            return;
        } else if (problemTimer.current > 0) {
            setTimeout(() => {
                setProblemTrigger(!problemTrigger)
                problemTimer.current--
            }, 100)
        } else {
            problemTimer.current = 100;
            pickRandomNumbers(numberRange);
            problemTimerControl();
        }
    }

    // main timer function
    function mainTimerControl(): void {
        if (mainTimer === 0) {
            setStopProblemTimer(true);
            endGame();
        } else {
            setTimeout(() => setMainTimer(mainTimer - 1), 1000);
        }
    }

    // Add points to their score
    function addToScore() {
        const pointValue = problemTimer.current * 5
        setCurrentScore(currentScore + pointValue)
    }

    // // Update highscore if new highscore
    function updateHighscore() {
        const indexedDB = window.indexedDB;
        const request = indexedDB.open('GameDatabase', 1);
        request.onsuccess = () => {
            const db = request.result
            const transaction = db.transaction('activeGames', 'readwrite')
            const objectStore = transaction.objectStore('activeGames')
            // target specific field for search
            const searchIndex = objectStore.index('player_name');
            searchIndex.get(username).onsuccess = function (event) {
                const obj = ((event.target as IDBRequest).result);
                obj.highscore = currentScore;
                if (currentScore > 802) {
                    obj.highscore = 0;
                    const possiblePromotion = numberRange + 1
                    obj.level = Math.max(obj.level, possiblePromotion)
                    setPassed(true)
                }
                objectStore.put(obj)
            }
        }
    }

    // End Game function
    function endGame(): void {
        if (currentScore > highscore) {
            updateHighscore();
        }
        setGameHasEnded(true)
    }
    
    const [gameHasEnded, setGameHasEnded] = useState<boolean>(false)
    const [passed, setPassed] = useState<boolean>(false)
    
    return (
        <>
            {gameHasEnded &&
                <EndGameModal
                passed={passed}
                currentScore={currentScore}
                gameType={gameType}
                username={username}
                />
            }
            <main className={styles.mainQuiz}>
                <h1 onClick={() => setStopProblemTimer(true)}>Multiplication</h1>
                <div className='flex-box-sb'>
                    <div>
                        <p className={styles.timerLabels} >Problem Timer<br /><span>{problemTimer.current}</span></p>
                    </div>
                    <div>
                        <p className={styles.timerLabels} >Timer<br /><span>{mainTimer}</span></p>
                    </div>
                </div>
                <div className={styles.currentProblem}>
                    <span id='number1'>{numberOne}</span>
                    <span>x</span>
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

                <progress id='file' value={currentScore} max='12000'></progress>


                <div className={styles.numberPads}>
                    <div className='flex-box-sa'>
                        <p onClick={() => setUserResponse(userResponse + '1')} className={styles.numberPad}>1</p>
                        <p onClick={() => setUserResponse(userResponse + '2')} className={styles.numberPad}>2</p>
                        <p onClick={() => setUserResponse(userResponse + '3')} className={styles.numberPad}>3</p>
                    </div>
                    <div className='flex-box-sa'>
                        <p onClick={() => setUserResponse(userResponse + '4')} className={styles.numberPad}>4</p>
                        <p onClick={() => setUserResponse(userResponse + '5')} className={styles.numberPad}>5</p>
                        <p onClick={() => setUserResponse(userResponse + '6')} className={styles.numberPad}>6</p>
                    </div>
                    <div className='flex-box-sa'>
                        <p onClick={() => setUserResponse(userResponse + '7')} className={styles.numberPad}>7</p>
                        <p onClick={() => setUserResponse(userResponse + '8')} className={styles.numberPad}>8</p>
                        <p onClick={() => setUserResponse(userResponse + '9')} className={styles.numberPad}>9</p>
                    </div>
                    <div className='flex-box-sa'>
                        <p onClick={() => setUserResponse('')}>Delete</p>
                        <p onClick={() => setUserResponse(userResponse + '0')} className={`${styles.numberPad} ${styles.numberPadZero}`}>0</p>
                        <p onClick={assessResponse}>Enter</p>
                    </div>
                </div>
                <hr />
                <div className='flex-box-sb'>
                    <div>
                        <p className={styles.timerLabels}>Highscore<br /><span>
                            {
                                passedLevels > numberRange ?
                                    "passed"
                                    :
                                    highscore
                            }
                        </span></p>
                    </div>
                    <div>
                        <p className={styles.timerLabels}>Score<br /><span>{currentScore}</span></p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default TimeQuiz;