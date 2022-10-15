import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link'
import styles from '../styles/newGameModal/newGameModal.module.css';
import styles2 from '../styles/chooseGame/chooseGame.module.css';
import useSound from 'use-sound';

function NewGameModal({ modalTriggered, setModalTriggered }) {
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
            searchIndex.get(name).onsuccess = (event): void => {
                if ((event.target as IDBRequest).result) {
                    alert('Pick a unique name when picking a duplicate adventure.')
                    window.location.replace('/');
                    return;
                }
            }
            // Adding Data
            store.put({
                id: uuidv4(),
                name: name,
                games:
                    [{
                        operations: 'multiplication', level: 1,
                        highscore: 0,
                        finalHighscore: 0,
                        game1Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        game2Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        game3Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                    },
                    {
                        operations: 'division', level: 1,
                        highscore: 0,
                        finalHighscore: 0,
                        game1Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        game2Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        game3Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                    },
                    {
                        operations: 'addition', level: 1,
                        highscore: 0,
                        finalHighscore: 0,
                        game1Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        game2Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        game3Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                    },
                    {
                        operations: 'subtraction', level: 1,
                        highscore: 0,
                        finalHighscore: 0,
                        game1Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        game2Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        game3Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                    }
                    ]
            })
        }
    }

    return (
        <section className={`${styles.modalContainer}`}>
            <div>
                <h2>Enter Name</h2>
                <input
                    onChange={(e) => setUsername(e.target.value)}
                    type='text' /><br />

                <Link href={{
                    pathname: `/chooseGame`,
                    query: {
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