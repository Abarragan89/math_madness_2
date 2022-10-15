import Header from '../components/Header';
import styles from '../styles/chooseGame/chooseGame.module.css';
import { CgMathPlus } from 'react-icons/cg';
import { CgMathDivide } from 'react-icons/cg';
import { CgMathMinus } from 'react-icons/cg';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles2 from '../styles/gameLobby/gameLobby.module.css';
import useSound from 'use-sound';

function ChooseGame() {
    // Set up Sound
    const [play] = useSound('/sounds/buttonClick.wav', {
        volume: .3
    })

    const [playerData, setPlayerData] = useState(null)

    const router = useRouter();
    const { username } = router.query

    useEffect(() => {
        if (username) {
            const indexedDB = window.indexedDB;
            const request = indexedDB.open('GameDatabase', 1);

            request.onsuccess = () => {
                const db = request.result
                const transaction = db.transaction('activeGames', 'readonly')
                    .objectStore('activeGames')
                    .index('player_name');
                const keyRange = IDBKeyRange.only(username);

                // Set up the request query
                const cursorRequest = transaction.openCursor(keyRange);
                cursorRequest.onsuccess = (event: any) => {
                    setPlayerData(event.target.result.value)
                }
            }
        }
    }, [username])

    return (
        <>
            {playerData &&
                <main className={styles2.lobbyMain}>
                    <>
                        <Header
                            text={`${username}'s Missions`}
                            inGame={false}
                        />
                        <Link href='/'><p onClick={() => play()} className={styles.hollowBtn}>Back</p></Link>

                        <section className='flex-box-sa-wrap'>


                            <Link href={`/lobby?username=${username}&gameType=multiplication`}>
                                <h2 onClick={() => play()} className={`${styles.gameOptionDiv} flex-box-sb mainButton`}>
                                    <span className={`${styles.mathSymbols} ml-1 ${styles.multiplySymbol}`}>X</span>
                                    <span>Multiplication<p>Level: {playerData.games[0].level} </p></span>
                                    <span className={`${styles.mathSymbols} mr-1 ${styles.multiplySymbol}`}>X</span>
                                </h2>
                            </Link>

                            <Link href={`/lobby?username=${username}&gameType=division`}>
                                <h2 onClick={() => play()} 
                                    className={`${styles.gameOptionDiv} flex-box-sb mainButton`}
                                >
                                    <span><CgMathDivide className={styles.mathSymbols} /></span>
                                    <span>Division<p>Level: {playerData.games[1].level} </p></span>
                                    <span><CgMathDivide className={styles.mathSymbols} /></span>
                                </h2>
                            </Link>
                        </section>
                        <section className='flex-box-sa-wrap'>
                            <Link href={`/lobby?username=${username}&gameType=addition`}>
                                <h2 onClick={() => play()} 
                                    className={`${styles.gameOptionDiv} flex-box-sb mainButton`}
                                >
                                    <span><CgMathPlus className={styles.mathSymbols} /></span>
                                    <span>Addition<p>Level: {playerData.games[2].level} </p></span>
                                    <span><CgMathPlus className={styles.mathSymbols} /></span>
                                </h2>
                            </Link>

                            <Link href={`/lobby?username=${username}&gameType=subtraction`}>
                                <h2 onClick={() => play()} 
                                    className={`${styles.gameOptionDiv} flex-box-sb mainButton`}
                                >
                                    <span><CgMathMinus className={styles.mathSymbols} /></span>
                                    <span>Subtraction<p>Level: {playerData.games[3].level} </p></span>
                                    <span><CgMathMinus className={styles.mathSymbols} /></span>
                                </h2>
                            </Link>
                        </section>
                    </>
                </main>
            }
        </>
    )
}

export default ChooseGame