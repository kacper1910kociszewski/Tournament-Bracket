function Match({ match, onIncrementScore, onFinishMatch }) {
  const { id, player1, player2, winner } = match;

  const isFinished = winner !== null;
  const hasBothPlayers = player1.name && player2.name;
  const isTBDMatch = player1.name === 'TBD' && player2.name === 'TBD';
  const isActive = hasBothPlayers && !isFinished && !isTBDMatch;
  
  // Winner checking variables
  const isPlayer1Winner = winner === player1.name;
  const isPlayer2Winner = winner === player2.name;

  // Separate handlers for increment and decrement
  const handleIncrement = (playerNumber) => {
    onIncrementScore(id, playerNumber, 'increment');
  };

  const handleDecrement = (playerNumber) => {
    onIncrementScore(id, playerNumber, 'decrement');
  };

  const matchContainerStyle = {
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    backgroundColor: isFinished && !isTBDMatch ? 'rgba(46, 46, 46, 0.05)' : 'rgba(255, 255, 255, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '16px',
    minWidth: '18vw',
    minHeight: '16vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: `
      0 8px 32px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      inset 0 0 0 1px rgba(255, 255, 255, 0.05)
    `,
    overflow: 'hidden'
  };

  const playerContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5vh 1vw',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    backgroundColor: isFinished && !isTBDMatch ? 
      (isPlayer1Winner ? 'rgba(0, 255, 8, 0.5)' : 'rgba(46, 46, 46, 0.05)') : 
      'rgba(255, 255, 255, 0.05)',
    color: isFinished && !isTBDMatch ?
      (isPlayer1Winner ? 'white' : 'rgba(255, 255, 255, 0.9)') :
      'rgba(255, 255, 255, 0.9)',
    fontWeight: isFinished && !isTBDMatch ?
      (isPlayer1Winner ? 'bold' : 'normal') :
      'normal',
    minHeight: '5vh'
  };

  const buttonStyle = {
    padding: '0.4vh 0.8vw',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    minWidth: '2vw',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
  };

  const scoreStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    minWidth: '2vw',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.9)',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
  };

  const playerNameStyle = {
    fontSize: '1.1rem',
    color: isTBDMatch ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.9)',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
  };

  const finishButtonStyle = {
    padding: '1.2vh 0',
    backgroundColor: 'rgba(117, 117, 117, 0.3)',
    color: 'white',
    border: 'none',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
    marginTop: 'auto',
    backdropFilter: 'blur(10px)',
    letterSpacing: '1px'
  };

  const finishedStyle = {
    padding: '1.5vh 0',
    backgroundColor: 'rgba(46, 46, 46, 0.05)',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    marginTop: 'auto',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    backdropFilter: 'blur(10px)'
  };

  return (
    <div style={matchContainerStyle}>
      {/* Player 1 */}
      <div style={{
        ...playerContainerStyle,
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: isFinished && !isTBDMatch ? 
          (isPlayer1Winner ? 'rgba(76, 175, 80, 0.3)' : 'rgba(255, 255, 255, 0.05)') : 
          'rgba(255, 255, 255, 0.05)',
        color: isFinished && !isTBDMatch ?
          (isPlayer1Winner ? 'white' : 'rgba(255, 255, 255, 0.9)') :
          'rgba(255, 255, 255, 0.9)',
        fontWeight: isFinished && !isTBDMatch ?
          (isPlayer1Winner ? 'bold' : 'normal') :
          'normal',
      }}>
        <span style={playerNameStyle}>
          {player1.name || 'TBD'}
        </span>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5vw'
        }}>
          {isActive && (
            <>
              <button 
                onClick={() => handleDecrement(1)}
                disabled={!player1.name || player1.score <= 0 || isFinished}
                style={{
                  ...buttonStyle,
                  backgroundColor: player1.score <= 0 ? 'rgba(244, 67, 54, 0.3)' : 'rgba(244, 67, 54, 0.6)'
                }}
                onMouseEnter={(e) => !e.target.disabled && (e.target.style.backgroundColor = player1.score <= 0 ? 'rgba(244, 67, 54, 0.4)' : 'rgba(211, 47, 47, 0.8)')}
                onMouseLeave={(e) => !e.target.disabled && (e.target.style.backgroundColor = player1.score <= 0 ? 'rgba(244, 67, 54, 0.3)' : 'rgba(244, 67, 54, 0.6)')}
              >
                -
              </button>
              <span style={scoreStyle}>
                {player1.score}
              </span>
              <button 
                onClick={() => handleIncrement(1)}
                disabled={!player1.name || isFinished}
                style={{
                  ...buttonStyle,
                  backgroundColor: 'rgba(76, 175, 80, 0.6)'
                }}
                onMouseEnter={(e) => !e.target.disabled && (e.target.style.backgroundColor = 'rgba(56, 142, 60, 0.8)')}
                onMouseLeave={(e) => !e.target.disabled && (e.target.style.backgroundColor = 'rgba(76, 175, 80, 0.6)')}
              >
                +
              </button>
            </>
          )}
          {!isActive && (
            <span style={scoreStyle}>
              {player1.score}
            </span>
          )}
        </div>
      </div>
      
      {/* Player 2 */}
      <div style={{
        ...playerContainerStyle,
        backgroundColor: isFinished && !isTBDMatch ? 
          (isPlayer2Winner ? 'rgba(76, 175, 80, 0.3)' : 'rgba(46, 46, 46, 0.05)') : 
          'rgba(255, 255, 255, 0.05)',
        color: isFinished && !isTBDMatch ?
          (isPlayer2Winner ? 'white' : 'rgba(255, 255, 255, 0.9)') :
          'rgba(255, 255, 255, 0.9)',
        fontWeight: isFinished && !isTBDMatch ?
          (isPlayer2Winner ? 'bold' : 'normal') :
          'normal',
      }}>
        <span style={playerNameStyle}>
          {player2.name || 'TBD'}
        </span>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5vw'
        }}>
          {isActive && (
            <>
              <button 
                onClick={() => handleDecrement(2)}
                disabled={!player2.name || player2.score <= 0 || isFinished}
                style={{
                  ...buttonStyle,
                  backgroundColor: player2.score <= 0 ? 'rgba(244, 67, 54, 0.3)' : 'rgba(244, 67, 54, 0.6)'
                }}
                onMouseEnter={(e) => !e.target.disabled && (e.target.style.backgroundColor = player2.score <= 0 ? 'rgba(244, 67, 54, 0.4)' : 'rgba(211, 47, 47, 0.8)')}
                onMouseLeave={(e) => !e.target.disabled && (e.target.style.backgroundColor = player2.score <= 0 ? 'rgba(244, 67, 54, 0.3)' : 'rgba(244, 67, 54, 0.6)')}
              >
                -
              </button>
              <span style={scoreStyle}>
                {player2.score}
              </span>
              <button 
                onClick={() => handleIncrement(2)}
                disabled={!player2.name || isFinished}
                style={{
                  ...buttonStyle,
                  backgroundColor: 'rgba(76, 175, 80, 0.6)'
                }}
                onMouseEnter={(e) => !e.target.disabled && (e.target.style.backgroundColor = 'rgba(56, 142, 60, 0.8)')}
                onMouseLeave={(e) => !e.target.disabled && (e.target.style.backgroundColor = 'rgba(76, 175, 80, 0.6)')}
              >
                +
              </button>
            </>
          )}
          {!isActive && (
            <span style={scoreStyle}>
              {player2.score}
            </span>
          )}
        </div>
      </div>
      
      {/* Finish button */}
      {!isFinished && hasBothPlayers && !isTBDMatch && (
        <button 
          onClick={() => onFinishMatch(id)}
          style={finishButtonStyle}
          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(97, 97, 97, 0.4)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(117, 117, 117, 0.3)'}
        >
          FINISH MATCH
        </button>
      )}
      
      {/* Finished display */}
      {isFinished && !isTBDMatch && (
        <div style={finishedStyle}>
          Finished
        </div>
      )}
    </div>
  );
}

export default Match;