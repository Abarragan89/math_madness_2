import { useEffect, useState, useRef } from 'react';

import styles from '../styles/quizStyles/quizStyles.module.css';

function TimeQuiz() {
    const inputEl = useRef(null)

    // set up all variables for numbers, answers, responses, and timers
    const [userResponse, setUserResponse] = useState<string>('')
    const [numberOne, setNumberOne] = useState<number>(null);
    const [numberTwo, setNumberTwo] = useState<number>(null);
    const [correctAnswer, setCorrectAnswer] = useState<number>(null)
    const [problemTimer, setProblemTimer] = useState<number>(100)
    const [mainTimer, setMainTimer] = useState<number>(10)
    const [currentScore, setCurrentScore] = useState<number>(0)
    const [highScore, setHighScore] = useState<number>(1921)


    function pickRandomNumbers(): void {
        const randomOne = Math.floor(Math.random() * 12 + 1);
        setNumberOne(randomOne);
        const randomTwo = Math.floor(Math.random() * 12 + 1);
        setNumberTwo(randomTwo);
        setCorrectAnswer(randomOne * randomTwo);
    }

    // Set initial values and focus on input EL
    useEffect(() => {
        pickRandomNumbers();
        inputEl.current.focus();
    }, [])

    // Set timers
    useEffect(() => {
        mainTimerControl();
        problemTimerControl();
    }, [problemTimer, mainTimer])

    interface eventObj {
        preventDefault: Function
    }
    // check to see if the user reponse is correct. 
    function assessResponse(e: eventObj): void {
        e.preventDefault();
        const userProduct = parseInt(userResponse);
        if (userProduct === correctAnswer) {
            setUserResponse('')
            pickRandomNumbers()
        } else {
            setUserResponse('')
        }
    }

    const [stopProblemTimer, setStopProblemTimer] = useState<boolean>(false)
    // problem timer function
    function problemTimerControl(): void {
        if (stopProblemTimer) {
            return;
        } else if (problemTimer > 0) {
            setTimeout(() => setProblemTimer(problemTimer - 1), 100);
        } else {
            setProblemTimer(100)
        }
    }

    // main timer function
    function mainTimerControl(): void {
        if (mainTimer <= 0) {
            setStopProblemTimer(true);
            endGame();
        } else {
            setTimeout(() => setMainTimer(mainTimer - 1), 1000);
        }
    }

    // Add points to their score
    function addToScore() {
        const pointValue = problemTimer * 5
        setCurrentScore()
    }


    // End Game function
    function endGame(): void {
        console.log('game over')
    }

    return (
        <main className={styles.mainQuiz}>
            <h1 onClick={() => setStopProblemTimer(true)}>Multiplication</h1>
            <div className='flex-box-sb'>
                <div>
                    <p className={styles.timerLabels} >Problem Timer<br /><span>{problemTimer}</span></p>
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
            <div className='flex-box-sb'>
                <div>
                    <p className={styles.timerLabels}>Highscore<br /><span>{highScore}</span></p>
                </div>
                <div>
                    <p className={styles.timerLabels}>Score<br /><span>{currentScore}</span></p>
                </div>
            </div>
        </main>
    )
}

export default TimeQuiz;