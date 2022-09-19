import LobbyGameSquare from '../components/LobbyGameSquare';
import TrainOrQuiz from '../components/TrainOrQuizModal';
import styles from '../styles/gameLobby/gameLobby.module.css';
import Header from '../components/Header';
import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import styles2 from '../styles/chooseGame/chooseGame.module.css';
import { AppContext } from '../AppContext';
import Link from 'next/link';

function MultiplicationLobby() {
    // Number range from Context API
    const { numberRange, setNumberRange } = useContext(AppContext)

    // Data form URL
    const router = useRouter();
    const { username, gameType } = router.query

    // need to make an array of 12 to map the squares in the Lobby 12 times
    const [numberOfSquares] = useState<number[]>(Array.from(Array(12).keys()));
    const [showModal, setShowModal] = useState<boolean>(false);
    const [startGame, setStartGame] = useState<boolean>(false)

    // get user Data from indexedDB
    interface playerDataObject {
        id: string,
        level: string,
        name: string,
        operations: string
    }
    const [playerData, setPlayerData] = useState<playerDataObject>(null)

    // retrieve data from database to show appropriate amount of squares
    useEffect(() => {
        if (username) {
            const indexedDB = window.indexedDB;
            const request = indexedDB.open('GameDatabase', 1);

            request.onsuccess = () => {
                const db = request.result
                const transaction = db.transaction('activeGames', 'readonly')
                    .objectStore('activeGames')
                    .index('search_name');
                const keyRange = IDBKeyRange.only(username + gameType[0]);

                // Set up the request query
                const cursorRequest = transaction.openCursor(keyRange);
                cursorRequest.onsuccess = (event: any) => {
                    setPlayerData(event.target.result.value)
                }
            }
        }
    }, [username, startGame])

    return (
        <main className={styles.lobbyMain}>
            {playerData &&
                <div >
                    {showModal &&
                        <TrainOrQuiz
                            gameType={playerData.operations}
                            username={username}
                            showModal={showModal}
                            setShowModal={setShowModal}
                            numberRange={numberRange}
                            startGame={startGame}
                            setStartGame={setStartGame}
                        />
                    }
                    {!startGame &&
                            <>
                                <Header 
                                text={`${username}'s ${gameType}`}
                                inGame={false}
                                />
                                 <Link href='/'><p className={`${styles2.hollowBtn}`}>Home</p></Link>
                                <section className='flex-box-sa-wrap'>
                                    {numberOfSquares.map((number, index) => {
                                        if (index >= parseInt(playerData.level)) {
                                            return (
                                                // disabled games
                                                <LobbyGameSquare
                                                    multiple={number + 1}
                                                    disableBtn={false}
                                                    onClick={(): void => {
                                                        setNumberRange(number + 1)
                                                        setShowModal(true)
                                                    }}
                                                    key={index}></LobbyGameSquare>
                                            )
                                        } else {
                                            // allowed games
                                            return (
                                                <LobbyGameSquare
                                                    multiple={number + 1}
                                                    disableBtn={true}
                                                    onClick={(): void => {
                                                        setNumberRange(number + 1)
                                                        setShowModal(true)
                                                    }}
                                                    key={index}></LobbyGameSquare>
                                            )
                                        }
                                    }
                                    )}

                                </section>
                            </> 
                    }
                </div>
            }
        </main>
    )
}

export default MultiplicationLobby;
