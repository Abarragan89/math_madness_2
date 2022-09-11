import EnterQuiz from './EnterQuiz';
import EnterTraining from './EnterTraining';
import styles from '../styles/newGameModal/newGameModal.module.css';
import Link from 'next/link';

function TrainOrQuiz({
    gameType,
    username,
    showModal,
    setShowModal,
    multiples
}) {
    return (
        <section className={`${styles.modalContainer}`}>
            <div className='flex-box-sa-wrap'>
            <h2>{gameType}: {multiples}</h2>
                <Link href={{
                    pathname: `/studyPage`,
                    query: {
                        username: username
                    }
                }}>
                    <div>
                        <EnterTraining
                        />
                    </div>
                </Link>

                <Link href={{
                    pathname: '/timeQuiz/',
                    query: {
                        username: username
                    }
                }}>
                    <div>
                        <EnterQuiz
                        />
                    </div>
                </Link>
            </div>
            <button className='mt-5' onClick={() => setShowModal(false)}>Back</button>
        </section>
    )
}

export default TrainOrQuiz;
