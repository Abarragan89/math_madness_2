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
                <Link href={{
                    pathname: `/studyPage`
                }}>
                    <p>
                        <EnterTraining
                        />
                    </p>
                </Link>

                <Link href={{
                    pathname: '/timeQuiz'
                }}>
                    <p>
                        <EnterQuiz
                        />
                    </p>
                </Link>
            </div>
            <button className='mt-5' onClick={() => setShowModal(false)}>Back</button>
        </section>
    )
}

export default TrainOrQuiz;
