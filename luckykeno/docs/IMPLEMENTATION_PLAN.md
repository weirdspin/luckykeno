# Lucky Keno - Step-by-Step Implementation Plan

This guide outlines the development steps to build the Keno game application.

---

### Phase 1: Project Setup & Scaffolding

-   [x] **1.1: Initialize Project:** Create a new React + Vite project.
-   [x] **1.2: Directory Structure:** Create the standard `src/components`, `src/assets`, etc. directories.
-   [x] **1.3: Component Scaffolding:** Create empty files for the main components:
    -   `App.jsx`
    -   `KenoBoard.jsx` & `KenoBoard.css`
    -   `BetControls.jsx` & `BetControls.css`
    -   `ProvablyFair.jsx` & `ProvablyFair.css`
    -   `GameHistory.jsx` & `GameHistory.css`
    -   `PayoutTable.jsx` & `PayoutTable.css`

---

### Phase 2: Core UI & Layout

-   [x] **2.1: Main Layout (`App.jsx`):** Implement the primary two-column layout (Bet Controls left, Keno Board right) using CSS Grid or Flexbox.
-   [x] **2.2: Bet Controls UI (`BetControls.jsx`):** Build the static UI for all controls: Manual/Auto tabs, Bet Amount input, Risk dropdown, Auto Pick button, Clear Table button, and the main Bet button.
-   [x] **2.3: Keno Board UI (`KenoBoard.jsx`):** Render the 40-tile grid.
-   [x] **2.4: Payout Table UI (`PayoutTable.jsx`):** Render the static UI for displaying multipliers for 0-10 hits.

---

### Phase 3: Game Logic & State Management

-   [x] **3.1: State Management (`App.jsx`):** Initialize all necessary states: `balance`, `betAmount`, `riskLevel`, `selectedNumbers` (Set), `gameResult` (hit numbers), etc.
-   [x] **3.2: Tile Selection (`KenoBoard.jsx`):** Implement the logic for selecting and deselecting up to 10 numbers. Pass selection state up to `App.jsx`.
-   [x] **3.3: Auto Pick & Clear (`BetControls.jsx`):** Implement the logic for the "Auto Pick" and "Clear Table" buttons, modifying the `selectedNumbers` state in `App.jsx`.
-   [x] **3.4: Provably Fair Logic (`gameLogic.js`):**
    -   [x] Create a function `getKenoOutcome(serverSeed, clientSeed, nonce)` that returns an array of 10 unique "hit" numbers between 1 and 40.
    -   [x] Create a function `getPayouts(riskLevel)` that returns the multiplier table for the given risk.

---

### Phase 4: Core Gameplay Loop

-   [x] **4.1: Wire up Bet Button (`App.jsx`):**
    -   On "Bet" click, subtract the bet amount from the balance.
    -   Call `getKenoOutcome` to get the hit numbers.
    -   Determine the number of matches between `selectedNumbers` and the hit numbers.
    -   Use the payout table to calculate the win amount.
    -   Add the win amount to the balance.
    -   Increment the nonce and prepare for the next round.
-   [x] **4.2: Displaying Results (`KenoBoard.jsx`):** Pass the hit numbers down as props and apply specific styling to the hit tiles and matched tiles.
-   [x] **4.3: Update Payout Table (`PayoutTable.jsx`):** Highlight the resulting multiplier based on the number of matches.

---

### Phase 5: Polish & Secondary Features

-   [x] **5.1: Animations:** Animate the reveal of the hit numbers one by one for a more engaging experience. Add subtle animations for tile selection.
-   [x] **5.2: Provably Fair Component (`ProvablyFair.jsx`):** Display the server seed hash, client seed input, and nonce.
-   [... unfinished]
-   [x] **5.3: Game History (`GameHistory.jsx`):** Implement the logic to store and display a list of past games with their results.
-   [x] **5.4: Sound Effects:** Add sound effects for tile clicks, betting, and winning outcomes.
-   [x] **5.5: Responsiveness:** Ensure the layout adapts gracefully to smaller screen sizes.
