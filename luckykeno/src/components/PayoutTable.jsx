import './PayoutTable.css';
import { getPayouts } from '../utils/gameLogic';

function PayoutTable({ selectedCount, matchCount }) {
  const currentPayouts = getPayouts(selectedCount);

  // Convert the array to a list of objects for mapping
  // Only show payouts for hits with a multiplier > 0
  const payoutList = currentPayouts
    .map((multiplier, hits) => ({
      hits,
      multiplier,
    }))
    .filter(payout => payout.multiplier > 0)
    .sort((a, b) => a.hits - b.hits); // Sort by hits ascending

  // Do not render the table if there are no payouts to show
  // (e.g., when 0 numbers are selected)
  if (payoutList.length === 0) {
    return (
      <div className="payout-table">
        <h2>Payout Table</h2>
        <div className="payout-grid empty">
          <p>Select up to 10 numbers to see payouts.</p>
        </div>
      </div>
    );
  }

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
