import './PayoutTable.css';
import { getPayouts } from '../utils/gameLogic';

function PayoutTable({ selectedCount, matchCount }) {
  const currentPayouts = getPayouts(selectedCount);

  const payoutList = currentPayouts
    .map((multiplier, hits) => ({
      hits,
      multiplier,
    }))
    .sort((a, b) => a.hits - b.hits); // Sort by hits ascending

  // Find the highest hit count that has a zero multiplier
  const maxZeroHit = Math.max(...payoutList.filter(p => p.multiplier === 0).map(p => p.hits));

  // Do not render the table if there are no payouts to show
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
        {payoutList.map(payout => {
          let rowClass = 'payout-row';
          if (payout.hits === matchCount) {
            if (matchCount === maxZeroHit) {
              rowClass += ' zero-multiplier';
            } else if (payout.multiplier > 0) {
              rowClass += ' highlight';
            }
          }
          
          return (
            <div 
              key={payout.hits} 
              className={rowClass}
            >
                          <div className="payout-item-content">
                            <span className="payout-multiplier">{payout.multiplier}x</span>
                            <span className="payout-hits">{payout.hits} Hits</span>
                          </div>            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PayoutTable;

