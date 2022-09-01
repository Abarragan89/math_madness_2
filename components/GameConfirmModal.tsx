import styles from '../styles/newGameModal/newGameModal.module.css';
import Link from 'next/link';

function GameConfirmModal({gameType, username, showModal, setShowModal}) {
    return(
        <section className={`${styles.modalContainer}`}>
        <div>
            <h2>{gameType}</h2>
            <input
                type='text'
                placeholder='Enter Name' /><br />

            <Link href={{
                pathname: `/${gameType}Lobby`,
                query: {
                    gameType,
                    username,
                }
            }}>
                <button
                    type='submit'
                    className='mainButton mt-5 mb-5'
                ><span>Let&apos;s Go!</span></button>
            </Link><br />
            <button className='mt-5' onClick={() => setShowModal(false)}>Back</button>
        </div>
    </section>
    )
}

export default GameConfirmModal;