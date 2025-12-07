function Match({ match, onIncrementScore, onFinishMatch }) {
  const { id, player1, player2, winner } = match;

  const isFinished = winner !== null;
  const hasPlayers = player1.name && player2.name;

  return (
    <div style={{
      border: '2px solid #333',
      borderRadius: '8px',
      padding: '15px',
      backgroundColor: isFinished ? '#f0f0f0' : 'white',
      minHeight: '150px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div>
        <div style={{ 
          marginBottom: '10px',
          padding: '5px',
          backgroundColor: winner === player1.name ? '#d4edda' : 'transparent'
        }}>
          <div><strong>Player 1:</strong> {player1.name || 'TBD'}</div>
          <div>Score: {player1.score}</div>
          {!isFinished && player1.name && (
            <button 
              onClick={() => onIncrementScore(id, 1)}
              style={{ marginTop: '5px' }}
            >
              Add Point
            </button>
          )}
        </div>
        
        <div style={{ 
          margin: '10px 0',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          VS
        </div>
        
        <div style={{ 
          padding: '5px',
          backgroundColor: winner === player2.name ? '#d4edda' : 'transparent'
        }}>
          <div><strong>Player 2:</strong> {player2.name || 'TBD'}</div>
          <div>Score: {player2.score}</div>
          {!isFinished && player2.name && (
            <button 
              onClick={() => onIncrementScore(id, 2)}
              style={{ marginTop: '5px' }}
            >
              Add Point
            </button>
          )}
        </div>
      </div>
      
      {isFinished ? (
        <div style={{ 
          marginTop: '10px',
          padding: '5px',
          backgroundColor: '#d4edda',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          <strong>Winner: {winner}</strong>
        </div>
      ) : (
        hasPlayers && (
          <button 
            onClick={() => onFinishMatch(id)}
            style={{
              marginTop: '10px',
              padding: '8px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Finish Match
          </button>
        )
      )}
    </div>
  );
}

export default Match;