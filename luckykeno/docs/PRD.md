# Product Requirements Document: Lucky Keno

## 1. Objective

To create "Lucky Keno," a sleek, single-page web application offering a minimalist and provably fair Keno betting experience. The game will be designed with a focus on user control, clean design, and robust functionality, drawing inspiration from the UI/UX of the "Atomic Drop" application.

## 2. Target Audience

The primary audience is users of online gaming and crypto-betting platforms who appreciate modern design, transparent game mechanics, and strategic betting options.

## 3. Core Features

### 3.1. Game Board & Interaction
- **Interactive Grid:** A 40-tile grid, numbered 1 through 40.
- **Number Selection:** Players can manually select up to 10 numbers from the grid by clicking on the tiles.
- **Auto Pick:** A button that randomly selects 10 numbers for the player.
- **Clear Table:** A button that deselects all currently selected numbers.

### 3.2. Betting & Game Flow
- **Bet Amount:** An input field allowing players to set their desired bet for each round.
- **Risk Level:** A dropdown selector (e.g., Low, Medium, High) that adjusts the payout table. Higher risk means higher payouts for more hits, but lower (or no) payouts for fewer hits.
- **Bet Execution:** A primary "Bet" button starts the game round.
- **Game Outcome:** Once a bet is placed, the game will randomly draw 10 "hit" numbers.
- **Visual Feedback:** The UI will clearly distinguish between player-selected tiles, drawn "hit" tiles, and tiles that are both selected and hit (a "match").

### 3.3. Payout & Results
- **Dynamic Payout Table:** A table will display the payout multipliers for the number of matches (0-10), which updates based on the selected risk level.
- **Result Display:** The win amount for the round will be clearly displayed.
- **Balance Update:** The player's balance will update in real-time.

### 3.4. Fairness & Transparency
- **Provably Fair System:** A transparent and verifiable betting system using a combination of a server seed (hashed and shown before the bet), a client seed (user-configurable), and a nonce (increments each bet).
- **Verification:** The full server seed will be revealed after each round, allowing the player to verify the game's outcome independently.
- **Game History:** A detailed history of recent bets, including selections, hits, and seeds for verification.

## 4. Technical Stack
- **Frontend:** React (using Vite for tooling)
- **Styling:** CSS (following the design language of `atomicdrop`)
- **Game Logic:** Plain JavaScript

## 5. UI/UX
- **Layout:** The layout will be based on the provided screenshots: Bet Controls on the left, main Keno grid on the right, and the payout table below the grid.
- **Theme:** A clean, dark theme similar to `atomicdrop`, with vibrant colors for highlights and interactive elements.
- **Animations:** Smooth, satisfying animations for tile selection, auto-picking, and the reveal of hit numbers.
