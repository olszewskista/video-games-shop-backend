const mongoose = require('mongoose');
const Game = require('./models/Game');
const Discount = require('./models/Discount');

mongoose.connect('mongodb://localhost:27017/');

const games = [
    {
        title: 'Velocity Racer',
        description:
            'Experience the thrill of high-speed racing in Velocity Racer! Choose from a variety of powerful cars, customize them to your liking, and compete in intense races against AI opponents. Test your skills on diverse tracks and push your limits to become the ultimate Velocity Racer!',
        price: 29.99,
        category: 'racing',
        image: 'https://storage.googleapis.com/games-store/VelocityRacer.jpg',
        releaseDate: '2023-02-15',
    },
    {
        title: 'Urban Circuit Challenge',
        description:
            'Navigate the bustling streets of the city in Urban Circuit Challenge! Race through urban landscapes, dodge traffic, and take on challenging shortcuts. With realistic graphics and dynamic weather, this game offers a true-to-life racing experience. Are you ready to conquer the concrete jungle?',
        price: 39.99,
        category: 'racing',
        image: 'https://storage.googleapis.com/games-store/UrbanCircuit.jpg',
        releaseDate: '2022-08-20',
    },
    {
        title: 'Offroad Fury',
        description:
            'Get ready for an offroad adventure in Offroad Fury! Conquer rugged terrains, tackle extreme obstacles, and compete in offroad championships. Choose from a fleet of offroad vehicles, each with unique strengths. Are you skilled enough to handle the dirt, mud, and challenging offroad courses?',
        price: 49.99,
        category: 'racing',
        image: 'https://storage.googleapis.com/games-store/OffroadFury.jpg',
        releaseDate: '2023-11-10',
    },
    {
        title: 'Battle of Field',
        description:
            'Immerse yourself in the chaos of competition! Join intense battles, choose from an arsenal of powerful tools, and strategically navigate through environments. With stunning graphics and immersive gameplay, this action-packed game will test your skills in epic gameplay.',
        price: 49.99,
        category: 'action',
        image: 'https://storage.googleapis.com/games-store/BattleOfField.jpg',
        releaseDate: '2022-09-01',
    },
    {
        title: 'Stealth Ops: Covert Infiltration',
        description:
            'Embark on covert missions in Stealth Ops: Covert Infiltration! As a skilled operative, use stealth and tactics to infiltrate enemy bases, eliminate high-profile targets, and complete challenging objectives. With cutting-edge gadgets and realistic AI, this action game offers a thrilling espionage experience.',
        price: 59.99,
        category: 'action',
        image: 'https://storage.googleapis.com/games-store/StealthOps.jpg',
        releaseDate: '2021-04-29',
    },
    {
        title: 'Apocalypse Rising',
        description:
            'Survive the post-apocalyptic world in Apocalypse Rising! Face hordes of mutated creatures, scavenge for resources, and engage in intense battles for survival. With an expansive open-world environment and a gripping storyline, this action game will push your limits in a dystopian setting.',
        price: 39.99,
        category: 'action',
        image: 'https://storage.googleapis.com/games-store/ApocalypseRising.jpg',
        releaseDate: '2022-12-12',
    },
    {
        title: 'Lost Kingdom Quest',
        description:
            'Embark on an epic adventure in the Lost Kingdom! Solve puzzles, discover hidden treasures, and unravel the mysteries of a forgotten realm. With immersive storytelling and captivating environments, this adventure game will test your wits and bravery on a quest for glory.',
        price: 49.99,
        category: 'adventure',
        image: 'https://storage.googleapis.com/games-store/LostKingdom.jpg',
        releaseDate: '2019-01-31',
    },
    {
        title: 'Mystic Forest Exploration',
        description:
            'Explore the enchanting Mystic Forest and uncover its magical secrets! Encounter mystical creatures, solve riddles, and embark on a journey through lush landscapes. With stunning visuals and a rich narrative, this adventure game offers a magical experience for players of all ages.',
        price: 39.99,
        category: 'adventure',
        image: 'https://storage.googleapis.com/games-store/MysticForest.jpg',
        releaseDate: '2020-01-01',
    },
    {
        title: "Time Traveler's Odyssey",
        description:
            'Step into the shoes of a time traveler on an incredible odyssey through history! Solve historical puzzles, meet legendary figures, and witness key moments in time. With a mix of education and entertainment, this adventure game provides a unique and immersive time-traveling experience.',
        price: 59.99,
        category: 'adventure',
        image: 'https://storage.googleapis.com/games-store/TimeTravelers.jpg',
        releaseDate: '2021-03-21',
    },
    {
        title: 'Pixel Adventure Quest',
        description:
            'Embark on a charming pixelated adventure in Pixel Adventure Quest! Explore handcrafted worlds, solve unique puzzles, and uncover the mysteries of a retro-inspired universe. With nostalgic graphics and an engaging storyline, this indie game captures the spirit of classic gaming.',
        price: 24.99,
        category: 'indie',
        image: 'https://storage.googleapis.com/games-store/PixelAdventure.jpg',
        releaseDate: '2018-07-22',
    },
    {
        title: "Whimsical Wanderer's Tale",
        description:
            "Experience a whimsical journey in Whimsical Wanderer's Tale! Navigate through dreamlike landscapes, encounter quirky characters, and participate in surreal quests. With hand-drawn art and an imaginative world, this indie game offers a unique and artistic gaming experience.",
        price: 19.99,
        category: 'indie',
        image: 'https://storage.googleapis.com/games-store/WhimsicalWanderers.jpg',
        releaseDate: '2019-01-01',
    },
    {
        title: 'Rogue Legacy Reborn',
        description:
            'Enter the ever-changing world of Rogue Legacy Reborn! Dive into procedurally generated dungeons, unlock new characters, and face challenging enemies. With a dynamic and roguelike gameplay style, this indie game provides a fresh and unpredictable gaming adventure.',
        price: 29.99,
        category: 'indie',
        image: 'https://storage.googleapis.com/games-store/RogueLegacy.jpg',
        releaseDate: '2023-11-13',
    },
    {
        title: 'CyberStrike Arena',
        description:
            'Enter the virtual battlegrounds of CyberStrike Arena! Team up with friends or challenge opponents in intense multiplayer shootouts. With a variety of futuristic weapons, dynamic maps, and strategic gameplay, this multiplayer game delivers adrenaline-pumping action and competitive excitement.',
        price: 49.99,
        category: 'multiplayer',
        image: 'https://storage.googleapis.com/games-store/CyberStrike.jpg',
        releaseDate: '2019-12-12',
    },
    {
        title: 'Galactic Guilds Online',
        description:
            'Join the intergalactic community in Galactic Guilds Online! Form alliances, explore distant planets, and engage in epic space battles with players from around the universe. With customizable spaceships, a vast open world, and cooperative gameplay, this multiplayer game offers a rich and immersive online experience.',
        price: 39.99,
        category: 'multiplayer',
        image: 'https://storage.googleapis.com/games-store/GalacticGuilds.jpg',
        releaseDate: '2017-05-21',
    },
    {
        title: 'Legends of the Arena: Battle Royale',
        description:
            'Enter the arena and become a legend in Legends of the Arena: Battle Royale! Compete against players from around the world in a fast-paced battle royale experience. With a variety of weapons and dynamic gameplay, this multiplayer game delivers adrenaline-pumping action.',
        price: 29.99,
        category: 'multiplayer',
        image: 'https://storage.googleapis.com/games-store/LegendsOfArena.jpg',
        releaseDate: '2015-11-29',
    },
    {
        title: 'Chronicles of Eldoria',
        description:
            'Embark on a heroic journey in Chronicles of Eldoria! Immerse yourself in a vast, open-world fantasy realm filled with mythical creatures, quests, and magic. Customize your character, make impactful choices, and shape the destiny of Eldoria in this epic RPG adventure.',
        price: 49.99,
        category: 'rpg',
        image: 'https://storage.googleapis.com/games-store/ChroniclesOfEldoria.jpg',
        releaseDate: '2016-10-01',
    },
    {
        title: 'Starlight Odyssey: Galactic Saga',
        description:
            'Explore the cosmos in Starlight Odyssey: Galactic Saga! Become a space-faring adventurer, forge alliances, and engage in interstellar conflicts. With a branching narrative, diverse alien species, and a spaceship to customize, this RPG offers a thrilling journey through the stars.',
        price: 59.99,
        category: 'rpg',
        image: 'https://storage.googleapis.com/games-store/StarlightOdyssey.jpg',
        releaseDate: '2023-02-02',
    },
    {
        title: "Shadow's Veil: Dark Prophecy",
        description:
            "Unravel the mysteries of a dark prophecy in Shadow's Veil! Navigate a world shrouded in secrets, encounter ancient evils, and choose your path between light and shadow. With deep lore, character development, and strategic battles, this RPG invites you to shape the fate of a mysterious realm.",
        price: 39.99,
        category: 'rpg',
        image: 'https://storage.googleapis.com/games-store/ShadowVeil.jpg',
        releaseDate: '2014-09-09',
    },
    {
        title: 'City Builder Tycoon',
        description:
            'Take on the role of an urban planner in City Builder Tycoon! Construct and manage a bustling city, balance resources, and respond to the needs of your growing population. With realistic city dynamics and detailed simulations, this game provides an immersive city-building experience.',
        price: 29.99,
        category: 'simulation',
        image: 'https://storage.googleapis.com/games-store/CityBuilder.jpg',
        releaseDate: '2018-04-21',
    },
    {
        title: 'Flight Simulator Pro X',
        description:
            'Soar through the skies in Flight Simulator Pro X! Experience the thrill of piloting various aircraft, from small planes to jumbo jets. Explore realistic landscapes, navigate challenging weather conditions, and master the art of aviation in this highly detailed flight simulation game.',
        price: 39.99,
        category: 'simulation',
        image: 'https://storage.googleapis.com/games-store/FlightSimulator.jpg',
        releaseDate: '2023-08-03',
    },
    {
        title: "Chef's Delight: Culinary Simulator",
        description:
            "Step into the shoes of a chef in Chef's Delight: Culinary Simulator! Run your own restaurant, create mouthwatering dishes, and manage the kitchen. With realistic cooking mechanics and a variety of recipes, this simulation game offers a tasty culinary experience for aspiring chefs.",
        price: 24.99,
        category: 'simulation',
        image: 'https://storage.googleapis.com/games-store/ChefsDelight.jpg',
        releaseDate: '2010-09-11',
    },
    {
        title: 'Ultimate Soccer Challenge',
        description:
            'Experience the thrill of the pitch in Ultimate Soccer Challenge! Choose your favorite teams, compete in realistic matches, and lead your squad to victory. With stunning graphics and dynamic gameplay, this sports game offers an immersive soccer experience for fans around the world.',
        price: 34.99,
        category: 'sports',
        image: 'https://storage.googleapis.com/games-store/UltimateSoccer.jpg',
        releaseDate: '2019-05-12',
    },
    {
        title: 'Extreme Skateboard Showdown',
        description:
            'Hit the streets and master your skills in Extreme Skateboard Showdown! Perform tricks, conquer skate parks, and compete in thrilling skateboard competitions. With customizable gear and challenging courses, this sports game brings the excitement of extreme skateboarding to your fingertips.',
        price: 29.99,
        category: 'sports',
        image: 'https://storage.googleapis.com/games-store/ExtremeSkate.jpg',
        releaseDate: '2016-02-29',
    },
    {
        title: 'Grand Slam Tennis Pro',
        description:
            'Serve, volley, and smash your way to victory in Grand Slam Tennis Pro! Choose your favorite tennis stars, compete in prestigious tournaments, and strive for championship glory. With realistic physics and responsive controls, this sports game delivers an authentic tennis experience for players of all skill levels.',
        price: 39.99,
        category: 'sports',
        image: 'https://storage.googleapis.com/games-store/GrandSlamTennis.jpg',
        releaseDate: '2017-03-30',
    },
    {
        title: 'Empire Builders: Civilization Rising',
        description:
            'Lead your civilization to greatness in Empire Builders: Civilization Rising! Manage resources, build cities, and engage in diplomatic and military strategies to expand your empire. With intricate gameplay and a rich historical setting, this strategy game offers an epic journey through the ages.',
        price: 49.99,
        category: 'strategy',
        image: 'https://storage.googleapis.com/games-store/EmpireBuilders.jpg',
        releaseDate: '2022-09-05',
    },
    {
        title: 'Galactic Commanders: Star Conquest',
        description:
            'Conquer the galaxy in Galactic Commanders: Star Conquest! Assemble your fleet, explore star systems, and engage in tactical space battles. With a dynamic campaign, customizable ships, and strategic depth, this strategy game provides an immersive interstellar conquest experience.',
        price: 39.99,
        category: 'strategy',
        image: 'https://storage.googleapis.com/games-store/GalacticCommanders.jpg',
        releaseDate: '2022-08-11',
    },
    {
        title: 'Kingdoms at War: Fantasy Tactics',
        description:
            'Command armies and lead your kingdom to victory in Kingdoms at War: Fantasy Tactics! Plan strategic battles, recruit powerful heroes, and defend your realm against mythical foes. With fantasy elements and deep tactical gameplay, this strategy game offers a captivating journey through a magical world.',
        price: 34.99,
        category: 'strategy',
        image: 'https://storage.googleapis.com/games-store/KingdomsAtWar.jpg',
        releaseDate: '2023-12-12',
    },
    {
        title: 'Fruit Swipe Mania',
        description:
            'Indulge in the sweet and juicy world of Fruit Swipe Mania! Match colorful fruits, complete levels, and unlock new challenges. With simple and addictive gameplay, this casual game is perfect for quick and enjoyable gaming sessions.',
        price: 9.99,
        category: 'casual',
        image: 'https://storage.googleapis.com/games-store/FruitSwipe.jpg',
        releaseDate: '2019-01-11',
    },
    {
        title: 'Puzzle Paradise',
        description:
            'Escape to Puzzle Paradise and enjoy a variety of mind-bending puzzles! Solve jigsaw puzzles, match tiles, and explore different puzzle modes. With relaxing music and visually appealing designs, this casual game offers a stress-free escape for puzzle enthusiasts.',
        price: 14.99,
        category: 'casual',
        image: 'https://storage.googleapis.com/games-store/PuzzleParadise.jpg',
        releaseDate: '2020-01-01',
    },
    {
        title: 'Bubble Pop Adventure',
        description:
            'Embark on a bubbly adventure in Bubble Pop Adventure! Pop colorful bubbles, complete challenges, and progress through cheerful levels. With cheerful graphics and easy-to-learn gameplay, this casual game is suitable for players of all ages.',
        price: 19.99,
        category: 'casual',
        image: 'https://storage.googleapis.com/games-store/BubblePop.jpg',
        releaseDate: '2023-08-08',
    },
];

main();
async function main() {
    games.forEach(async (game) => {
        const newGame = new Game({
            ...game,
            releaseDate: new Date(game.releaseDate),
        });
        await newGame.save();
    });

    return;
}
