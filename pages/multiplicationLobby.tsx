import LobbyGameSquare from '../components/LobbyGameSquare';
import TrainOrQuiz from '../components/TrainOrQuizModal';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

function MultiplicationLobby() {
    const router = useRouter();
    const { username, gameType } = router.query

    // need to make an array of 12 to map the squares in the Lobby 12 times
    const [numberOfSquares] = useState<number[]>(Array.from(Array(12).keys()));
    const [showModal, setShowModal] = useState<boolean>(false);

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

                <div >
                    {showModal &&
                        <TrainOrQuiz
                            gameType={playerData.operations}
                            username={username}
                            showModal={showModal}
                            setShowModal={setShowModal}
                            multiples={playerData.level}
                        />
                    }
                    <main>
                        <>
                            <h1>Welcome, {username}</h1>
                            <p>{gameType}</p>
                            <section className='flex-box-sa-wrap'>
                                {numberOfSquares.map((number, index) => {
                                    if (index >= parseInt(playerData.level)) {
                                        return (
                                            <LobbyGameSquare
                                                multiple={number + 1}
                                                disableBtn={false}
                                                onClick={(): void => setShowModal(true)}
                                                key={index}></LobbyGameSquare>
                                        )
                                    } else {
                                        return (
                                            <LobbyGameSquare
                                            multiple={number + 1}
                                            disableBtn={true}
                                            onClick={(): void => setShowModal(true)}
                                            key={index}></LobbyGameSquare>
                                        )
                                    }
    
                                }
                                )}

                            </section>
                        </>
                    </main>
                </div>
            }
        </>
    )
}

export default MultiplicationLobby;
