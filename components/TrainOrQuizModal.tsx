import TimeQuiz from '../pages/timeQuiz';
import styles from '../styles/newGameModal/newGameModal.module.css';
import Link from 'next/link';



function TrainOrQuiz({
    gameType,
    username,
    showModal,
    setShowModal,
    numberRange
}) {
    return (
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

                <Link href={{
                    pathname: '/timeQuiz/',
                    query: {
                        username: username,
                        gameType: gameType
                    }
                }}>
                    <p>Quiz</p>
                </Link>
            </div>
            <button className='mt-5' onClick={() => setShowModal(false)}>Back</button>
        </section>
    )
}

export default TrainOrQuiz;
