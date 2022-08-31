import styles from '../styles/newGameModal/newGameModal.module.css';

function NewGameModal({ modalTriggered, setModalTriggered, gameType }) {

    function startNewGame():void {

    }

    return (
        <section className={`${styles.modalContainer}`}>
            <div>
                <h2>{gameType}</h2>
                <input type='text' /><br />
                <button className='mainButton mt-5 mb-5'><span>Let&apos;s Go!</span></button><br />
                <button className='mt-5' onClick={() => setModalTriggered(false)}>Back</button>
            </div>
        </section>
    )
}

export default NewGameModal