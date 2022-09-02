import { useEffect, useState } from 'react';
import Link from 'next/link';

import styles from '../styles/homePage/index.module.css';

function HomePage() {
    const [continueGame, setContinueGame] = useState(false)

    // IndexDB setup
    let indexedDB;
    useEffect(() => {
        indexedDB = 
            window.indexedDB
            const request = indexedDB.open('GameDatabase', 1);
            request.onerror = function(event) {
        console.error('An error occurred saving your game.')
        console.error(event);
    }
    
    // Schema
    request.onupgradeneeded = function () {
        const db = request.result;
        const store = db.createObjectStore('activeGames', {keyPath: 'id'});
        store.createIndex('player_name', 'name', { unique: true } )
        store.createIndex('operations', 'operations', { unique: false })
        store.createIndex('level', 'level', { unique: false })
    }
} ,[])
    
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
                <div>continued games from local storage</div>
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