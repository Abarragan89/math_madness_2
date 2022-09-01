import LobbyGameSquare from '../components/lobbyGameSquare';
import GameConfirmModal from '../components/GameConfirmModal';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';

function MultiplicationLobby() {
    const router = useRouter();
    const { username, gameType } = router.query
    // need to make an array of 12 to map the squares in the Lobby 12 times
    const [numberOfSquares] = useState<number[]>(Array.from(Array(12).keys()));
    const [showModal, setShowModal] = useState<boolean>(false);

    console.log(showModal)
    return (
        <div >
            {showModal &&
                <GameConfirmModal 
                gameType={gameType}
                username={username}
                showModal={showModal}
                setShowModal={setShowModal}
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
                            onClick={():void => setShowModal(true)}
                            key={index}></LobbyGameSquare>
                        ))}

                    </section>
                </>
            </main>
        </div>
    )
}

export default MultiplicationLobby;
