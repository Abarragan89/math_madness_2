import { useState, useEffect } from 'react';
import AdditionQuiz from '../pages/additionQuiz';
import MultiplicationQuiz from '../pages/multiplicationQuiz';
import styles from '../styles/newGameModal/newGameModal.module.css';
import styles2 from '../styles/chooseGame/chooseGame.module.css';
import useSound from 'use-sound';
import GameOne from '../pages/gameOne';

function TrainOrQuiz({
    gameType,
    username,
    showModal,
    setShowModal,
    numberRange,
    startGame,
    setStartGame
}) {
    // Set up Sound
    const [play] = useSound('/sounds/buttonClick.wav', {
        volume: .3
    })
    const [playThemeMusic, { stop }] = useSound('/sounds/gamePageMusic.mp3', {
        volume: .5
    })
    //have back button trigger music off 
    window.addEventListener("popstate", () => stop())

    const [countingNumbers, setCountingNumbers] = useState<number>(null)
    const [train, setTrain] = useState<boolean>(false)
    useEffect(() => {
        setCountingNumbers(4)
    }, [])
    useEffect(() => {
        if (countingNumbers > 0 && startCountdown) {
            setTimeout(() => { setCountingNumbers(countingNumbers - 1) }, 1000)
        }
    }, [countingNumbers])

    const [startCountdown, setStartCountdown] = useState<boolean>(false)
    return (
        <>
            {!startGame ?
                startCountdown ?
                    <section className={`${styles.modalContainer}`}>
                        <div className={`${styles.trainOrQuizModal}`}>
                            <h2>{gameType}: {numberRange}</h2>
                            <p onClick={() => {
                                play();
                                playThemeMusic();
                                setStartGame(true)
                            }} className={`mainButton  ml-5 mr-5 ${styles.startButton}`}>
                                <span>Start</span>
                            </p>
                            <button
                                className={`${styles.btn} mt-5`}
                                onClick={() => {
                                    setStartCountdown(false)
                                    play();
                                }}><p
                                    className={styles2.hollowBtn}
                                >Back</p> </button>
                        </div>
                    </section>
                    :
                    <section className={`${styles.modalContainer}`}>
                        <div className={`${styles.trainOrQuizModal}`}>
                            <h2>{gameType}: {numberRange}</h2>
                            <div className='flex-box-sa-wrap'>
                                <p onClick={() => {
                                    play();
                                    setTrain(true);
                                    setStartCountdown(true);
                                }} className='mainButton  ml-5 mr-5'>
                                    <span>Train</span>
                                </p>

                                {/* Start game */}
                                <p onClick={() => {
                                    play();
                                    setStartCountdown(true)
                                    }} className='mainButton  ml-5 mr-5'>
                                    <span>Battle</span>
                                </p>
                            </div>
                            <button
                                className={styles.btn}
                                onClick={() => {
                                    setShowModal(false)
                                    play();
                                }}><p
                                    className={styles2.hollowBtn}
                                >Back</p> </button>
                        </div>
                    </section>

                :

                train ?
                    <GameOne />
                    :
                    <>
                        {gameType === 'addition' &&
                            <AdditionQuiz
                                startGame={startGame}
                                setStartGame={setStartGame}
                                showModal={showModal}
                                setShowModal={setShowModal}
                                stopMusic={stop}
                            />}
                        {gameType === 'subtraction' &&
                            <AdditionQuiz
                                startGame={startGame}
                                setStartGame={setStartGame}
                                showModal={showModal}
                                setShowModal={setShowModal}
                                stopMusic={stop}
                            />}
                        {gameType === 'multiplication' &&
                            <MultiplicationQuiz
                                startGame={startGame}
                                setStartGame={setStartGame}
                                showModal={showModal}
                                setShowModal={setShowModal}
                                stopMusic={stop}
                            />}
                        {gameType === 'division' &&
                            <MultiplicationQuiz
                                startGame={startGame}
                                setStartGame={setStartGame}
                                showModal={showModal}
                                setShowModal={setShowModal}
                                stopMusic={stop}
                            />}
                    </>

            }
        </>
    )
}

export default TrainOrQuiz;
