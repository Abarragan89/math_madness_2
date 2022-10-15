import { useState } from 'react';
import Header from '../components/Header';
import styles from '../styles/chooseGame/chooseGame.module.css';
import { CgMathPlus } from 'react-icons/cg';
import { CgMathDivide } from 'react-icons/cg';
import { CgMathMinus } from 'react-icons/cg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles2 from '../styles/gameLobby/gameLobby.module.css';
import useSound from 'use-sound';



function ChooseGame() {
    // Set up Sound
    const [play] = useSound('/sounds/buttonClick.wav', {
        volume: .3
    })

    const router = useRouter();
    const { username, gameType } = router.query


    // const [modalTriggered, setModalTriggered] = useState<Boolean>(false)
    // const [gameType, setGameType] = useState<string>('')


    // function setupModal(operation: string): void {
    //     setModalTriggered(true)
    //     setGameType(operation)
    //     window.scrollTo(0, 0)
    // }


    return (
        <main className={styles2.lobbyMain}>
            <>
                <Header
                    text={`${username}'s Missions`}
                    inGame={false}
                />
                <Link href='/'><p onClick={() => play()} className={styles.hollowBtn}>Back</p></Link>

                <section className='flex-box-sa-wrap'>


                    <Link href={`/lobby?username=${username}&gameType=multiplication`}>
                        <h2 className={`${styles.gameOptionDiv} flex-box-sb mainButton`}>
                            <span className={`${styles.mathSymbols} ml-1 ${styles.multiplySymbol}`}>X</span>
                            <span>Multiplication</span>
                            <span className={`${styles.mathSymbols} mr-1 ${styles.multiplySymbol}`}>X</span>
                        </h2>
                    </Link>

                    <Link href={`/lobby?username=${username}&gameType=division`}>
                        <h2
                            className={`${styles.gameOptionDiv} flex-box-sb mainButton`}
                        >
                            <span><CgMathDivide className={styles.mathSymbols} /></span>
                            <span>Division</span>
                            <span><CgMathDivide className={styles.mathSymbols} /></span>
                        </h2>
                    </Link>
                </section>
                <section className='flex-box-sa-wrap'>
                    <Link href={`/lobby?username=${username}&gameType=addition`}>
                        <h2
                            className={`${styles.gameOptionDiv} flex-box-sb mainButton`}
                        >
                            <span><CgMathPlus className={styles.mathSymbols} /></span>
                            <span>Addition</span>
                            <span><CgMathPlus className={styles.mathSymbols} /></span>
                        </h2>
                    </Link>

                    <Link href={`/lobby?username=${username}&gameType=subtraction`}>
                        <h2
                            className={`${styles.gameOptionDiv} flex-box-sb mainButton`}
                        >
                            <span><CgMathMinus className={styles.mathSymbols} /></span>
                            <span>Subtraction</span>
                            <span><CgMathMinus className={styles.mathSymbols} /></span>
                        </h2>
                    </Link>
                </section>
            </>
        </main>
    )
}

export default ChooseGame