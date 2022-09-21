import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link'
import styles from '../styles/newGameModal/newGameModal.module.css';
import styles2 from '../styles/chooseGame/chooseGame.module.css';
import useSound from 'use-sound';

function NewGameModal({ modalTriggered, setModalTriggered, gameType }) {
    // Set up Sound
    const [play] = useSound('/sounds/buttonClick.wav', {
        volume: .3
    })
    const [username, setUsername] = useState<string>('');

    // save user data to indexedDB
    async function addNewUserGame(name: string) {
        const indexedDB = window.indexedDB;
        const request = indexedDB.open('GameDatabase', 1);

        request.onerror = function (event) {
            console.error('An error occurred saving your game.')
            console.error(event)
        }

        request.onsuccess = () => {
            const db = request.result
            const transaction = db.transaction('activeGames', 'readwrite');
            const store = transaction.objectStore('activeGames');

            // check to see if name already exists
            const searchIndex = store.index('search_name');
            searchIndex.get(name + gameType[0]).onsuccess = (event): void => {
                if ((event.target as IDBRequest).result) {
                    alert('Pick a unique name when picking a duplicate adventure.')
                    window.location.replace('/');
                    return;
                }
            }
            // Adding Data
            store.add({ id: uuidv4(), name: name, search_name: name + gameType[0], operations: gameType, level: 1, highscore: 0, finalHighscore: 0 })
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
                        onClick={() => {
                            addNewUserGame(username);
                            play();
                        }}
                        className='mainButton mt-5 mb-5'
                    ><span>Let&apos;s Go!</span></button>
                </Link><br />
                <button 
                className={styles.btn} 
                onClick={() => {
                    setModalTriggered(false);
                    play();
                }}
                ><p className={styles2.hollowBtn}>Back</p></button>
            </div>
        </section>
    )
}

export default NewGameModal