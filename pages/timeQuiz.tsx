import { useEffect, useState, useRef } from 'react';

import styles from '../styles/quizStyles/quizStyles.module.css';

function TimeQuiz() {
    const inputEl = useRef(null)

    const [userResponse, setUserResponse] = useState<string>('')
    const [numberOne, setNumberOne] = useState<number>(null);
    const [numberTwo, setNumberTwo] = useState<number>(null);
    const [correctAnswer, setCorrectAnswer] = useState<number>(null)

    function pickRandomNumbers (): void {
        const randomOne = Math.floor(Math.random() * 12 + 1);
        setNumberOne(randomOne);
        const randomTwo = Math.floor(Math.random() * 12 + 1);
        setNumberTwo(randomTwo);
        setCorrectAnswer(randomOne * randomTwo);
    }

    useEffect(() => {
        pickRandomNumbers();
        inputEl.current.focus();
    }, [])

    interface eventObj {
        preventDefault: Function
    }
    function assessResponse(e: eventObj): void {
        e.preventDefault();
        const userProduct = parseInt(userResponse);
        console.log('user response', userProduct)
        console.log('actual answer', correctAnswer)
        if (userProduct === correctAnswer) {
            console.log('correct!')
            setUserResponse('')
            pickRandomNumbers()
        } else {
            setUserResponse('')
            console.log('incorrect')
        }
    }

    return (
        <main className={styles.mainQuiz}>
            <h1>Multiplication</h1>
            <div className='flex-box-sb'>
                <p>Problem Timer:<span id='problem_timer'>10</span></p>
                <p>Timer:<span id='main_timer'>30</span></p>
            </div>
            <div className={styles.currentProblem}>
                <span id='number1'>{numberOne}</span>
                <span>x</span>
                <span id='number2'>{numberTwo}</span>
            </div>
            <form onSubmit={(e) => assessResponse(e)}>
                <input 
                type="number" 
                onChange={(e) => setUserResponse(e.target.value)} 
                value={userResponse} 
                ref={inputEl}
                />
            </form>
            <div className={styles.numberPads}>
                <div className='flex-box-sa'>
                    <p onClick={() =>setUserResponse(userResponse + '1')} className={styles.numberPad}>1</p>
                    <p onClick={() =>setUserResponse(userResponse + '2')} className={styles.numberPad}>2</p>
                    <p onClick={() =>setUserResponse(userResponse + '3')} className={styles.numberPad}>3</p>
                </div>
                <div className='flex-box-sa'>
                    <p onClick={() =>setUserResponse(userResponse + '4')} className={styles.numberPad}>4</p>
                    <p onClick={() =>setUserResponse(userResponse + '5')} className={styles.numberPad}>5</p>
                    <p onClick={() =>setUserResponse(userResponse + '6')} className={styles.numberPad}>6</p>
                </div>
                <div className='flex-box-sa'>
                    <p onClick={() =>setUserResponse(userResponse + '7')} className={styles.numberPad}>7</p>
                    <p onClick={() =>setUserResponse(userResponse + '8')} className={styles.numberPad}>8</p>
                    <p onClick={() =>setUserResponse(userResponse + '9')} className={styles.numberPad}>9</p>
                </div>
                <div className='flex-box-sa'>
                    <p onClick={() =>setUserResponse('')}>Delete</p>
                    <p onClick={() =>setUserResponse(userResponse + '0')} className={`${styles.numberPad} ${styles.numberPadZero}`}>0</p>
                    <p onClick={assessResponse}>Enter</p>
                </div>
            </div>
        </main>
    )
}

export default TimeQuiz;

//build quiz. 