# Pong - Webapp Smartphone

## 1. Project Overview

- **Project name**: Pong Classic
- **Type**: Mobile-first web game (HTML5 Canvas)
- **Core functionality**: Classic Pong game for 1 or 2 players on smartphone with touch controls
- **Target users**: Casual players wanting quick retro gaming sessions

## 2. Visual & Rendering Specification

### Scene Setup
- **Canvas**: Full viewport, responsive to device dimensions
- **Background**: Dark charcoal (#1a1a2e) with subtle scanline overlay effect
- **Aspect ratio**: Portrait orientation optimized for smartphones

### Visual Style: Retro Arcade
- **Color palette**:
  - Background: #1a1a2e (deep navy)
  - Player 1 paddle: #00ff88 (neon green)
  - Player 2 paddle: #ff6b6b (coral red)
  - Ball: #ffffff (white) with subtle glow
  - Score/UI: #ffffff with pixel font
  - Court lines: #ffffff at 30% opacity

### Typography
- **Font**: "Press Start 2P" (Google Fonts) - authentic retro pixel style
- **Score display**: Large, centered at top
- **UI text**: Small, minimal

### Effects
- Ball trail/ghost effect (3-4 previous positions fading)
- Paddle hit flash animation
- Score pulse animation on point
- Subtle CRT curvature via CSS

## 3. Game Mechanics Specification

### Court Layout
- Vertical court (portrait mode)
- Paddles on left and right sides
- Center line: dashed vertical divider
- Top/bottom boundaries

### Ball Physics
- Initial speed: Moderate, increases slightly after each paddle hit
- Speed increment: 5% per hit, capped at 2x initial speed
- Angle deflection based on paddle hit position (center = straight, edges = angled)
- Maximum angle: 60 degrees from vertical

### Paddle Specs
- Size: 15% of court height
- Width: 4% of court width
- Speed: Matches ball Y-speed for tracking
- Movement: Vertical only (touch/drag)

### Scoring
- Point awarded when ball passes opponent's paddle
- First to 11 points wins
- Game pauses between points (1 second delay)

## 4. Interaction Specification

### Mode Selection
- On game start: Choice between "1 PLAYER" or "2 PLAYERS"
- 1 Player: Left paddle controlled, right paddle is AI
- 2 Players: Each player controls one paddle

### Touch Controls
- **1 Player mode**:
  - Left side touch: Control left paddle Y position
  - Drag to move paddle up/down

- **2 Players mode**:
  - Left side touch: Control left paddle
  - Right side touch: Control right paddle
  - Multi-touch supported

### AI Behavior (1 Player)
- Tracks ball Y position with slight delay
- AI error margin: 10-15% (beatable but challenging)
- Reaction speed scales with ball speed

### Game States
1. **MENU**: Mode selection screen
2. **PLAYING**: Active gameplay
3. **PAUSED**: Ball out of bounds, point scored
4. **GAME_OVER**: Winner announced, play again option

### UI Elements
- Touch zones indicated by subtle paddle color highlights
- "TAP TO START" / "TAP TO PAUSE" prompts
- Score display always visible
- Mode indicator in corner

## 5. Audio Specification

- **Paddle hit**: Short blip (440Hz, 50ms)
- **Wall bounce**: Lower blip (220Hz, 30ms)
- **Score**: Descending tone
- **Win**: Ascending arpeggio

*Note: Audio optional, game works without sound*

## 6. Technical Specification

### Performance
- Target: 60 FPS
- Canvas rendering with requestAnimationFrame
- Touch events with passive listeners
- No external dependencies beyond Google Fonts

### Responsive Design
- Min width: 320px
- Max width: 480px (centered on larger screens)
- Full height viewport
- Orientation: Portrait only message for landscape

### Browser Support
- Modern mobile browsers (Chrome, Safari, Firefox)
- Touch events required

## 7. Acceptance Criteria

1. Game loads without errors on mobile browsers
2. Mode selection works (1P/2P)
3. Touch controls respond smoothly without lag
4. Ball physics feel natural and predictable
5. AI provides reasonable challenge in 1P mode
6. Score tracking accurate
7. Win condition triggers at 11 points
8. Play again restarts correctly
9. No console errors during gameplay
10. Visual effects (trail, glow) render correctly
