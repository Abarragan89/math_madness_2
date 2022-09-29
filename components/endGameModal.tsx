import styles from '../styles/newGameModal/newGameModal.module.css';
import Link from 'next/link';

function EndGameModal({
    passed,
    currentScore,
    gameType,
    username,
    startGame,
    numberRange,
    setStartGame,
    showModal,
    setShowModal,
    winningScore
}) {
    return (
        <>
            <section className={`${styles.modalContainer}`}>
                <div className={`${styles.endGameModal}`}>
                    {passed ?
                        <>
                            <h2>Mission Completed!</h2>
                            <p onClick={() => {
                                setStartGame(false)
                                setShowModal(false)
                            }}
                                className='flex-box-se mainButton'
                            ><span>Lobby</span></p>
                        </>
                        :
                        <>
                            <h2>Mission Failed.</h2>
                            <h3>score: {currentScore}</h3>
                            <progress id='file' value={currentScore} max={winningScore}></progress>
                            <div className='flex-box-se-wrap'>
                                <p onClick={() => {
                                    setStartGame(false)
                                    setShowModal(false)
                                }}
                                    className='mainButton mr-5 ml-5'
                                ><span>Lobby</span></p>
                            </div>
                        </>
                    }
                </div>
            </section>
        </>
    )
}

export default EndGameModal;