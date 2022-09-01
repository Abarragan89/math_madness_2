function LobbyGameSquare({
    number,
    showModal,
    setShowModal,
    onClick,
}) {

    return (
        <button
            onClick={onClick}
            className='mainButton'>
            <span>{number}&apos;s</span>
        </button>
    )
}

export default LobbyGameSquare;