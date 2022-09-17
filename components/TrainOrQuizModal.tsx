import Link from 'next/link';
import { useState, useEffect } from 'react';
import AdditionQuiz from '../pages/additionQuiz';
import MultiplicationQuiz from '../pages/multiplicationQuiz';
import styles from '../styles/newGameModal/newGameModal.module.css';
import styles2 from '../styles/chooseGame/chooseGame.module.css';

function TrainOrQuiz({
    gameType,
    username,
    showModal,
    setShowModal,
    numberRange,
    startGame,
    setStartGame
}) {

    const [countingNumbers, setCountingNumbers] = useState<number>(4)
    useEffect(() => {
        if (countingNumbers > 0) {
            setTimeout(() => {setCountingNumbers(countingNumbers - 1)}, 1000)
        }
    }, [countingNumbers])

    const [startCountdown, setStartCountdown] = useState<boolean>(false)
    function countDown() {
        setStartCountdown(true);
        setCountingNumbers(countingNumbers - 1)
        setTimeout(() => {
            setStartGame(true)
        }, 3000)
    }
    return (
        <>
            {!startGame ?
                startCountdown ?
                    <section className={`${styles.modalContainer}`}>
                        <div className={`${styles.trainOrQuizModal}`}>
                            <div className={styles.countDownNumbersDiv}>
                                <p>{countingNumbers}</p>
                            </div>
                        </div>
                    </section>
                    :
                    <section className={`${styles.modalContainer}`}>
                        <div className={`${styles.trainOrQuizModal}`}>
                            <h2>{gameType}: {numberRange}</h2>
                            <div className='flex-box-sa-wrap'>
                                <Link href={{
                                    pathname: `/studyPage`,
                                    query: {
                                        username: username,
                                        numberRange: numberRange,
                                        gameType: gameType
                                    },

                                }}>
                                    <p className='mainButton ml-5 mr-5'>
                                        <span>Train</span>
                                    </p>
                                </Link>
                                <p onClick={countDown} className='mainButton  ml-5 mr-5'>
                                    <span>Quiz</span>
                                </p>
                            </div>
                            <button className={styles.btn} onClick={() => setShowModal(false)}><p className={styles2.hollowBtn}>Back</p> </button>
                        </div>
                    </section>

                :
                <>
                    {gameType === 'addition' &&
                        <AdditionQuiz
                            startGame={startGame}
                            setStartGame={setStartGame}
                            showModal={showModal}
                            setShowModal={setShowModal}
                        />}
                    {gameType === 'subtraction' &&
                        <AdditionQuiz
                            startGame={startGame}
                            setStartGame={setStartGame}
                            showModal={showModal}
                            setShowModal={setShowModal}
                        />}
                    {gameType === 'multiplication' &&
                        <MultiplicationQuiz
                            startGame={startGame}
                            setStartGame={setStartGame}
                            showModal={showModal}
                            setShowModal={setShowModal}
                        />}
                    {gameType === 'division' &&
                        <MultiplicationQuiz
                            startGame={startGame}
                            setStartGame={setStartGame}
                            showModal={showModal}
                            setShowModal={setShowModal}
                        />}
                </>

            }
        </>
    )
}

export default TrainOrQuiz;
