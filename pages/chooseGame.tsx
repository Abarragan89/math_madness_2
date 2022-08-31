import styles from '../styles/chooseGame/chooseGame.module.css';
import { CgMathPlus } from 'react-icons/cg';
import { CgMathDivide } from 'react-icons/cg';
import { CgMathMinus } from 'react-icons/cg';

function ChooseGame() {
    return (
        <main>
            <h1 className='sectionHeading'>Pick an Adventure</h1>

            <section className='flex-box-sa-wrap'>
                <button className={`${styles.gameOptionDiv} flex-box-sb mainButton`} >
                    <span><CgMathPlus className={styles.mathSymbols} /></span>
                    <span>Addition Adventure</span>
                    <span><CgMathPlus className={styles.mathSymbols} /></span>
                </button>

                <button className={`${styles.gameOptionDiv} flex-box-sb mainButton`} >
                    <span className={`${styles.mathSymbols} ml-1 ${styles.multiplySymbol}`}>X</span>
                    <span>Multiplication Mission</span>
                    <span className={`${styles.mathSymbols} mr-1 ${styles.multiplySymbol}`}>X</span>
                </button>
            </section>
            <section className='flex-box-sa-wrap'>
                <button className={`${styles.gameOptionDiv} flex-box-sb mainButton`} >
                    <span><CgMathMinus className={styles.mathSymbols} /></span>
                    <span>Subtraction Safari</span>
                    <span><CgMathMinus className={styles.mathSymbols} /></span>
                </button>

                <button className={`${styles.gameOptionDiv} flex-box-sb mainButton`} >
                    <span><CgMathDivide className={styles.mathSymbols} /></span>
                    <span>Division Duty</span>
                    <span><CgMathDivide className={styles.mathSymbols} /></span>
                </button>
            </section>
        </main>
    )
}

export default ChooseGame