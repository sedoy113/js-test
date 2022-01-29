(() => {
	const btn = document.querySelector('.btn');
	const playingField = document.querySelector('.playing-field');
	const container = document.querySelector('.container');
	const lineOne = 4;
	const lineTwo = 4;
	let hasFlippedCard = false;
	let firstCard;
	let secondCard;
	let blockCard = false;
	let numberOfSameCards = 0;
	let numberOfCards;

	btn.addEventListener('click', playGame);

	function playGame(e) {
		e.preventDefault();

		if (document.querySelector('.button-to-start')) {
			document.querySelector('.button-to-start').remove();
		}

		if (playingField.childNodes.length !== 0) {
			playingField.innerHTML = '';
		}

		playingField.style.gridTemplateColumns = `repeat(${lineTwo}, 150px)`;
		playingField.style.gridTemplateRows = `repeat(${lineOne}, 150px)`;

		let totalCards = lineOne * lineTwo;
		let arrayOfNumbers = createArray(totalCards);
		numberOfCards = arrayOfNumbers;

		shuffle(arrayOfNumbers);

		if (arrayOfNumbers) {
			arrayOfNumbers.forEach(el => {
				const card = document.createElement('div');
				const cardNumber = document.createElement('p');
				const cardShirt = document.createElement('div');

				cardShirt.classList.add('card-shirt');
				card.classList.add('card');
				cardNumber.classList.add('card-number');
				card.setAttribute('data-value', el);

				cardNumber.textContent = el;

				card.append(cardNumber);
				card.append(cardShirt);
				playingField.append(card);


				card.addEventListener('click', flipCard);
			})
		}
	}

	function createArray(cards) {
		const arr1 = [];
		let arr2 = [];
		const lengthOfArray = cards / 2;
		for (let i = 1; i <= lengthOfArray; i++) {
			arr1.push(i)
		}
		arr2 = arr1;
		const arrayOfNumbers = arr1.concat(arr2);
		return arrayOfNumbers;
	}

	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	function flipCard() {
		if (blockCard) return;
		if (this === firstCard) return;
		this.classList.add('flip');
		if (!hasFlippedCard) {
			hasFlippedCard = true;
			firstCard = this;
			return;
		}
		secondCard = this;
		checkCards();
	}

	function checkCards() {
		let isMatch = firstCard.dataset.value === secondCard.dataset.value;
		isMatch ? disableCards() : secondFlipCards();
	}

	function disableCards() {
		numberOfSameCards++;
		firstCard.removeEventListener('click', flipCard);
		secondCard.removeEventListener('click', flipCard);
		if (numberOfSameCards === numberOfCards.length / 2) {
			const buttonToStart = document.createElement('button');
			buttonToStart.classList.add('button-to-start', 'btn');
			buttonToStart.textContent = 'Сыграть ещё раз';
			container.append(buttonToStart);
			numberOfSameCards = 0;
			buttonToStart.addEventListener('click', playGame);
		}
		resetBoard();
	}

	function secondFlipCards() {
		blockCard = true;
		setTimeout(() => {
			firstCard.classList.remove('flip');
			secondCard.classList.remove('flip');
			resetBoard();
		}, 1500);
	}

	function resetBoard() {
		hasFlippedCard = false;
		blockCard = false;
		firstCard = null;
		secondCard = null;
	}
})();