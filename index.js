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


		
const COLORS = ['blue', 'green', 'brown'];

let counts = [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
		state = 0;

let ancientChoosenCard,
	allCardsWithLevel = [],
	allGreenCardsWithLevel = [],
	allBrownCardsWithLevel = [],
	allBlueCardsWithLevel = [];

	let newStages = [];

	let currentColorNumber,
	currentCardNumber;

	let 	greenCards,
			brownCards,
			blueCards;
			// greenCount = 0,
			// brownCount = 0,
			// blueCount = 0;

	let stages = [[], [], []]; 

const chooseAncientCard = (e) => {
	newStages = []

	const ancient = e.target;
	ANCIENTS_IMG.forEach(item => item.classList.remove('ancient-active'));
	ancient.classList.add('ancient-active');

	ancientsData.forEach(item => {
		if(item.id === ancient.parentNode.id){
			ancientChoosenCard = item;
		}
	});

	showCardsCount();
	LEVELS.forEach(item => item.addEventListener('click', e => chooseLevel(e)));
	
}

const showCardsCount = () => {

	for (let key in ancientChoosenCard){
		if(key === 'firstStage'){
			STATE_WRAPPERS[0].children[0].textContent = ancientChoosenCard.firstStage.greenCards;
			STATE_WRAPPERS[0].children[1].textContent = ancientChoosenCard.firstStage.brownCards;
			STATE_WRAPPERS[0].children[2].textContent = ancientChoosenCard.firstStage.blueCards;
		}
		if(key === 'secondStage'){
			STATE_WRAPPERS[1].children[0].textContent = ancientChoosenCard.secondStage.greenCards;
			STATE_WRAPPERS[1].children[1].textContent = ancientChoosenCard.secondStage.brownCards;
			STATE_WRAPPERS[1].children[2].textContent = ancientChoosenCard.secondStage.blueCards;
		}
		if(key === 'thirdStage'){
			STATE_WRAPPERS[2].children[0].textContent = ancientChoosenCard.thirdStage.greenCards;
			STATE_WRAPPERS[2].children[1].textContent = ancientChoosenCard.thirdStage.brownCards;
			STATE_WRAPPERS[2].children[2].textContent = ancientChoosenCard.thirdStage.blueCards;
		}
	}
}

const chooseLevel = (e) => {
	newStages = []

	const level = e.target;
	LEVELS.forEach(item =>item.classList.remove('level-active'));
	level.classList.add('level-active');
	CARD_MIX_BTN.classList.remove('none');

	for(let item of difficulties){
		if(level.id === 'easy'){
			easyNormalHardLevel('hard');
		}
		if(level.id === 'normal'){
			easyNormalHardLevel('');
		}
		if(level.id === 'hard'){
			easyNormalHardLevel('easy');
		}
	}

	CARDS_WRAPPER.classList.remove('none');
	
	CARD_MIX_BTN.addEventListener('click', chooseCard)
}


const easyNormalHardLevel = (levelName) => {

	let randomNumber;
	let blueCount = 0,
		 greenCount = 0,
		 brownCount = 0;

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

	stages.forEach((item, index) => {
		
		counts[index][0] = STATE_WRAPPERS[index].children[0].textContent;
		counts[index][1] = STATE_WRAPPERS[index].children[1].textContent;
		counts[index][2] = STATE_WRAPPERS[index].children[2].textContent;

		blueCount = 0;
		greenCount = 0;
		brownCount = 0;

		while(blueCount < counts[index][0]){
			randomNumber = getRandomNum(0, allBlueCardsWithLevel.length)
			if(!item.includes(`assets/MythicCards/blue/${allBlueCardsWithLevel[randomNumber]}.png`)){
				item.push(`assets/MythicCards/blue/${allBlueCardsWithLevel[randomNumber]}.png`);
				blueCount++;
			}
		}

		while(greenCount < counts[index][1]){
			randomNumber = getRandomNum(0, allGreenCardsWithLevel.length)
			if(!item.includes(`assets/MythicCards/green/${allGreenCardsWithLevel[randomNumber]}.png`)){
				item.push(`assets/MythicCards/green/${allGreenCardsWithLevel[randomNumber]}.png`);
				greenCount++;
			}
		}

		while(brownCount < counts[index][2]){
			randomNumber = getRandomNum(0, allBrownCardsWithLevel.length);
			if(!item.includes(`assets/MythicCards/brown/${allBrownCardsWithLevel[randomNumber]}.png`)){
				item.push(`assets/MythicCards/brown/${allBrownCardsWithLevel[randomNumber]}.png`);
				brownCount++;
			}
		}

		newStages.push(shuffleArray(item));
	})
}




const chooseCard = () => {

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

		if(currentCard.includes('blue')){
			counts[state][0]--;
			STATE_WRAPPERS[state].children[0].textContent = counts[state][0];
		}
		else if(currentCard.includes('green')){
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