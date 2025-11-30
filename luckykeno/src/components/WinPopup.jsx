import './WinPopup.css';

function WinPopup({ winAmount }) {
  if (!winAmount) {
    return null;
  }

  return (
    <div className="win-popup-overlay">
      <div className="win-popup">
        <span className="win-popup-label">You Won!</span>
        <span className="win-popup-amount">${winAmount.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default WinPopup;
