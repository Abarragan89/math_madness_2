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
    setShowModal
}) {
    return (
        <>
            <section className={`${styles.modalContainer}`}>
                <div className={`${styles.endGameModal}`}>
                    {passed ?
                        <>
                            <h2>Mission Completed!</h2>
                            <h3>score: {currentScore}</h3>
                            <p onClick={() => {
                                setStartGame(false)
                                setShowModal(false)
                            }}
                                className='flex-box-se mainButton'
                            ><span>Lobby</span></p>
                        </>
                        :
                        <>
                            <h2>Try Again</h2>
                            <h3>score: {currentScore}</h3>
                            <progress id='file' value={currentScore} max='12000'></progress>
                            <div className='flex-box-se-wrap'>
                                <p onClick={() => {
                                    setStartGame(false)
                                    setShowModal(false)
                                }}
                                    className='mainButton mr-5 ml-5'
                                ><span>Lobby</span></p>
                                <Link href="#">
                                    <p onClick={() => {
                                        setStartGame(false)
                                        setShowModal(false)
                                    }}
                                        className='mainButton mr-5 ml-5'
                                    ><span>Train</span></p>

                                </Link>
                            </div>
                        </>
                    }
                </div>
            </section>
        </>
    )
}

export default EndGameModal;