import './GameHistory.css';

function GameHistory({ gameHistory }) {
  return (
    <div className="game-history">
      <h2>Game History</h2>
      {gameHistory.length === 0 ? (
        <p>No games played yet.</p>
      ) : (
        <div className="history-list">
          {gameHistory.map((game) => (
            <div key={game.id} className="history-item">
              <div className="history-row">
                <span>Bet: ${game.betAmount.toFixed(2)}</span>
                <span>Picks: {game.selectedNumbers.length}</span>
                <span>Nonce: {game.id}</span>
              </div>
              <div className="history-row">
                <span>Selected: [{game.selectedNumbers.join(', ')}]</span>
              </div>
              <div className="history-row">
                <span>Hit: [{game.hitNumbers.join(', ')}]</span>
              </div>
              <div className="history-row">
                <span>Matches: [{game.matches.join(', ')}] ({game.matches.length})</span>
              </div>
              <div className="history-row">
                <span>Win: ${game.winAmount.toFixed(2)}</span>
                <span>Balance: ${game.balanceAfter.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GameHistory;
