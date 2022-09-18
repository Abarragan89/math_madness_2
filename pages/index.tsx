import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/homePage/index.module.css';
import { FaTrash } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';
import useSound from 'use-sound';
import homePageMusic from '../sounds/correctAnswer.wav';

function HomePage() {

    // Sound set up
    const [play, { stop }] = useSound(homePageMusic);



    const [continueGame, setContinueGame] = useState<boolean>(false)
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
            store.createIndex('player_name', 'name')
            store.createIndex('search_name', 'search_name', { unique: true })
            store.createIndex('operations', 'operations', { unique: false })
            store.createIndex('level', 'level', { unique: false })
            store.createIndex('highscore', 'highscore')
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
        alert('delete')
    }

    return (
        <main className={styles.homepageMain}>
            {!continueGame ?
                <>
                    <h1>Math Missions</h1>
    
                        <Image className={styles.homePageImage} src="/rocketShip.png" width="350px" height="250px" alt="spaceship blasting off into space"></Image> <br />
                    <Link href='/chooseGame' ><button className={`mainButton ${styles.homePageBtn}`}><span>New Adventure</span></button></Link> <br />
                    <button
                        className={`mainButton ${styles.homePageBtn}`}
                        onClick={() => {
                            setContinueGame(true)
                            play();
                        }}
                    ><span>Continue</span></button>
                </>
                :
                <>
                    <Header
                        text='Continue a Game'
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
                            <h3><FaPlay /></h3>
                        </Link>
                                <button onClick={deleteGame}>
                                    <FaTrash />
                                </button>
                        </div>
                    ))}
                    <button
                        className={`${styles.backBtn} mainButton`}
                        onClick={() => setContinueGame(false)}
                    ><span>Back</span></button>
                </>

            }
        </main>
    )
}

export default HomePage