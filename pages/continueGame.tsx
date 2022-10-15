import Head from 'next/head';
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
    const [deleteGameSound] = useSound('/sounds/deleteGame.wav', {
        volume: .4
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

    function deleteGame(e, username: string ) {
        // make sure the correct item was clicked so when we remove from UI, it removes the correct item through DOM traverse
        if (e.target.tagName === 'path') {
            // delete from database
            const indexedDB = window.indexedDB;
            const request = indexedDB.open('GameDatabase', 1);
            request.onsuccess = () => {
                const db = request.result
                const transaction = db.transaction('activeGames', 'readwrite')
                const objectStore = transaction.objectStore('activeGames')
                // target specific field for search
                const searchIndex = objectStore.index('player_name');
                searchIndex.get(username).onsuccess = function (event) {
                    const obj = ((event.target as IDBRequest).result);
                    objectStore.delete(obj.id)
                }
            }
            // remove from UI
            const divElement = e.target.parentNode.parentNode.parentNode
            divElement.style.display = 'none';
        }

    }
    function confirmDelete(e, username: string ) {
        const message = 'Are you sure you want to delete? This is irreversible.'
        const confirmation = confirm(message)
        if(confirmation) {
            deleteGameSound();
            deleteGame(e, username )
        }
    }

    return (
        <>
            <Head>
                <title>Active Missions</title>
            </Head>
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
                            </div>
                            <Link href={{
                                pathname: `/chooseGame`,
                                query: {
                                    username: data.name,
                                    gameType: data.games[index].operations
                                }
                            }}>
                                <h3
                                    onClick={() => play()}
                                ><FaPlay /></h3>
                            </Link>
                            <button>
                                <FaTrash onClick={(e) => confirmDelete(e, data.name)} />
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