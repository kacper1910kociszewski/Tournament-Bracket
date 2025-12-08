import { useState, useEffect } from 'react';
import Match from './Match';

function Tree({ players }) {
  const [matches, setMatches] = useState([]);

  // Initialize tournament bracket
  useEffect(() => {
    if (players.length > 0) {
      createBracket(players);
    }
  }, [players]);

  const createBracket = (playerList) => {
    // Create first round matches
    const firstRoundMatches = [];
    for (let i = 0; i < playerList.length; i += 2) {
      firstRoundMatches.push({
        id: `match-${i / 2}-round-1`,
        round: 1,
        player1: { name: playerList[i], score: 0 },
        player2: { name: playerList[i + 1] || null, score: 0 },
        winner: null,
        nextMatchId: null,
        positionInRound: i / 2
      });
    }

    // Create subsequent rounds
    const allMatches = [...firstRoundMatches];
    let currentRoundMatches = firstRoundMatches;
    let round = 2;

    while (currentRoundMatches.length > 1) {
      const nextRoundMatches = [];
      
      for (let i = 0; i < currentRoundMatches.length; i += 2) {
        const match1 = currentRoundMatches[i];
        const match2 = currentRoundMatches[i + 1];
        
        const nextMatch = {
          id: `match-${nextRoundMatches.length}-round-${round}`,
          round: round,
          player1: { name: null, score: 0 },
          player2: { name: null, score: 0 },
          winner: null,
          nextMatchId: null,
          positionInRound: nextRoundMatches.length
        };

        // Update current matches to point to next match
        if (match1) match1.nextMatchId = nextMatch.id;
        if (match2) match2.nextMatchId = nextMatch.id;
        
        nextRoundMatches.push(nextMatch);
      }

      allMatches.push(...nextRoundMatches);
      currentRoundMatches = nextRoundMatches;
      round++;
    }

    setMatches(allMatches);
  };

  const updateMatch = (matchId, updatedMatch) => {
    setMatches(prevMatches => {
      const newMatches = [...prevMatches];
      const matchIndex = newMatches.findIndex(m => m.id === matchId);
      
      if (matchIndex !== -1) {
        newMatches[matchIndex] = updatedMatch;
        
        // If there's a winner and a next match, update the next match
        if (updatedMatch.winner && updatedMatch.nextMatchId) {
          const nextMatchIndex = newMatches.findIndex(m => m.id === updatedMatch.nextMatchId);
          if (nextMatchIndex !== -1) {
            const nextMatch = newMatches[nextMatchIndex];
            
            // Find which matches in the current round point to this next match
            const matchesInCurrentRound = newMatches.filter(m => 
              m.round === updatedMatch.round && m.nextMatchId === updatedMatch.nextMatchId
            );
            
            // Determine which position this match has in the matches pointing to the same next match
            const matchInGroupIndex = matchesInCurrentRound.findIndex(m => m.id === matchId);
            
            if (matchInGroupIndex === 0) {
              // First match in the pair -> update player1 in next match
              nextMatch.player1.name = updatedMatch.winner;
              nextMatch.player1.score = 0;
            } else if (matchInGroupIndex === 1) {
              // Second match in the pair -> update player2 in next match
              nextMatch.player2.name = updatedMatch.winner;
              nextMatch.player2.score = 0;
            }
            
            newMatches[nextMatchIndex] = { ...nextMatch };
          }
        }
      }
      
      return newMatches;
    });
  };

  const incrementScore = (matchId, playerNumber, action = 'increment') => {
    setMatches(prevMatches => {
      return prevMatches.map(match => {
        if (match.id === matchId) {
          if (playerNumber === 1 && match.player1.name) {
            const newScore = action === 'increment' 
              ? match.player1.score + 1 
              : Math.max(0, match.player1.score - 1);
            
            return {
              ...match,
              player1: {
                ...match.player1,
                score: newScore
              }
            };
          } else if (playerNumber === 2 && match.player2.name) {
            const newScore = action === 'increment' 
              ? match.player2.score + 1 
              : Math.max(0, match.player2.score - 1);
            
            return {
              ...match,
              player2: {
                ...match.player2,
                score: newScore
              }
            };
          }
        }
        return match;
      });
    });
  };

  const finishMatch = (matchId) => {
    const match = matches.find(m => m.id === matchId);
    if (!match || match.winner) return;

    let winner = null;
    if (match.player1.score > match.player2.score) {
      winner = match.player1.name;
    } else if (match.player2.score > match.player1.score) {
      winner = match.player2.name;
    } else {
      // If scores are equal, we could handle a tie, but for now, no winner
      return;
    }
    
    if (winner) {
      const updatedMatch = { ...match, winner };
      updateMatch(matchId, updatedMatch);
    }
  };

  // Group matches by round for display
  const matchesByRound = {};
  matches.forEach(match => {
    if (!matchesByRound[match.round]) {
      matchesByRound[match.round] = [];
    }
    matchesByRound[match.round].push(match);
  });

  const rounds = Object.keys(matchesByRound).sort((a, b) => a - b);

  // Calculate the number of matches in the largest round
  const maxMatchesInRound = Math.max(...Object.values(matchesByRound).map(arr => arr.length));
  const roundHeight = `${100 / maxMatchesInRound}vh`;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '8vw',
      minHeight: '80vh',
      padding: '4vh 2vw',
      backgroundColor: '#f5f5f5'
    }}>
      {rounds.map(round => {
        const roundMatches = matchesByRound[round]
          .sort((a, b) => a.positionInRound - b.positionInRound);
        
        return (
          <div key={round} style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            minHeight: '70vh',
            minWidth: '20vw'
          }}>
            <h3 style={{
              textAlign: 'center',
              marginBottom: '2vh',
              color: '#333',
              borderBottom: '2px solid #333',
              paddingBottom: '1vh'
            }}>
              Round {round}
            </h3>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              gap: '4vh',
              flex: 1
            }}>
              {roundMatches.map(match => (
                <div key={match.id} style={{
                  minHeight: roundHeight,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Match
                    match={match}
                    onIncrementScore={incrementScore}
                    onFinishMatch={finishMatch}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Tree;