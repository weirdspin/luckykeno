import './KenoBoard.css';
import WinPopup from './WinPopup';

function KenoBoard({ selectedNumbers, onTileClick, hitNumbers, matches, revealedHitCount, winAmountPopup }) {
  const tiles = Array.from({ length: 40 }, (_, i) => i + 1);

  // Sort hitNumbers to ensure consistent reveal order
  const sortedHitNumbers = [...hitNumbers].sort((a, b) => a - b);

  return (
    <div className="keno-board">
      <WinPopup winAmount={winAmountPopup} />
      <h2>Keno Board</h2>
      <div className="keno-grid">
        {tiles.map(number => {
          const isSelected = selectedNumbers.has(number);
          
          // Determine if this tile is among the revealed hit numbers
          const hitIndex = sortedHitNumbers.indexOf(number);
          const isHitRevealed = hitIndex !== -1 && hitIndex < revealedHitCount;

          const isMatch = isHitRevealed && matches.has(number);
          const isHit = isHitRevealed && !isMatch && hitNumbers.includes(number);


          const className = [
            'keno-tile',
            isSelected ? 'selected' : '',
            isHit ? 'hit' : '',
            isMatch ? 'match' : ''
          ].filter(Boolean).join(' ');

          return (
            <div 
              key={number} 
              className={className}
              onClick={() => onTileClick(number)}
            >
              {number}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default KenoBoard;
