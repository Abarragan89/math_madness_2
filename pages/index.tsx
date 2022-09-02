import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/homePage/index.module.css';

function HomePage() {
    const [continueGame, setContinueGame] = useState<boolean>(false)
    const [activeGameData, setActiveGameData] = useState<object[]>(null)

    // IndexDB setup /////////////////////////
    let indexedDB;
    useEffect(() => {
        indexedDB =
            window.indexedDB
        const request = indexedDB.open('GameDatabase', 1);
        request.onerror = (event: object) => {
            console.error('An error occurred saving your game.')
            console.error(event);
        }

        // Schema
        request.onupgradeneeded = () => {
            const db = request.result;
            const store = db.createObjectStore('activeGames', { keyPath: 'id' });
            store.createIndex('name', 'name', { unique: true })
            store.createIndex('operations', 'operations', { unique: false })
            store.createIndex('level', 'level', { unique: false })
        }
        // query all the data to show in the continue
        request.onsuccess = () => {
            const db = request.result
            const transaction = db.transaction('activeGames', 'readwrite');
            const store = transaction.objectStore('activeGames');

            let data = store.getAll();
            data.onsuccess = (event) => {
                setActiveGameData(event.target.result)
            }
        }
    }, [])
    console.log(activeGameData)

    return (
        <main className={styles.homepageMain}>
            <h1>Math Madness</h1>
            {!continueGame ?
                <>
                    <Link href='/chooseGame' ><button className='mainButton'><span>New Adventure</span></button></Link>
                    <h2>Or</h2>
                    <button
                        className='mainButton'
                        onClick={() => setContinueGame(true)}
                    ><span>Continue</span></button>
                </>
                :
                <>
                    {activeGameData.map((data: any, index:number) => (
                        <Link key={index} href={{
                            pathname: `/${data.operations}Lobby`,
                            query: {
                                username: data.name
                            }
                        }}>
                        <div>
                            <p>{data.name}</p>
                            <p>{data.operations}</p>
                            <p>{data.level}</p>
                        </div>

                        </Link>
                    ))}
                    <button
                        className='mainButton'
                        onClick={() => setContinueGame(false)}
                    ><span>Back</span></button>
                </>

            }
        </main>
    )
}

export default HomePage