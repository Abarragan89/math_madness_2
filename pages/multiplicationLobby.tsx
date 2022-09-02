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
    // sets the multiple value for the quiz or training
    const [multiples, setMultiples] = useState<number>(null)
    // get user Data from indexedDB
    const [playerData, setPlayerData] = useState<object>(null)

    function handleGameSqaureClick(multiple: number) {
        setShowModal(true)
        setMultiples(multiple)
    }

    // retrieve data from database to show appropriate amount of squares
    useEffect(() => {
        const indexedDB = window.indexedDB;
        const request = indexedDB.open('GameDatabase', 1);

        // request.onerror = function(event) {
        //     console.error('An error occurred saving your game.')
        //     console.error(event)
        // }

        request.onsuccess = () => {
            const db = request.result
            const transaction = db.transaction('activeGames', 'readonly')
                .objectStore('activeGames')
                .index('player_name');
            const keyRange = IDBKeyRange.only(username);

            // Set up the request query
            const cursorRequest = transaction.openCursor(keyRange);
            cursorRequest.onsuccess = (event) => {
                setPlayerData(event.target.result.value)
            }
        }
    },[username])

    console.log(playerData)

    return (
        <div >
            {showModal &&
                <TrainOrQuiz 
                gameType={gameType}
                username={username}
                showModal={showModal}
                setShowModal={setShowModal}
                multiples={multiples}

                />
            }
            <main>
                <>
                    <h1>Welcome, {username}</h1>
                    <p>{gameType}</p>
                    <section className='flex-box-sa-wrap'>
                        {numberOfSquares.map((number, index) => (
                            <LobbyGameSquare 
                            number={number + 1}
                            showModal={showModal}
                            setShowModal={setShowModal}
                            onClick={():void => handleGameSqaureClick(number + 1)}
                            key={index}></LobbyGameSquare>
                        ))}

                    </section>
                </>
            </main>
        </div>
    )
}

export default MultiplicationLobby;
