import styles from '../styles/gameLobby/gameLobby.module.css';

function LobbyGameSquare({
    multiple,
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
                    {multiple > 12 ?
                        <span>Final Battle</span>
                        :
                        <span>{multiple}&apos;s</span>
                    }
                </button>
                :
                <button
                    onClick={onClick}
                    className={`mainButton ${styles.lobbySquare}`}
                >
                   {multiple > 12 ?
                        <span>Final Battle</span>
                        :
                        <span>{multiple}&apos;s</span>
                    }
                </button>

            }
        </>
    )
}

export default LobbyGameSquare;