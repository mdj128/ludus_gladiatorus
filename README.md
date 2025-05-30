# Ludus Gladiatorus

A React-based gladiator management and battle simulation game inspired by ancient Roman gladiatorial combat. Build, train, and battle gladiators in an immersive web application that combines strategic gameplay with detailed statistical modeling.

## 🏛️ Features

### Core Gameplay
- **Gladiator Creation**: Generate random gladiators with unique names, origins, and background stories
- **Battle Simulation**: Advanced combat system with realistic damage calculations and statistical modeling
- **Character Customization**: Fine-tune gladiator attributes including strength, dexterity, agility, stamina, armor class, and weapon skill
- **Multi-Cultural Origins**: Gladiators from 8 different regions (Rome, Gaul, Germania, Greece, Brittania, Egypt, Hispania, Numidia)

### Visual Elements
- **Interactive Battle Demo**: Click-based combat demonstration with visual effects
- **PixiJS Integration**: 2D graphics rendering for enhanced visual experience
- **Tiled Map Support**: TMX map format support for arena environments
- **Character Portraits**: Extensive collection of gladiator portraits organized by origin

### Analytics & Statistics
- **Battle Analytics**: Run thousands of simulated battles to determine win percentages
- **Damage Distribution Charts**: Highcharts-powered visualization of combat statistics
- **Performance Metrics**: Statistical analysis of gladiator effectiveness

## 🚀 Getting Started

### Prerequisites
- Node.js (version 12 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ludus_gladiatorus
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## 🎮 How to Play

### Gladiator Setup
1. **Create Gladiators**: Use the stat sliders to customize your gladiators' attributes
2. **View Statistics**: Monitor HP, level, and combat effectiveness
3. **Generate Random Gladiators**: Use the "New Gladiator" button to create procedurally generated fighters

### Battle System
1. **Combat Simulation**: The system automatically runs 10,000 battles between configured gladiators
2. **Win Probability**: View percentage chances for each gladiator to win
3. **Damage Analysis**: Examine damage distribution charts to understand combat patterns

### Interactive Demo
- Navigate to the battle demo for a hands-on combat experience
- Click to attack and see visual damage effects
- Experience the combat system in real-time

## 🛠️ Technical Architecture

### Core Technologies
- **React 16.12**: Frontend framework
- **PixiJS 4.8**: 2D graphics rendering
- **Highcharts**: Data visualization and charts
- **Lodash**: Utility functions
- **Node-Sass**: CSS preprocessing

### Key Components
- `App.js`: Main application component with battle simulation
- `battle.js`: Combat calculation engine
- `gladiatorGen.js`: Procedural gladiator generation system
- `components/`: Modular React components for UI elements
- `pixi/`: PixiJS integration for graphics rendering
- `tiled/`: Tiled map support for arena environments

### Battle System Mechanics
- **Damage Calculation**: Uses normal distribution with weapon, strength, and armor modifiers
- **Miss Chance**: Calculated based on attacker's dexterity vs defender's agility
- **Health Points**: Formula-based HP calculation using level and stamina
- **Statistical Modeling**: Advanced regression models for realistic combat outcomes

## 📊 Game Statistics

### Gladiator Attributes
- **Strength (STR)**: Affects damage output
- **Dexterity (DEX)**: Influences hit chance
- **Agility (AGI)**: Determines dodge ability
- **Stamina (STA)**: Increases health points
- **Armor Class (AC)**: Reduces incoming damage
- **Weapon Skill**: Enhances weapon effectiveness

### Leveling System
- Level 1 gladiators start with 12 stat points
- Gain 3 stat points per level
- Experience requirements follow exponential growth curve (levels 1-50)

## 🎨 Assets

### Visual Resources
- Character portraits for all 8 cultural origins
- Battle backgrounds and visual effects
- Sprite sheets for character animation
- Tiled map assets for arena environments

### Audio (Future Enhancement)
- Combat sound effects placeholder structure
- Background music integration ready

## 🔧 Available Scripts

### Development
- `npm start`: Run development server
- `npm test`: Launch test runner
- `npm run build`: Build for production
- `npm run eject`: Eject from Create React App (one-way operation)

### Building and Deployment
The application builds to static files that can be deployed to any web server supporting single-page applications.

## 🏗️ Project Structure

```
ludus_gladiatorus/
├── public/                 # Static assets
│   ├── portraits/         # Gladiator portraits by origin
│   └── static/           # Game assets and maps
├── src/
│   ├── components/       # React components
│   ├── pixi/            # PixiJS graphics components
│   ├── tiled/           # Tiled map integration
│   ├── battle.js        # Combat simulation engine
│   ├── gladiatorGen.js  # Gladiator generation system
│   └── statHelpers.js   # Statistical utility functions
├── battle_demo/         # Interactive battle demonstration
└── ThreatDragonModels/ # Security threat modeling
```

## 🎯 Future Enhancements

- **Ludus Management**: Gladiator school management features
- **Tournament System**: Multi-gladiator competitions
- **Equipment System**: Weapons and armor customization
- **Training Mechanics**: Gladiator skill development
- **Economic System**: Auction house and resource management
- **Multiplayer**: Online gladiator battles
- **Mobile Support**: Responsive design improvements

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines and ensure your code follows the project's coding standards.

## 📜 License

This project is part of a gladiator simulation game development effort. Please respect the intellectual property and use responsibly.

## 🏺 Historical Context

Ludus Gladiatorus draws inspiration from ancient Roman gladiatorial schools where fighters trained for arena combat. The game aims to provide an authentic representation of gladiatorial combat while maintaining engaging gameplay mechanics.

---

*"Are you not entertained?"* - Experience the glory of the arena in Ludus Gladiatorus!