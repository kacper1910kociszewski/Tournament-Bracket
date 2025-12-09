import { useState } from 'react'
import './TournamentTree.css'
import Tree from './Tree'

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

    return (
        <div>
            {!tournamentStarted ? (
                <div>
                    <h1>Tournament Bracket</h1>
                    <input type="text" 
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        placeholder='Enter Player Name'
                        onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
                    />
                    <button onClick={addPlayer}>Add Player</button>

                    {/* Players List */}
                    <div className='players-list'>
                        <ol>
                            {
                                players.map((player, index) => (
                                    <li key={index}>
                                        <span>{player}</span>
                                        <button onClick={() => removePlayer(index)}>Remove</button>
                                    </li>
                                ))
                            }
                        </ol>
                    </div>

                    <div className='actions'>
                        <button onClick={shufflePlayers} disabled={players.length < 2}>
                            Shuffle Players
                        </button>

                        <button
                            onClick={() => setTournamentStarted(true)}
                            // This makes the button enabled only if the amount of players is a power of two number (2, 4, 8, 16...)
                            disabled={players.length < 2 || (players.length & players.length - 1) !== 0}
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

export default TournamentTree