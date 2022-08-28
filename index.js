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

let COUNTS = [0, 0, 0]

let ancientChoosenCard,
	allCardsWithLevel = [],
	allGreenCardsWithLevel = [],
	allBrownCardsWithLevel = [],
	allBlueCardsWithLevel = [];



	let currentColorNumber,
	currentCardNumber;
			// greenCount = 0,
			// brownCount = 0,
			// blueCount = 0;


const chooseAncientCard = (e) => {
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
			// COUNTS[0] = STATE_WRAPPERS[0].children[0].textContent;
			// COUNTS[1] = STATE_WRAPPERS[1].children[0].textContent;
			// COUNTS[2] = STATE_WRAPPERS[2].children[0].textContent;
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
	const level = e.target;
	LEVELS.forEach(item =>item.classList.remove('level-active'));
	level.classList.add('level-active');
	CARD_MIX_BTN.classList.remove('none');

	for(let item of difficulties){
		if(item.name === level.textContent){
			normalLevel();
		}
	}

	CARDS_WRAPPER.classList.remove('none');
	CARD_MIX_BTN.addEventListener('click', mixCards)
}

const normalLevel = () => {
	blueCardsData.forEach(item => allBlueCardsWithLevel.push(item));
	brownCardsData.forEach(item => allBrownCardsWithLevel.push(item));
	greenCardsData.forEach(item => allGreenCardsWithLevel.push(item));
}

const mixCards = () => {
	
	currentColorNumber = getRandomNum(0, 3);

	if(currentColorNumber === 0){
		if(STATE_WRAPPERS[0].children[0].textContent !== 0)
		currentCardNumber = getRandomNum(0, blueCardsData.length)
		CHOOSE_CARD.src = `assets/MythicCards/blue/${blueCardsData[currentCardNumber].id}.png`;
		STATE_WRAPPERS[0].children[0].textContent = --STATE_WRAPPERS[0].children[0].textContent;
	}
	if(currentColorNumber === 1){
		currentCardNumber = getRandomNum(0, blueCardsData.length)
		CHOOSE_CARD.src = `assets/MythicCards/green/${greenCardsData[currentCardNumber].id}.png`;
		STATE_WRAPPERS[0].children[1].textContent = --STATE_WRAPPERS[0].children[1].textContent;
	}
	if(currentColorNumber === 2){
		currentCardNumber = getRandomNum(0, blueCardsData.length)
		CHOOSE_CARD.src = `assets/MythicCards/brown/${brownCardsData[currentCardNumber].id}.png`;
		STATE_WRAPPERS[0].children[2].textContent = --STATE_WRAPPERS[0].children[2].textContent;
	}	

	
			
			
	// console.log(blueCardsData[2].cardFace);
}




const getRandomNum = (min, max) => {
	return Math.trunc(Math.random() * (max - min) + min);
}

ANCIENTS.forEach(item => item.addEventListener('click', e => chooseAncientCard(e)));