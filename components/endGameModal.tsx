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
                <div>
                    {passed ?
                    <>
                        <h2>passed</h2>
                        <div className='flex-box-se'>
                        <p onClick={() =>{
                                setStartGame(false)
                                setShowModal(false)
                            } 
                            }>Lobby</p>
                            <p>Next Level</p>
                        </div>
                    </>
                        :
                        <>
                        <h2>Try Again</h2>
                        <h3>score: {currentScore}</h3>
                        <progress id='file' value={currentScore} max='12000'></progress>
                        <div className='flex-box-se'>
                            <p onClick={() =>{
                                setStartGame(false)
                                setShowModal(false)
                            } 
                            }>Lobby</p>
                            <Link href="#">Train</Link>
                        </div>
                    </>
                    }
                </div>
            </section>
        </>
    )
}

export default EndGameModal;