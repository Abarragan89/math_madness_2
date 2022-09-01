import { useState } from 'react';
import Link from 'next/link'
import styles from '../styles/newGameModal/newGameModal.module.css';

function NewGameModal({ modalTriggered, setModalTriggered, gameType }) {

    const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
    const [username, setUsername] = useState<string>('');

    return (
        <section className={`${styles.modalContainer}`}>
            <div>
                <h2>{gameType}</h2>
                <input
                    onChange={(e) => setUsername(e.target.value)}
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
                <button className='mt-5' onClick={() => setModalTriggered(false)}>Back</button>
            </div>
        </section>
    )
}

export default NewGameModal