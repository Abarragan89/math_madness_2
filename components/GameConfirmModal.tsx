import styles from '../styles/newGameModal/newGameModal.module.css';
import Link from 'next/link';

function GameConfirmModal({
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
                    pathname: `/timeQuiz`
                }}>
                    <button
                        type='submit'
                        className='mainButton mt-5 mb-5'
                    ><span>{multiples}</span></button>
                </Link>

                <Link href={{
                    pathname: '/timeQuiz'
                }}>
                
                <button
                        type='submit'
                        className='mainButton mt-5 mb-5'
                    ><span>{multiples}</span></button>
                </Link>
            </div>
            <button className='mt-5' onClick={() => setShowModal(false)}>Back</button>
        </section>
    )
}

export default GameConfirmModal;