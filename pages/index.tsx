import { useState } from 'react';
import Link from 'next/link';

import styles from '../styles/homePage/index.module.css';

function HomePage() {
    const [continueGame, setContinueGame] = useState(false)

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