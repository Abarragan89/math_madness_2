import Link from 'next/link';
import AdditionQuiz from '../pages/additionQuiz';
import MultiplicationQuiz from '../pages/multiplicationQuiz';
import { useState } from 'react';
import styles from '../styles/newGameModal/newGameModal.module.css';



function TrainOrQuiz({
    gameType,
    username,
    showModal,
    setShowModal,
    numberRange
}) {

    const [startGame, setStartGame] = useState<boolean>(false)

    function countDown() {
        setTimeout(() => {
            setStartGame(true)
        }, 3000)
    }
    return (
        <>
            {!startGame ?
                <section className={`${styles.modalContainer}`}>
                    <div className='flex-box-sa-wrap'>
                        <h2>{gameType}: {numberRange}</h2>
                        <Link href={{
                            pathname: `/studyPage`,
                            query: {
                                username: username,
                                numberRange: numberRange,
                                gameType: gameType
                            },

                        }}>
                            <div>
                                <p>Train</p>
                            </div>
                        </Link>

                        {/* <Link href={{
                        pathname: `${gameType}Quiz`,
                        query: {
                            username: username,
                            gameType: gameType
                        }
                    }}>
                        <p>Quiz</p>
                    </Link> */}

                        <button onClick={countDown}>
                            <p>Quiz</p>
                        </button>
                    </div>
                    <button className='mt-5' onClick={() => setShowModal(false)}>Back</button>
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
                    {gameType === 'multiplication' && <MultiplicationQuiz
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
