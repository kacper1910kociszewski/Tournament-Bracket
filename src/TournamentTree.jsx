import { useState } from 'react'
import './TournamentTree.css'
import Tree from './Tree'
import { minHeight } from '@mui/system'

function TournamentTree() {
    const [players, setPlayers] = useState([])
    const [inputName, setInputName] = useState("")
    const [tournamentStarted, setTournamentStarted] = useState(false)

    // Add new player to the list
    const addPlayer = () => {
        if (inputName.trim() !== '') {
            setPlayers([...players, inputName.trim()])
            setInputName("") // Clear the input
        }
    }

    // Remove player from the list
    const removePlayer = (index) => {
        const newPlayers = players.filter((_, i) => i !== index)
        setPlayers(newPlayers)
    }

    // Shuffle the list of players
    const shufflePlayers = () => {
        const shuffled = [...players]
        for (let i = 0; i < shuffled.length; i++) {
            const j = Math.floor(Math.random() * (i + 1))

            // Replacing elements
            const temp = shuffled[j]
            shuffled[j] = shuffled[i]
            shuffled[i] = temp
        }
        setPlayers(shuffled)
    }

    const containerStyle = {
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #0c0c0c 0%, #3c3c3c 50%, #8b8b8b 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const menuContainerStyle = {
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '16px',
        boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 0 0 1px rgba(255, 255, 255, 0.05)
        `,
        padding: '40px',
        minWidth: '60vh',
        maxWidth: '70vw',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
    }

    const inputStyle = {
        width: '100%',
        padding: '15px 20px',
        fontSize: '1rem',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '8px',
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: '2vh',
        backdropFilter: 'blur(10px)',
        boxSizing: 'border-box'
    }

    const buttonStyle = {
        padding: '2vh 2vw',
        fontSize: '1rem',
        fontWeight: 'bold',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
        minWidth: '180px'
    }

    const disabledButtonStyle = {
        ...buttonStyle,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: 'rgba(44, 44, 44, 0.5)',
        cursor: 'not-allowed'
    }

    const titleStyle = {
        color: '#ffffff',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
    }

    const playersListStyle = {
        width: '100%',
        maxHeight: '30vh',
        overflowY: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        backdropFilter: 'blur(10px)'
    }

    const listItemStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 15px',
        marginBottom: '1.5vh',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '1.1rem'
    }

    const removeButtonStyle = {
        padding: '6px 12px',
        fontSize: '0.9rem',
        backgroundColor: 'rgba(244, 67, 54, 0.6)',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
    }

    const actionsContainerStyle = {
        display: 'flex',
        gap: '20px',
        marginTop: '20px',
        width: '100%',
        justifyContent: 'center'
    }

    return (
        <div style={containerStyle}>
            {!tournamentStarted ? (
                <div style={menuContainerStyle}>
                    <h1 style={titleStyle}>Add Players Menu</h1>
                    <input 
                        type="text" 
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        placeholder='Enter Player Name'
                        onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
                        style={inputStyle}
                    />
                    <button 
                        onClick={addPlayer}
                        style={buttonStyle}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                    >
                        Add Player
                    </button>

                    {/* Players List */}
                    <div style={playersListStyle}>
                        <ol style={{ margin: 0, padding: 0 }}>
                            {
                                players.map((player, index) => (
                                    <li key={index} style={listItemStyle}>
                                        <span>{player}</span>
                                        <button 
                                            onClick={() => removePlayer(index)}
                                            style={removeButtonStyle}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(211, 47, 47, 0.8)'}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(244, 67, 54, 0.6)'}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))
                            }
                        </ol>
                    </div>

                    <div style={actionsContainerStyle}>
                        <button 
                            onClick={shufflePlayers} 
                            disabled={players.length < 2}
                            style={players.length < 2 ? disabledButtonStyle : buttonStyle}
                            onMouseEnter={(e) => !e.target.disabled && (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)')}
                            onMouseLeave={(e) => !e.target.disabled && (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')}
                        >
                            Shuffle Players
                        </button>

                        <button
                            onClick={() => setTournamentStarted(true)}
                            disabled={players.length < 2 || (players.length & players.length - 1) !== 0}
                            style={players.length < 2 || (players.length & players.length - 1) !== 0 ? disabledButtonStyle : buttonStyle}
                            onMouseEnter={(e) => !e.target.disabled && (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)')}
                            onMouseLeave={(e) => !e.target.disabled && (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')}
                        >
                            Start Tournament
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <Tree players={players}></Tree>
                </div>
            )}
        </div>
    );
}

export default TournamentTree;