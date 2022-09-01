function LobbyGameSquare({number: number, showModal: boolean, setShowModal, onClick}) {
    return (
        <button 
        onClick={onClick}
        className='mainButton'>
            <span>{number}&apos;s</span>
        </button>
    )
}

export default LobbyGameSquare;