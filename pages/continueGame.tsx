import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Link from 'next/link';
import styles from '../styles/homePage/index.module.css';
import { FaTrash } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';
import useSound from 'use-sound';
function ContinueGame() {
    // Set up Sound
    const [play] = useSound('/sounds/buttonClick.wav', {
        volume: .3
    })
    const [activeGameData, setActiveGameData] = useState<object[]>(null)
    // IndexDB setup /////////////////////////
    useEffect(() => {
        const indexedDB = window.indexedDB
        const request = indexedDB.open('GameDatabase', 1);
        request.onerror = (event: object) => {
            console.error('An error occurred saving your game.')
            console.error(event);
        }

        // Schema
        request.onupgradeneeded = () => {
            const db = request.result;
            const store = db.createObjectStore('activeGames', { keyPath: 'id' });
            store.createIndex('player_name', 'name');
            store.createIndex('search_name', 'search_name', { unique: true });
            store.createIndex('operations', 'operations', { unique: false });
            store.createIndex('level', 'level', { unique: false });
            store.createIndex('highscore', 'highscore');
            store.createIndex('game1Highscore', ['game1Highscore']);
            store.createIndex('game2Highscore', ['game2Highscore']);
            store.createIndex('game3Highscore', ['game3Highscore']);
        }
        // query all the data to show in the continue
        request.onsuccess = () => {
            const db = request.result
            const transaction = db.transaction('activeGames', 'readwrite');
            const store = transaction.objectStore('activeGames');

            let data = store.getAll();
            data.onsuccess = (event) => {
                setActiveGameData((event.target as IDBRequest).result)
            }
        }
    }, [])

    function deleteGame() {
        console.log('delete')
    }

    return (
        <>
            {activeGameData &&
                <main className={styles.homepageMain}>
                    <Header
                        text='Active Missions'
                        inGame={false}
                    />
                    {activeGameData.map((data: any, index: number) => (
                        <div key={index} className={`${styles.continueGameDiv} flex-box-sb`}>
                            <div className={`${styles.gameInfoDiv} flex-box-sb-wrap`}>
                                <p>{data.name}</p>
                                <p>{data.operations}</p>
                                <p>Level: {data.level}</p>
                            </div>
                            <Link href={{
                                pathname: `/${data.operations}Lobby`,
                                query: {
                                    username: data.name,
                                    gameType: data.operations
                                }
                            }}>
                                <h3
                                    onClick={() => play()}
                                ><FaPlay /></h3>
                            </Link>
                            <button onClick={deleteGame}>
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                    <Link href='/'>
                        <button
                            className={`${styles} mainButton mb-5`}
                            onClick={() => play()}
                        ><span>Back</span></button>
                    </Link>
                </main>
            }
        </>
    )
}

export default ContinueGame