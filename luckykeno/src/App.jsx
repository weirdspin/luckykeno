import { useState, useEffect } from 'react';
import './App.css'
import { getKenoOutcome, getPayouts } from './utils/gameLogic';
import BetControls from './components/BetControls';
import KenoBoard from './components/KenoBoard';
import PayoutTable from './components/PayoutTable';
import GameHistory from './components/GameHistory';
import ProvablyFair from './components/ProvablyFair';

function App() {
  const [balance, setBalance] = useState(1000);
  const [betAmount, setBetAmount] = useState(1.00);
  const [riskLevel, setRiskLevel] = useState('medium');
  const [selectedNumbers, setSelectedNumbers] = useState(new Set());
  const [gameHistory, setGameHistory] = useState([]); // New state for game history

  // Provably Fair state
  const [clientSeed, setClientSeed] = useState('lucky-keno-client-seed');
  const [serverSeed, setServerSeed] = useState('some-secret-server-seed'); // This would come from a server
  const [serverSeedHash, setServerSeedHash] = useState('...'); // This would be the hash of the seed
  const [nonce, setNonce] = useState(0);

  // Game result state
  const [hitNumbers, setHitNumbers] = useState([]);
  const [matches, setMatches] = useState(new Set());
  const [revealedHitCount, setRevealedHitCount] = useState(0); // For animation

  // Placeholder sound functions
  const playTileClickSound = () => { console.log("Play tile click sound"); /* Play audio here */ };
  const playBetSound = () => { console.log("Play bet sound"); /* Play audio here */ };
  const playWinSound = () => { console.log("Play win sound"); /* Play audio here */ };
  const playLoseSound = () => { console.log("Play lose sound"); /* Play audio here */ };

  // Animation for revealing hit numbers one by one
  useEffect(() => {
    if (hitNumbers.length > 0 && revealedHitCount < hitNumbers.length) {
      const timer = setTimeout(() => {
        setRevealedHitCount(prevCount => prevCount + 1);
      }, 200); // Reveal one hit number every 200ms
      return () => clearTimeout(timer);
    }
  }, [hitNumbers, revealedHitCount]);

  const handleTileClick = (number) => {
    playTileClickSound();
    setSelectedNumbers(prevSelectedNumbers => {
      const newSelectedNumbers = new Set(prevSelectedNumbers);
      if (newSelectedNumbers.has(number)) {
        newSelectedNumbers.delete(number);
      } else {
        if (newSelectedNumbers.size < 10) {
          newSelectedNumbers.add(number);
        }
      }
      return newSelectedNumbers;
    });
  };

  const handleAutoPick = () => {
    playTileClickSound(); // Assuming auto-pick also makes a sound
    const newSelectedNumbers = new Set();
    while (newSelectedNumbers.size < 10) {
      const randomNumber = Math.floor(Math.random() * 40) + 1;
      newSelectedNumbers.add(randomNumber);
    }
    setSelectedNumbers(newSelectedNumbers);
  };

  const handleClear = () => {
    playTileClickSound(); // Assuming clear also makes a sound
    setSelectedNumbers(new Set());
  };

  const handleBet = async () => {
    if (selectedNumbers.size === 0) {
      alert("Please select at least one number.");
      return;
    }
    if (balance < betAmount) {
      alert("Insufficient balance.");
      return;
    }
  
    playBetSound();
    setBalance(prevBalance => prevBalance - betAmount);
    setRevealedHitCount(0); // Reset animation counter

    // Clear previous results
    setHitNumbers([]);
    setMatches(new Set());
  
    const outcome = await getKenoOutcome(serverSeed, clientSeed, nonce);
    setHitNumbers(outcome);
  
    const currentMatches = new Set([...selectedNumbers].filter(num => outcome.includes(num)));
    setMatches(currentMatches);
    const matchCount = currentMatches.size;
  
    const payoutTable = getPayouts(riskLevel);
    const multiplier = payoutTable[matchCount] || 0;
    const winAmount = betAmount * multiplier;
  
    const newBalance = balance - betAmount + winAmount; // Calculate for history before setting state
    if (winAmount > 0) {
      setBalance(newBalance);
      playWinSound();
    } else {
      playLoseSound();
    }
  
    setNonce(prevNonce => prevNonce + 1);
    
    // Record game history
    setGameHistory(prevHistory => [
      {
        id: nonce, // Use nonce as a unique ID for this round
        betAmount,
        riskLevel,
        selectedNumbers: Array.from(selectedNumbers),
        hitNumbers: outcome,
        matches: Array.from(currentMatches),
        winAmount,
        balanceAfter: newBalance,
      },
      ...prevHistory, // Add new game to the top
    ]);

    // In a real app, you would now get a new serverSeed and its hash from the server
  };

  return (
    <div className="app">
      <div className="main-layout">
        <div className="left-column">
          <BetControls 
            betAmount={betAmount}
            riskLevel={riskLevel}
            onBetAmountChange={setBetAmount}
            onRiskChange={setRiskLevel}
            onAutoPick={handleAutoPick}
            onClear={handleClear}
            onBet={handleBet}
          />
        </div>
        <div className="right-column">
          <KenoBoard 
            selectedNumbers={selectedNumbers}
            onTileClick={handleTileClick}
            hitNumbers={hitNumbers}
            matches={matches}
            revealedHitCount={revealedHitCount}
          />
          <PayoutTable 
            riskLevel={riskLevel} 
            matchCount={matches.size} 
          />
        </div>
      </div>
      <div className="secondary-layout">
        <GameHistory gameHistory={gameHistory} />
        <ProvablyFair 
          clientSeed={clientSeed}
          serverSeedHash={serverSeedHash}
          nonce={nonce}
          onClientSeedChange={setClientSeed}
        />
      </div>
    </div>
  )
}

export default App

