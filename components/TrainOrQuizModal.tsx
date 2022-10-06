import { useState, useEffect } from 'react';
import AdditionQuiz from '../pages/additionQuiz';
import MultiplicationQuiz from '../pages/multiplicationQuiz';
import styles from '../styles/newGameModal/newGameModal.module.css';
import styles2 from '../styles/chooseGame/chooseGame.module.css';
import useSound from 'use-sound';
import GameOne from '../pages/gameOne';
import GameTwo from '../pages/gameTwo';
import GameThree from '../pages/gameThree';

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
    const [playThemeMusic, { stop: stopBattleThemeMusic }] = useSound('/sounds/gamePageMusic.mp3', {
        volume: .3
    })
    const [playProblemTimerExpired] = useSound('/sounds/problemTimerExpired.wav', {
        volume: .3
    });
    const [playLaserGun] = useSound('/sounds/laserGun.wav', {
        volume: .7
    });
    const [playAlienDestroyed] = useSound('/sounds/alienDestroyed.wav', {
        volume: .3
    });
    const [playGameOneTheme, {stop: stopGameOneTheme}] = useSound('/sounds/gameOneThemeMusic.mp3', {
        volume: .3
    });
    const [playGameTwoTheme, {stop: stopGameTwoTheme}] = useSound('/sounds/gameTwoThemeMusic.mp3', {
        volume: .3
    });
    //have back button trigger music off 
    window.addEventListener("popstate", () => {
        stopGameOneTheme();
        stopBattleThemeMusic();
        stopGameTwoTheme();
    })

    const [countingNumbers, setCountingNumbers] = useState<number>(null)
    const [train, setTrain] = useState<boolean>(false)
    const [playGameOne, setPlayGameOne] = useState<boolean>(false)
    const [playGameTwo, setPlayGameTwo] = useState<boolean>(false)
    const [playGameThree, setPlayGameThree] = useState<boolean>(false)
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
                                <div className={`flex-box-col-sa ${styles.trainingOptions}`}>
                                    <p onClick={() => {
                                        play();
                                        setPlayGameOne(true);
                                        setTrain(true);
                                        setStartCountdown(true);
                                        setStartGame(true);
                                        playGameOneTheme();
                                    }} className='mainButton  ml-5 mr-5'>
                                        <span>Alien Invasion</span>
                                    </p>
                                    <p onClick={() => {
                                        play();
                                        setPlayGameTwo(true);
                                        setTrain(true);
                                        setStartCountdown(true);
                                        setStartGame(true);
                                        playGameTwoTheme();
                                    }} className='mainButton  ml-5 mr-5'>
                                        <span>Space Race</span>
                                    </p>
                                    <p onClick={() => {
                                        play();
                                        setPlayGameThree(true);
                                        setTrain(true);
                                        setStartCountdown(true);
                                        setStartGame(true);
                                    }} className='mainButton  ml-5 mr-5'>
                                        <span>Coming Soon</span>
                                    </p>
                                </div>
                            <button
                                className={`${styles.btn} mt-5`}
                                onClick={() => {
                                    play();
                                    setStartCountdown(false)
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

                                <p onClick={() => {
                                    play();
                                    playThemeMusic();
                                    setStartGame(true);
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
                    playGameOne ?
                        <GameOne
                            // need to pass sounds as props so Browser allows play. Need user interaction
                            wrongAlien={playProblemTimerExpired}
                            laserSound={playLaserGun}
                            destroyAlien={playAlienDestroyed}
                            stopMusic={stopGameOneTheme}
                        />
                        :
                        playGameTwo ?
                            <GameTwo
                                wrongAlien={playProblemTimerExpired}
                                stopMusic={stopGameTwoTheme}
                                />
                            :
                        //     <GameThree
                        //     // need to pass sounds as props so Browser allows play. Need user interaction
                        //     wrongAlien={playProblemTimerExpired}
                        //     laserSound={playLaserGun}
                        //     destroyAlien={playAlienDestroyed}
                        //     stopMusic={stopGameOneTheme}
                        // />
                        <p>Coming Soon</p>
                    :
                    <>
                        {gameType === 'addition' &&
                            <AdditionQuiz
                                startGame={startGame}
                                setStartGame={setStartGame}
                                showModal={showModal}
                                setShowModal={setShowModal}
                                stopMusic={stopBattleThemeMusic}
                            />}
                        {gameType === 'subtraction' &&
                            <AdditionQuiz
                                startGame={startGame}
                                setStartGame={setStartGame}
                                showModal={showModal}
                                setShowModal={setShowModal}
                                stopMusic={stopBattleThemeMusic}
                            />}
                        {gameType === 'multiplication' &&
                            <MultiplicationQuiz
                                startGame={startGame}
                                setStartGame={setStartGame}
                                showModal={showModal}
                                setShowModal={setShowModal}
                                stopMusic={stopBattleThemeMusic}
                            />}
                        {gameType === 'division' &&
                            <MultiplicationQuiz
                                startGame={startGame}
                                setStartGame={setStartGame}
                                showModal={showModal}
                                setShowModal={setShowModal}
                                stopMusic={stopBattleThemeMusic}
                            />}
                    </>

            }
        </>
    )
}

export default TrainOrQuiz;
