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
    const [playCountdown] = useSound('/sounds/startCountdown.wav', {
        volume: .5
    })
    const [playThemeMusic, { stop, pause }] = useSound('/sounds/gamePageMusic.mp3', {
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
    function countDown() {
        playCountdown();
        setStartCountdown(true);
        setCountingNumbers(countingNumbers - 1)
        setTimeout(() => {
            playThemeMusic();
            
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
                                <p onClick={() => {
                                    setTrain(true);
                                    countDown();
                                }} className='mainButton  ml-5 mr-5'>
                                    <span>Train</span>
                                </p>

                                {/* Start game */}
                                <p onClick={countDown} className='mainButton  ml-5 mr-5'>
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
