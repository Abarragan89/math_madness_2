import NewGameModal from '../components/NewGameModal';
import { useState } from 'react';
import Header from '../components/Header';
import styles from '../styles/chooseGame/chooseGame.module.css';
import styles2 from '../styles/homePage/index.module.css';
import { CgMathPlus } from 'react-icons/cg';
import { CgMathDivide } from 'react-icons/cg';
import { CgMathMinus } from 'react-icons/cg';
import Link from 'next/link';

function ChooseGame() {
    const [modalTriggered, setModalTriggered] = useState<Boolean>(false)
    const [gameType, setGameType] = useState<string>('')

    function setupModal(operation: string): void {
        setModalTriggered(true)
        setGameType(operation)
    }

    return (
        <>
            {modalTriggered &&
                <NewGameModal
                modalTriggered={modalTriggered}
                setModalTriggered={setModalTriggered}
                gameType={gameType}
                />
            }
            <main>
                <Header 
                text='Pick an Adventure'
                inGame={false}
                />
                <Link href='/'><p className={styles.hollowBtn}>Back</p></Link>
                <section className='flex-box-sa-wrap'>
                    <button onClick={() => setupModal('addition')} className={`${styles.gameOptionDiv} flex-box-sb mainButton`} >
                        <span><CgMathPlus className={styles.mathSymbols} /></span>
                        <span>Addition</span>
                        <span><CgMathPlus className={styles.mathSymbols} /></span>
                    </button>

                    <button onClick={() => setupModal('multiplication')} className={`${styles.gameOptionDiv} flex-box-sb mainButton`} >
                        <span className={`${styles.mathSymbols} ml-1 ${styles.multiplySymbol}`}>X</span>
                        <span>Multiplication</span>
                        <span className={`${styles.mathSymbols} mr-1 ${styles.multiplySymbol}`}>X</span>
                    </button>
                </section>
                <section className='flex-box-sa-wrap'>
                    <button onClick={() => setupModal('subtraction')} className={`${styles.gameOptionDiv} flex-box-sb mainButton`} >
                        <span><CgMathMinus className={styles.mathSymbols} /></span>
                        <span>Subtraction</span>
                        <span><CgMathMinus className={styles.mathSymbols} /></span>
                    </button>

                    <button onClick={() => setupModal('division')} className={`${styles.gameOptionDiv} flex-box-sb mainButton`} >
                        <span><CgMathDivide className={styles.mathSymbols} /></span>
                        <span>Division</span>
                        <span><CgMathDivide className={styles.mathSymbols} /></span>
                    </button>
                </section>
            </main >
        </>
    )
}

export default ChooseGame