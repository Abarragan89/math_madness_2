import Head from 'next/head';
import { useEffect  } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/homePage/index.module.css';
import useSound from 'use-sound';


function HomePage() {
    const [play] = useSound('/sounds/buttonClick.wav', {
        volume: .3
    })
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
    }, [])

    return (
        <>
            <Head>
                <title>Math Fact Missions</title>
            </Head>
            <main className={styles.homepageMain}>
                <h1>Math Fact Missions</h1>
                <Image className={styles.homePageImage} src="/rocketShip.png" width="350px" height="250px" alt="spaceship blasting off into space"></Image> <br />
                <Link href='/chooseGame' >
                    <button className={`mainButton ${styles.homePageBtn}`}
                        onClick={() => play()}
                    ><span>New Adventure</span></button>
                </Link><br />
                <Link href='/continueGame'>
                    <button
                        className={`mainButton ${styles.homePageBtn}`}
                        onClick={() => play()}
                    ><span>Continue</span></button>
                </Link>
            </main>
        </>
    )
}

export default HomePage