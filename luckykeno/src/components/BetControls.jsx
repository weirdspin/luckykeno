import './BetControls.css';

function BetControls({ 
  betAmount,
  onBetAmountChange,
  onAutoPick, 
  onClear,
  onBet
}) {
  return (
    <div className="bet-controls">

      <div className="control-group">
        <label htmlFor="bet-amount">Bet Amount</label>
        <input 
          type="number" 
          id="bet-amount" 
          value={betAmount}
          onChange={(e) => onBetAmountChange(parseFloat(e.target.value))} 
        />
      </div>

      <div className="button-group">
          <button className="btn" onClick={onAutoPick}>Auto Pick</button>
          <button className="btn" onClick={onClear}>Clear Table</button>
      </div>
      <button className="btn btn-primary" onClick={onBet}>Bet</button>
    </div>
  );
}

export default BetControls;
