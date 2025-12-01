import './ProvablyFair.css';

function ProvablyFair({ clientSeed, serverSeedHash, nonce, onClientSeedChange, onChangeServerSeed, onResetNonce }) {
  return (
    <div className="provably-fair">
      <h2>Provably Fair</h2>
      <div className="pf-section">
        <label htmlFor="client-seed">Client Seed:</label>
        <input 
          type="text" 
          id="client-seed" 
          value={clientSeed} 
          onChange={(e) => onClientSeedChange(e.target.value)} 
        />
      </div>
      <div className="pf-section">
        <span>Server Seed Hash:</span>
        <span className="pf-value">{serverSeedHash}</span>
        <button className="pf-button" onClick={onChangeServerSeed}>Change Server Seed</button>
      </div>
      <div className="pf-section">
        <span>Nonce:</span>
        <span className="pf-value">{nonce}</span>
        <button className="pf-button" onClick={onResetNonce}>Reset Nonce</button>
      </div>
      {/* Verification button/link can be added later */}
    </div>
  );
}

export default ProvablyFair;
