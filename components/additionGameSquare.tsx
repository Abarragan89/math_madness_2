import styles from '../styles/gameLobby/gameLobby.module.css';

function AdditionGameSquare({
    numberRange,
    onClick,
    disableBtn
}) {

    return (
        <>
            {!disableBtn ?
                <button
                    onClick={onClick}
                    className={`${styles.lobbySquare} ${styles.disabledSquare}`}
                    disabled
                >
                    <span>{`1 - ${numberRange}`}</span>
                </button>
                :
                <button
                    onClick={onClick}
                    className={`mainButton ${styles.lobbySquare}`}
                >
                    <span>{`1 - ${numberRange}`}</span>
                </button>

            }
        </>
    )
}

export default AdditionGameSquare;