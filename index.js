import ancientsData from './data/ancients.js';
import difficulties from './data/difficulties.js';
import blueCardsData from './data/mythicCards/blue/index.js';
import greenCardsData from './data/mythicCards/green/index.js';
import brownCardsData from './data/mythicCards/brown/index.js';

const ANCIENTS = document.querySelectorAll('.ancient'),
		ANCIENTS_IMG = document.querySelectorAll('.ancients__img'),
		LEVELS = document.querySelectorAll('.level'),
		STATE_WRAPPERS = document.querySelectorAll('.state-wrapper'),
		COUNTERS = document.querySelectorAll('.counter'),
		GREEN_COUNTERS = document.querySelectorAll('.counter_green'),
		YELLOW_COUNTERS = document.querySelectorAll('.counter_yellow'),
		BLUE_COUNTERS = document.querySelectorAll('.counter_blue'),
		CARDS_WRAPPER = document.querySelector('.cards__wrapper'),
		CHOOSE_CARD = document.querySelector('.cards__choose-card-img'),
		CARD_MIX_BTN = document.querySelector('.cards__mix');

let counts = [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
		state = 0;

let ancientChoosenCard,
	allCardsWithLevel = [],
	allGreenCardsWithLevel = [],
	allBrownCardsWithLevel = [],
	allBlueCardsWithLevel = [];

let allBlueNormalCards = [],
	allGreenNormalCards = [],
	allBrownNormalCards = [];

let newStages = [];

let stages = [[], [], []]; 

const chooseAncientCard = (e) => {

	newStages = [];
	counts = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

	const ancient = e.target;
	ANCIENTS_IMG.forEach(item => item.classList.remove('ancient-active'));
	ancient.classList.add('ancient-active');

	ancientsData.forEach(item => {
		if(item.id === ancient.parentNode.id){
			ancientChoosenCard = item;
			// console.log(item)
		}
	});

	showCardsCount();
	LEVELS.forEach(item => item.addEventListener('click', e => chooseLevel(e)));
}

const showCardsCount = () => {

	for (let key in ancientChoosenCard){
		if(key === 'firstStage'){
			STATE_WRAPPERS[0].children[0].textContent = ancientChoosenCard.firstStage.greenCards;
			STATE_WRAPPERS[0].children[1].textContent = ancientChoosenCard.firstStage.blueCards;
			STATE_WRAPPERS[0].children[2].textContent = ancientChoosenCard.firstStage.brownCards;
			
		}
		if(key === 'secondStage'){
			STATE_WRAPPERS[1].children[0].textContent = ancientChoosenCard.secondStage.greenCards;
			STATE_WRAPPERS[1].children[1].textContent = ancientChoosenCard.secondStage.blueCards;
			STATE_WRAPPERS[1].children[2].textContent = ancientChoosenCard.secondStage.brownCards;
		}
		if(key === 'thirdStage'){
			STATE_WRAPPERS[2].children[0].textContent = ancientChoosenCard.thirdStage.greenCards;
			STATE_WRAPPERS[2].children[1].textContent = ancientChoosenCard.thirdStage.blueCards;
			STATE_WRAPPERS[2].children[2].textContent = ancientChoosenCard.thirdStage.brownCards;
		}
	}
}

const chooseLevel = (e) => {
	allBlueNormalCards = [];
	allGreenNormalCards = [];
	allBrownNormalCards = [];
	newStages = [];
	ancientChoosenCard = [];
	allCardsWithLevel = [];
	allGreenCardsWithLevel = [];
	allBrownCardsWithLevel = [];
	allBlueCardsWithLevel = [];
	counts = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
	state = 0;
	newStages = [];
	stages = [[], [], []]; 

	const level = e.target;
	LEVELS.forEach(item =>item.classList.remove('level-active'));
	level.classList.add('level-active');
	CARD_MIX_BTN.classList.remove('none');

	if(level.id === 'very_easy'){
		veryEasyHardLevel('easy');
	}
	if(level.id === 'easy'){
		easyNormalHardLevel('hard');
	}
	if(level.id === 'normal'){
		easyNormalHardLevel('');
	}
	if(level.id === 'hard'){
		easyNormalHardLevel('easy');
	}
	if(level.id === 'very_hard'){
		veryEasyHardLevel('hard');
	}

	CARDS_WRAPPER.classList.remove('none');
	CARD_MIX_BTN.addEventListener('click', chooseCard)
}


const veryEasyHardLevel = (levelName) => {

	normalCards();
	fillCounts();

	let greenCount = 0, 
		blueCount = 0,	 
		 brownCount = 0;

	for(let item of blueCardsData){
		if(item.difficulty === levelName){
			allBlueCardsWithLevel.push(item.id);
		}
	}

	for(let item of greenCardsData){
		if(item.difficulty === levelName){
			allGreenCardsWithLevel.push(item.id);
		}
	}

	for(let item of brownCardsData){
		if(item.difficulty === levelName){
			allBrownCardsWithLevel.push(item.id);
		}
	}

	// console.log(allBrownNormalCards);
	// console.log(allBrownCardsWithLevel);

	greenCount = +counts[0][0] + +counts[1][0] + +counts[2][0];
	blueCount = +counts[0][1] + +counts[1][1] + +counts[2][1];
	brownCount = +counts[0][2] + +counts[1][2] + +counts[2][2];

	while(allBlueCardsWithLevel.length < blueCount){
			allBlueCardsWithLevel.push(allBlueNormalCards[allBlueNormalCards.length - 1]);
			allBlueNormalCards.pop();
	}

	while(allGreenCardsWithLevel.length < greenCount){
		allGreenCardsWithLevel.push(allGreenNormalCards[allGreenNormalCards.length - 1]);
		allGreenNormalCards.pop();
	}

	while(allBrownCardsWithLevel.length < brownCount){
		allBrownCardsWithLevel.push(allBrownNormalCards[allBrownNormalCards.length - 1]);
		allBrownNormalCards.pop();
		// console.log(allBrownCardsWithLevel);
	}

	// console.log(allBrownCardsWithLevel);

	fillAllCardsWithLevels();
}


const easyNormalHardLevel = (levelName) => {

	fillCounts();

	for(let item of blueCardsData){
		if(item.difficulty !== levelName)
		allBlueCardsWithLevel.push(item.id);
	}

	for(let item of greenCardsData){
		if(item.difficulty !== levelName)
		allGreenCardsWithLevel.push(item.id);
	}

	for(let item of brownCardsData){
		if(item.difficulty !== levelName)
		allBrownCardsWithLevel.push(item.id);
	}

	fillAllCardsWithLevels();
}

const fillCounts = () => {
	stages.forEach((item, index) => {
		counts[index][0] = STATE_WRAPPERS[index].children[0].textContent;
		counts[index][1] = STATE_WRAPPERS[index].children[1].textContent;
		counts[index][2] = STATE_WRAPPERS[index].children[2].textContent;
	});
}

const fillAllCardsWithLevels = () => {

	allBlueCardsWithLevel = shuffleArray(allBlueCardsWithLevel);
	allGreenCardsWithLevel = shuffleArray(allGreenCardsWithLevel);
	allBrownCardsWithLevel = shuffleArray(allBrownCardsWithLevel);

	let blueCount = 0,
		 greenCount = 0,
		 brownCount = 0;

	stages.forEach((item, index) => {
		
		blueCount = 0;
		greenCount = 0;
		brownCount = 0;

		while(greenCount < counts[index][0]){
			item.push(`assets/MythicCards/green/${allGreenCardsWithLevel[allGreenCardsWithLevel.length - 1]}.png`);
				allGreenCardsWithLevel.pop();
				greenCount++;
		}

		while(blueCount < counts[index][1]){
				item.push(`assets/MythicCards/blue/${allBlueCardsWithLevel[allBlueCardsWithLevel.length - 1]}.png`);
				allBlueCardsWithLevel.pop();
				blueCount++;
		}

		while(brownCount < counts[index][2]){
			item.push(`assets/MythicCards/brown/${allBrownCardsWithLevel[allBrownCardsWithLevel.length - 1]}.png`);
				allBrownCardsWithLevel.pop();
				brownCount++;
		}

		newStages.push(item);
	})
}

const normalCards = () => {
	for(let item of blueCardsData){
		if(item.difficulty === 'normal')
		allBlueNormalCards.push(item.id);
	}

	for(let item of greenCardsData){
		if(item.difficulty === 'normal')
		allGreenNormalCards.push(item.id);
	}

	for(let item of brownCardsData){
		if(item.difficulty === 'normal')
		allBrownNormalCards.push(item.id);
	}

	allBlueNormalCards = shuffleArray(allBlueNormalCards);
	allGreenNormalCards = shuffleArray(allGreenNormalCards);
	allBrownNormalCards = shuffleArray(allBrownNormalCards);
}

const chooseCard = () => {

	newStages[0] = shuffleArray(newStages[0]);
	newStages[1] = shuffleArray(newStages[1]);
	newStages[2] = shuffleArray(newStages[2]);

	let currentCard;
	
	if(newStages.every(item => item.length === 0)){
		CHOOSE_CARD.classList.add('none'); 
	}
	else{
		if(newStages[0].length !== 0){
			currentCard = newStages[0][newStages[0].length - 1];
			state = 0;
		}
		else if(newStages[1].length !== 0){
			currentCard = newStages[1][newStages[1].length - 1];
			state = 1;
		}
		else if(newStages[2].length !== 0){
			currentCard = newStages[2][newStages[2].length - 1];
			state = 2;
		}

		
		if(currentCard.includes('green')){
			counts[state][0]--;
			STATE_WRAPPERS[state].children[0].textContent = counts[state][0];
		}
		else if(currentCard.includes('blue')){
			counts[state][1]--;
			STATE_WRAPPERS[state].children[1].textContent = counts[state][1];
		}
		else if(currentCard.includes('brown')){
			counts[state][2]--;
			STATE_WRAPPERS[state].children[2].textContent = counts[state][2];
		}

		CHOOSE_CARD.src = currentCard;
		newStages[state].pop();
	}
}

const getRandomNum = (min, max) => {
	return Math.trunc(Math.random() * (max - min) + min);
}

const shuffleArray = (array) => {
	return array.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
}

ANCIENTS.forEach(item => item.addEventListener('click', e => chooseAncientCard(e)));
console.log('Все должно работать корректно при перезагрузке, извините за неудобства/')