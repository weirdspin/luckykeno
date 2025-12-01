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
  const [selectedNumbers, setSelectedNumbers] = useState(new Set());
  const [gameHistory, setGameHistory] = useState([]);
  const [winAmountPopup, setWinAmountPopup] = useState(null);
  const [lastWinAmount, setLastWinAmount] = useState(0);
  const [pendingGameResult, setPendingGameResult] = useState(null);

  // Provably Fair state
  const [clientSeed, setClientSeed] = useState('lucky-keno-client-seed');
  const [serverSeed, setServerSeed] = useState('some-secret-server-seed');
  const [serverSeedHash, setServerSeedHash] = useState('...');
  const [nonce, setNonce] = useState(0);

  // Game result state
  const [hitNumbers, setHitNumbers] = useState([]);
  const [matches, setMatches] = useState(new Set());
  const [revealedHitCount, setRevealedHitCount] = useState(0);
  const [displayMatchCount, setDisplayMatchCount] = useState(null);

  // Placeholder sound functions
  const playTileClickSound = () => { console.log("Play tile click sound"); };
  const playBetSound = () => { console.log("Play bet sound"); };
  const playWinSound = () => { console.log("Play win sound"); };
  const playLoseSound = () => { console.log("Play lose sound"); };

  // Animation for revealing hit numbers one by one
  useEffect(() => {
    if (hitNumbers.length > 0 && revealedHitCount < hitNumbers.length) {
      const timer = setTimeout(() => {
        setRevealedHitCount(prevCount => prevCount + 1);
      }, 200);
      return () => clearTimeout(timer);
    } else if (hitNumbers.length > 0 && revealedHitCount === hitNumbers.length) {
      // Animation finished
      setDisplayMatchCount(matches.size);
      if (lastWinAmount > 0) {
        setWinAmountPopup(lastWinAmount);
      }

      if (pendingGameResult) {
        setGameHistory(prevHistory => [pendingGameResult, ...prevHistory]);
        setPendingGameResult(null); // Clear pending result after adding to history
      }
    }
  }, [hitNumbers, revealedHitCount, matches.size, lastWinAmount, pendingGameResult, setGameHistory]);

  const handleTileClick = (number) => {
    playTileClickSound();
    setHitNumbers([]);
    setMatches(new Set());
    setRevealedHitCount(0);
    setDisplayMatchCount(null);
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
    playTileClickSound();
    const newSelectedNumbers = new Set();
    while (newSelectedNumbers.size < 10) {
      const randomNumber = Math.floor(Math.random() * 40) + 1;
      newSelectedNumbers.add(randomNumber);
    }
    setSelectedNumbers(newSelectedNumbers);
  };

  const handleClear = () => {
    playTileClickSound();
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
    setWinAmountPopup(null); // Clear popup on new bet
    setLastWinAmount(0);
    setBalance(prevBalance => prevBalance - betAmount);
    setRevealedHitCount(0);
    setDisplayMatchCount(null);

    setHitNumbers([]);
    setMatches(new Set());
  
    const outcome = await getKenoOutcome(serverSeed, clientSeed, nonce);
    setHitNumbers(outcome);
  
    const currentMatches = new Set([...selectedNumbers].filter(num => outcome.includes(num)));
    setMatches(currentMatches);
  
    const payoutMultipliers = getPayouts(selectedNumbers.size);
    const multiplier = payoutMultipliers[currentMatches.size] || 0;
    const winAmount = betAmount * multiplier;
    setLastWinAmount(winAmount);
  
    const newBalance = balance - betAmount + winAmount;
    if (winAmount > 0) {
      setBalance(newBalance);
      playWinSound();
    } else {
      playLoseSound();
    }
  
    // Calculate the nonce for this game BEFORE incrementing the global nonce state
    const gameNonce = nonce;
    setNonce(prevNonce => prevNonce + 1); // Increment for the *next* game

    setPendingGameResult({
      id: gameNonce, // Use the nonce for *this* game
      betAmount,
      selectedNumbers: Array.from(selectedNumbers),
      hitNumbers: outcome,
      matches: Array.from(currentMatches),
      winAmount,
      balanceAfter: newBalance,
      time: Date.now(),
    });
  };

  return (
    <div className="app">
      <div className="main-layout">
        <div className="left-column">
          <BetControls 
            betAmount={betAmount}
            onBetAmountChange={setBetAmount}
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
            winAmountPopup={winAmountPopup}
          />
          <PayoutTable 
            selectedCount={selectedNumbers.size} 
            matchCount={displayMatchCount} 
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

