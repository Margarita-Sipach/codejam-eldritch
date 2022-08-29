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
		if(item.name === level.textContent){
			normalLevel();
		}
	}

	CARDS_WRAPPER.classList.remove('none');
	
	CARD_MIX_BTN.addEventListener('click', chooseCard)
}



const normalLevel = () => {

	let randomNumber;
	let blueCount = 0,
		 greenCount = 0,
		 brownCount = 0;

	for(let item of blueCardsData){
		allBlueCardsWithLevel.push(item.id);
	}

	for(let item of greenCardsData){
		allGreenCardsWithLevel.push(item.id);
	}

	for(let item of brownCardsData){
		allBrownCardsWithLevel.push(item.id);
	}

	stages.forEach((item, index) => {
		
		counts[index][0] = STATE_WRAPPERS[index].children[0].textContent;
		counts[index][1] = STATE_WRAPPERS[index].children[1].textContent;
		counts[index][2] = STATE_WRAPPERS[index].children[2].textContent;

		let blueCount = 0,
		greenCount = 0,
		brownCount = 0;

		item = new Set();

		while(blueCount < counts[index][0]){
			randomNumber = getRandomNum(0, allBlueCardsWithLevel.length)
			item.add(`assets/MythicCards/blue/${allBlueCardsWithLevel[randomNumber]}.png`);
			blueCount++;
			// console.log(blueCount);
		}

		while(greenCount < counts[index][1]){
			randomNumber = getRandomNum(0, allGreenCardsWithLevel.length)
			item.add(`assets/MythicCards/green/${allGreenCardsWithLevel[randomNumber]}.png`);
			greenCount++;
			// console.log(greenCount);
		}

		while(brownCount < counts[index][2]){
			randomNumber = getRandomNum(0, allBrownCardsWithLevel.length)
			item.add(`assets/MythicCards/brown/${allBrownCardsWithLevel[randomNumber]}.png`);
			brownCount++;
			// console.log(newStages);
		}

		newStages.push(shuffleArray(Array.from(item)));
	})

	console.log(newStages);
	console.log(counts);
}

const chooseCard = () => {

	let currentCard;

	console.log(newStages);
	console.log(counts);
	
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

		console.log(currentCard);

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

	// if(counts.every(item => Number(item) === 0)){
		// 	// 	if(state === 2){
		// 	// 		CHOOSE_CARD.classList.add('none');
		// 	// 	}
		// 	// 	else{
		// 	// 		mixCards(++state);
		// 	// 	}
		// 	// }
		// 	// else if(currentColorNumber === 0){		
		// 	// 	if(counts[0] === '0'){
		// 	// 		mixCards(state);
		// 	// 	}
		// 	// 	else{
		// 	// 		currentCardNumber = getRandomNum(0, blueCardsData.length)
		// 	// 		CHOOSE_CARD.src = `assets/MythicCards/blue/${blueCardsData[currentCardNumber].id}.png`;
		// 	// 		STATE_WRAPPERS[state].children[0].textContent = --counts[0];
		// 	// 	}
		// 	// }
		// 	// else if(currentColorNumber === 1){
		// 	// 	if(counts[1] === '0'){
		// 	// 		mixCards(state);
		// 	// 	}
// }

// const mixCards = (state) => {
	
// 	currentColorNumber = getRandomNum(0, 3);

// 	counts[0] = STATE_WRAPPERS[state].children[0].textContent;
// 	counts[1] = STATE_WRAPPERS[state].children[1].textContent;
// 	counts[2] = STATE_WRAPPERS[state].children[2].textContent;

// 	if(counts.every(item => Number(item) === 0)){
// 		if(state === 2){
// 			CHOOSE_CARD.classList.add('none');
// 		}
// 		else{
// 			mixCards(++state);
// 		}
// 	}
// 	else if(currentColorNumber === 0){		
// 		if(counts[0] === '0'){
// 			mixCards(state);
// 		}
// 		else{
// 			currentCardNumber = getRandomNum(0, blueCardsData.length)
// 			CHOOSE_CARD.src = `assets/MythicCards/blue/${blueCardsData[currentCardNumber].id}.png`;
// 			STATE_WRAPPERS[state].children[0].textContent = --counts[0];
// 		}
// 	}
// 	else if(currentColorNumber === 1){
// 		if(counts[1] === '0'){
// 			mixCards(state);
// 		}
// 		else{
// 			currentCardNumber = getRandomNum(0, greenCardsData.length)
// 			CHOOSE_CARD.src = `assets/MythicCards/green/${greenCardsData[currentCardNumber].id}.png`;
// 			STATE_WRAPPERS[state].children[1].textContent = --counts[1];
// 		}
// 	}
// 	else if(currentColorNumber === 2){
// 		if(counts[2] === '0'){
// 			mixCards(state);
// 		}
// 		else{
// 			currentCardNumber = getRandomNum(0, brownCardsData.length)
// 			CHOOSE_CARD.src = `assets/MythicCards/brown/${brownCardsData[currentCardNumber].id}.png`;
// 			STATE_WRAPPERS[state].children[2].textContent = --counts[2];
// 		}
// 	}

// 	console.log(currentColorNumber);
// 	console.log(currentCardNumber);
// }

// const cardsInit = (item) => {

// 	console.log(item)


// 	counts[0] = STATE_WRAPPERS[state].children[0].textContent;
// 	counts[1] = STATE_WRAPPERS[state].children[1].textContent;
// 	counts[2] = STATE_WRAPPERS[state].children[2].textContent;

// 	for(let i = 0; i < counts[0]; i++){
// 		item.push(`assets/MythicCards/blue/${blueCardsData[getRandomNum(0, blueCardsData.length)].id}.png`)
// 	}

// 	for(let i = 0; i < counts[1]; i++){
// 		item.push(`assets/MythicCards/green/${greenCardsData[getRandomNum(0, greenCardsData.length)].id}.png`)
// 	}

// 	for(let i = 0; i < counts[2]; i++){
// 		item.push(`assets/MythicCards/brown/${brownCardsData[getRandomNum(0, brownCardsData.length)].id}.png`)
// 	}

// 	console.log(firstState);
// }

// const mixCards = (state) => {
	
// 	currentColorNumber = getRandomNum(0, 3);

// 	counts[0] = STATE_WRAPPERS[state].children[0].textContent;
// 	counts[1] = STATE_WRAPPERS[state].children[1].textContent;
// 	counts[2] = STATE_WRAPPERS[state].children[2].textContent;

// 	for(let i = 0; i < counts[0]; i++){
// 		firstState.push(`assets/MythicCards/blue/${blueCardsData[getRandomNum(0, blueCardsData.length)].id}.png`)
// 	}

// 	for(let i = 0; i < counts[1]; i++){
// 		firstState.push(`assets/MythicCards/green/${greenCardsData[getRandomNum(0, greenCardsData.length)].id}.png`)
// 	}

// 	for(let i = 0; i < counts[2]; i++){
// 		firstState.push(`assets/MythicCards/brown/${brownCardsData[getRandomNum(0, brownCardsData.length)].id}.png`)
// 	}

	

// 	// if(counts.every(item => Number(item) === 0)){
// 	// 	if(state === 2){
// 	// 		CHOOSE_CARD.classList.add('none');
// 	// 	}
// 	// 	else{
// 	// 		mixCards(++state);
// 	// 	}
// 	// }
// 	// else if(currentColorNumber === 0){		
// 	// 	if(counts[0] === '0'){
// 	// 		mixCards(state);
// 	// 	}
// 	// 	else{
// 	// 		currentCardNumber = getRandomNum(0, blueCardsData.length)
// 	// 		CHOOSE_CARD.src = `assets/MythicCards/blue/${blueCardsData[currentCardNumber].id}.png`;
// 	// 		STATE_WRAPPERS[state].children[0].textContent = --counts[0];
// 	// 	}
// 	// }
// 	// else if(currentColorNumber === 1){
// 	// 	if(counts[1] === '0'){
// 	// 		mixCards(state);
// 	// 	}
// 	// 	else{
// 	// 		currentCardNumber = getRandomNum(0, greenCardsData.length)
// 	// 		CHOOSE_CARD.src = `assets/MythicCards/green/${greenCardsData[currentCardNumber].id}.png`;
// 	// 		STATE_WRAPPERS[state].children[1].textContent = --counts[1];
// 	// 	}
// 	// }
// 	// else if(currentColorNumber === 2){
// 	// 	if(counts[2] === '0'){
// 	// 		mixCards(state);
// 	// 	}
// 	// 	else{
// 	// 		currentCardNumber = getRandomNum(0, brownCardsData.length)
// 	// 		CHOOSE_CARD.src = `assets/MythicCards/brown/${brownCardsData[currentCardNumber].id}.png`;
// 	// 		STATE_WRAPPERS[state].children[2].textContent = --counts[2];
// 	// 	}
// 	// }

// 	// console.log(currentColorNumber);
// 	// console.log(currentCardNumber);
// }

const getRandomNum = (min, max) => {
	return Math.trunc(Math.random() * (max - min) + min);
}

const shuffleArray = (array) => {
	return array.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
}

ANCIENTS.forEach(item => item.addEventListener('click', e => chooseAncientCard(e)));