import './BetControls.css';

function BetControls({ 
  betAmount,
  riskLevel,
  onBetAmountChange,
  onRiskChange,
  onAutoPick, 
  onClear,
  onBet
}) {
  return (
    <div className="bet-controls">
      <div className="tabs">
        <button className="tab active">Manual</button>
        <button className="tab">Auto</button>
      </div>
      <div className="control-group">
        <label htmlFor="bet-amount">Bet Amount</label>
        <input 
          type="number" 
          id="bet-amount" 
          value={betAmount}
          onChange={(e) => onBetAmountChange(parseFloat(e.target.value))} 
        />
      </div>
      <div className="control-group">
        <label htmlFor="risk">Risk</label>
        <select 
          id="risk" 
          value={riskLevel}
          onChange={(e) => onRiskChange(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
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
