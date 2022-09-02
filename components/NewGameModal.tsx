import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link'
import styles from '../styles/newGameModal/newGameModal.module.css';

function NewGameModal({ modalTriggered, setModalTriggered, gameType }) {
    const [username, setUsername] = useState<string>('');

    // save user data to indexedDB
    async function addNewUserGame(name: string) {
        const indexedDB = window.indexedDB;
        const request = indexedDB.open('GameDatabase', 1);

        // request.onerror = function(event) {
        //     console.error('An error occurred saving your game.')
        //     console.error(event)
        // }

        request.onsuccess = () => {
            const db = request.result
            const transaction = db.transaction('activeGames', 'readwrite');
            const store = transaction.objectStore('activeGames');
            // Adding Data
            store.add({ id: uuidv4(), name: name, operations: gameType, level: '1' })
            const idQuery = store.get(name)
            console.log(idQuery)
        }
    }

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
                        onClick={() => addNewUserGame(username)}
                        className='mainButton mt-5 mb-5'
                    ><span>Let&apos;s Go!</span></button>
                </Link><br />
                <button className='mt-5' onClick={() => setModalTriggered(false)}>Back</button>
            </div>
        </section>
    )
}

export default NewGameModal