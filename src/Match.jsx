function Match({ match, onIncrementScore, onFinishMatch }) {
  const { id, player1, player2, winner } = match;

  const isFinished = winner !== null;
  const hasBothPlayers = player1.name && player2.name;
  const isTBDMatch = player1.name === 'TBD' && player2.name === 'TBD'

  // Separate handlers for increment and decrement
  const handleIncrement = (playerNumber) => {
    onIncrementScore(id, playerNumber, 'increment')
  };

  const handleDecrement = (playerNumber) => {
    onIncrementScore(id, playerNumber, 'decrement')
  };

  return (
    <div style={{
      border: '2px solid #333',
      borderRadius: '8px',
      backgroundColor: isFinished && !isTBDMatch ? '#e8f5e9' : 'white',
      minWidth: '18vw',
      minHeight: '16vh',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      {/* Player 1 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5vh 1vw',
        borderBottom: '1px solid #ddd',
        backgroundColor: winner === player1.name && !isTBDMatch ? '#4CAF50' : 
                        player1.name === 'TBD' ? 'white' : '#f9f9f9',
        color: winner === player1.name && !isTBDMatch ? 'white' : '#333',
        fontWeight: winner === player1.name && !isTBDMatch ? 'bold' : 'normal',
        minHeight: '5vh'
      }}>
        <span style={{ fontSize: '1.1rem' }}>
          {player1.name || 'TBD'}
        </span>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5vw'
        }}>
          <button 
            onClick={() => handleDecrement(1)}
            disabled={!player1.name || player1.score <= 0 || isFinished}
            style={{
              padding: '0.4vh 0.8vw',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              minWidth: '2vw'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#d32f2f'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#f44336'}
          >
            -
          </button>
          <span style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            minWidth: '2vw',
            textAlign: 'center'
          }}>
            {player1.score}
          </span>
          <button 
            onClick={() => handleIncrement(1)}
            disabled={!player1.name || isFinished}
            style={{
              padding: '0.4vh 0.8vw',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              minWidth: '2vw'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#388E3C'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
          >
            +
          </button>
        </div>
      </div>
      
      {/* Player 2 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5vh 1vw',
        backgroundColor: winner === player2.name && !isTBDMatch ? '#4CAF50' : 
                        player2.name === 'TBD' ? 'white' : '#f9f9f9',
        color: winner === player2.name && !isTBDMatch ? 'white' : '#333',
        fontWeight: winner === player2.name && !isTBDMatch ? 'bold' : 'normal',
        minHeight: '5vh'
      }}>
        <span style={{ fontSize: '1.1rem' }}>
          {player2.name || 'TBD'}
        </span>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5vw'
        }}>
          <button 
            onClick={() => handleDecrement(2)}
            disabled={!player2.name || player2.score <= 0 || isFinished}
            style={{
              padding: '0.4vh 0.8vw',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              minWidth: '2vw'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#d32f2f'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#f44336'}
          >
            -
          </button>
          <span style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            minWidth: '2vw',
            textAlign: 'center'
          }}>
            {player2.score}
          </span>
          <button 
            onClick={() => handleIncrement(2)}
            disabled={!player2.name || isFinished}
            style={{
              padding: '0.4vh 0.8vw',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              minWidth: '2vw'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#388E3C'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
          >
            +
          </button>
        </div>
      </div>
      
      {/* Finish button */}
      {!isFinished && hasBothPlayers && (
        <button 
          onClick={() => onFinishMatch(id)}
          style={{
            padding: '1.2vh 0',
            backgroundColor: '#757575',
            color: 'white',
            border: 'none',
            borderTop: '1px solid #ddd',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            transition: 'background-color 0.2s',
            marginTop: 'auto'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#616161'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#757575'}
        >
          FINISH MATCH
        </button>
      )}
      
      {/* Winner display */}
      {isFinished && !isTBDMatch && (
        <div style={{
          padding: '1.5vh 0',
          backgroundColor: '#4CAF50',
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          marginTop: 'auto'
        }}>
          Winner: {winner}
        </div>
      )}
    </div>
  );
}

export default Match;