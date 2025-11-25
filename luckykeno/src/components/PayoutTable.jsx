import './PayoutTable.css';
import { getPayouts } from '../utils/gameLogic';

function PayoutTable({ riskLevel, matchCount }) {
  const currentPayouts = getPayouts(riskLevel);

  // Convert the object to an array of objects for easier mapping
  const payoutList = Object.keys(currentPayouts)
    .map(hits => ({
      hits: parseInt(hits, 10),
      multiplier: currentPayouts[hits],
    }))
    .sort((a, b) => a.hits - b.hits); // Sort by hits ascending

  return (
    <div className="payout-table">
      <h2>Payout Table</h2>
      <div className="payout-grid">
        {payoutList.map(payout => (
          <div 
            key={payout.hits} 
            className={`payout-row ${payout.hits === matchCount ? 'highlight' : ''}`}
          >
            <div className="payout-item-content">
              <span className="payout-hits">{payout.hits} Hits</span>
              <span className="payout-multiplier">{payout.multiplier}x</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PayoutTable;
