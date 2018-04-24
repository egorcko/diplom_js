window.addEventListener('DOMContentLoaded', function () {

// preloader 

	let preloader = document.querySelector('.preloader-overlay');

	let preloaderTimer = setTimeout(hidePreloader, 3000);
	
	function hidePreloader() {
		preloader.style.display = 'none';
	}

// main variables

	let main_page = document.querySelector('.main'),
		custom_page = document.querySelector('.custom');

// Modal

	let popup_overlay = document.querySelector('.overlay'),
		popup_btn = document.getElementById('popup-btn'),
		popup_window = document.querySelector('.popup');

	popup_btn.addEventListener('click', function(){
		popup_window.classList.add('bounceOut');
		let timerId = setTimeout(timer, 1000);
	});

	function timer() {
		popup_overlay.style.display = 'none';
		customShow();
	}

// Clear results

	let reset = document.getElementById('reset');

	reset.addEventListener('click', () => {
		
		customShow();
	});

	function customShow() {
		main_page.style.display = 'none';
		custom_page.style.display = 'flex';
		let childs = document.querySelectorAll('div.custom > div');
		for (let i = 0; i < childs.length; i++) {
			childs[i].style.display = 'block';
		}
	}


// Custom to main

	let mainCards = document.querySelector('.main-cards'),
		mainCards_childs = mainCards.getElementsByClassName('main-cards-item'),
		custom_done_btn = document.getElementById('ready');

	let newCard = mainCards_childs[1].cloneNode(true),
		photo_block = newCard.querySelectorAll('div.candidate-block > div.photo'),
		candidate_block = newCard.querySelector('.candidate-block'),
		newCard_result = candidate_block.querySelector('.result');
	
	newCard.classList.add('main-cards-item');
	mainCards.appendChild(newCard);
	newCard.style.display = 'none';

	photo_block[0].remove();

	let person = document.querySelector('.person'),
		newPerson = person.cloneNode(true);

	newPerson.style.marginRight = '30px';
	candidate_block.insertBefore(newPerson, newCard_result);

// Custom data

	var main_name = newCard.querySelector('.name'),
		main_age = newCard.querySelector('.age'),
		main_sex = newCard.querySelector('.sex'),
		main_views = newCard.querySelector('.views'),
		main_bio = newCard.querySelector('.bio'),
		custom_name = document.getElementById('name');
		custom_age = document.getElementById('age'),
		radio = document.querySelector('.radio'),
		custom_sex_male = radio.getElementsByTagName('input')[0],
		custom_sex_female = radio.getElementsByTagName('input')[1],
		custom_views = document.getElementById('select'),
		custom_bio = document.getElementById('bio');

	let custom_info = document.querySelector('.custom-info');

	custom_info.addEventListener('input', () => {
		if (custom_name.value != '' && custom_age.value != '' && custom_bio.value != '') {
			custom_done_btn.classList.remove('not-available');
			custom_done_btn.classList.add('btn');
		} else {
			custom_done_btn.classList.remove('btn');
			custom_done_btn.classList.add('not-available');
		}
	});

	custom_age.addEventListener('input', function(event){

		if (custom_age.value < 35 || custom_age.value > 65) {
			custom_age.style.cssText = 'border: 2px solid red;'
		} else {custom_age.style.cssText = '';}
	});

	custom_done_btn.addEventListener('click', function (event) {
		event.preventDefault();

		for (var i = 0; i < mainCards_childs.length; i++) {
			if(mainCards_childs[i].classList.contains('main-cards-item-active')) {
				mainCards_childs[i].classList.remove('main-cards-item-active');
			}
		}
			
		if (custom_sex_male.checked) {
			var sex_val = custom_sex_male.value;
		} else {sex_val = custom_sex_female.value;}
		
		const canidate = new candidateData(custom_name.value, custom_age.value, sex_val, custom_views.value, custom_bio.value);
		canidate.createCandidate();

		main_page.style.display = 'block';
		custom_page.style.display = 'none';
		newCard.style.display = 'block';
		newCard.classList.remove('delay_1');
		newCard.classList.add('delay_2');

		countSet(0);
	});

	class candidateData {
		constructor (name, age, sex, views, bio) {
			this.name = name;
			this.age = age;
			this.sex = sex;
			this.views = views;
			this.bio = bio;
		}
		createCandidate() {
			main_name.textContent = this.name;
			main_age.textContent = `${this.age} лет`;
			main_sex.textContent = this.sex;
			main_views.textContent = this.views;
			main_bio.textContent = this.bio;
		}
	}

// Custom view choise

	
	let skinCounter = 1,
		hairCounter = 1,
		clothesCounter = 1;
	var isWoman = '';

	function hideChar() {
		let currentSkin_1 = document.getElementsByClassName(`skin-color-${skinCounter}`)[0];
		currentSkin_1.style.display = '';
		center_skin.style.cssText = '';
		mainPerson_skin.style.cssText = '';

		let currentHair_1 = document.getElementsByClassName(`hair-style${isWoman}-${hairCounter}`)[0];
		currentHair_1.style.display = '';
		center_hair.style.cssText = '';
		mainPerson_hair.style.cssText = '';

		let currentClothes_1 = document.getElementsByClassName(`clothes-style${isWoman}-${clothesCounter}`)[0];
		currentClothes_1.style.display = '';
		center_clothes.style.cssText = '';
		mainPerson_clothes.style.cssText = '';
	};

	function showChar() {
		let currentSkin_2 = document.getElementsByClassName(`skin-color-${skinCounter}`)[0];
		currentSkin_2.style.display = 'block';
		center_skin.style.cssText = `background: url(img/skin/skin${isWoman}-${skinCounter}.png) center no-repeat; background-size: cover;`;
		mainPerson_skin.style.cssText = `background: url(../img/skin/skin${isWoman}-${skinCounter}.png) center no-repeat; background-size: cover;`;

		let currentHair_2 = document.getElementsByClassName(`hair-style${isWoman}-${hairCounter}`)[0];
		currentHair_2.style.display = 'block';
		center_hair.style.cssText = `background: url('img/hair/construct/hair${isWoman}-${hairCounter}.png') center no-repeat; background-size: cover;`;
		mainPerson_hair.style.cssText = `background: url('img/hair/construct/hair${isWoman}-${hairCounter}.png') center no-repeat; background-size: cover;`;

		let currentClothes_2 = document.getElementsByClassName(`clothes-style${isWoman}-${clothesCounter}`)[0];
		currentClothes_2.style.display = 'block';
		center_clothes.style.cssText = `background: url('img/clothes/construct/clothes${isWoman}-${clothesCounter}.png') center no-repeat; background-size: cover;`;
		mainPerson_clothes.style.cssText = `background: url('img/clothes/construct/clothes${isWoman}-${clothesCounter}.png') center no-repeat; background-size: cover;`;

		center_shoes.classList.add(`person-shoes${isWoman}`);
		mainPerson_shoes.classList.add(`person-shoes${isWoman}`);
	};

	radio.addEventListener('change', function (event) {
		
		hideChar();

		let target = event.target;
		if (target.hasAttribute('checked')) {
			target.removeAttribute('checked');
		} 
		target.setAttribute('checked', 'true');
		

		if (target.id == 'male') {isWoman = '';}
		else if (target.id == 'female') {isWoman = '-woman';}
		
		showChar();

	});


	let skin_prev = document.querySelectorAll('div.skin > div.prev')[0],
		skin_next = document.querySelectorAll('div.skin > div.next')[0],
		skin_color = document.getElementsByClassName('skin-color'),
		hair_prev = document.querySelectorAll('div.hair > div.prev')[0],
		hair_next = document.querySelectorAll('div.hair > div.next')[0],
		hair_style = document.querySelectorAll('.hair-style'),
		hair_style_woman = document.querySelectorAll('.hair-style-woman'),
		clothes_prev = document.querySelectorAll('div.clothes > div.prev')[0],
		clothes_next = document.querySelectorAll('div.clothes > div.next')[0],
		clothes_style = document.querySelectorAll('.clothes-style'),
		clothes_style_woman = document.querySelectorAll('.clothes-style-woman'),
		custom_char = document.querySelector('.custom-char');

	let center_skin = custom_char.querySelector('.person-skin'),
		center_hair = custom_char.querySelector('.person-hair'),
		center_clothes = custom_char.querySelector('.person-clothes'),
		center_shoes = custom_char.querySelector('.person-shoes');

	let mainPerson_skin = newPerson.querySelector('.person-skin'),
		mainPerson_hair = newPerson.querySelector('.person-hair'),
		mainPerson_clothes = newPerson.querySelector('.person-clothes'),
		mainPerson_shoes = newPerson.querySelector('.person-shoes');

	skinShow(skinCounter);
	hairShow(hairCounter);
	clothesShow(clothesCounter);

	function skinShow(n) {
			if (n < 1) {skinCounter = skin_color.length;}
			if (n > skin_color.length) {skinCounter = 1;}

			for (let i = 0; i < skin_color.length; i++) {
				skin_color[i].style.display = 'none';
			}

			let currentSkin = document.getElementsByClassName(`skin-color-${skinCounter}`)[0];
			currentSkin.style.display = 'block';
			
			center_skin.style.cssText = `background: url(img/skin/skin${isWoman}-${skinCounter}.png) center no-repeat;
										background-size: cover;`;
			mainPerson_skin.style.cssText = `background: url(img/skin/skin${isWoman}-${skinCounter}.png) center no-repeat;
										background-size: cover;`;

		}

		function plusSlidesSkin(n) {
			skinShow(skinCounter += n);
		}

		skin_prev.addEventListener('click', function(){
			plusSlidesSkin(-1);
		});
		skin_next.addEventListener('click', function(){
			plusSlidesSkin(1);
		});
		

		function hairShow(n) {
			if (n < 1) {hairCounter = hair_style.length;}
			if (n > hair_style.length) {hairCounter = 1;}



			for (let i = 0; i < hair_style.length; i++) {
				hair_style[i].style.display = 'none';
			}
			for (let i = 0; i < hair_style_woman.length; i++) {
				hair_style_woman[i].style.display = 'none';
			}

			let currentHair = document.getElementsByClassName(`hair-style${isWoman}-${hairCounter}`)[0];
			currentHair.style.display = 'block';
			
			
			center_hair.style.cssText = `background: url('img/hair/construct/hair${isWoman}-${hairCounter}.png') center no-repeat;
										background-size: cover;`;
			mainPerson_hair.style.cssText = `background: url('img/hair/construct/hair${isWoman}-${hairCounter}.png') center no-repeat;
										background-size: cover;`;
		}

		function plusSlidesHair(n) {
			hairShow(hairCounter += n);
		}

		hair_prev.addEventListener('click', function(){
			plusSlidesHair(-1);
		});
		hair_next.addEventListener('click', function(){
			plusSlidesHair(1);
		});

		function clothesShow(n) {
			if (n < 1) {clothesCounter = clothes_style.length;}
			if (n > clothes_style.length) {clothesCounter = 1;}

			for (let i = 0; i < clothes_style.length; i++) {
				clothes_style[i].style.display = 'none';
			}
			for (let i = 0; i < clothes_style_woman.length; i++) {
				clothes_style_woman[i].style.display = 'none';
			}

			let currentClothes = document.getElementsByClassName(`clothes-style${isWoman}-${clothesCounter}`)[0];
			currentClothes.style.display = 'block';
			
			
			center_clothes.style.cssText = `background: url('img/clothes/construct/clothes${isWoman}-${clothesCounter}.png') center no-repeat;
										background-size: cover;`;
			mainPerson_clothes.style.cssText = `background: url('img/clothes/construct/clothes${isWoman}-${clothesCounter}.png') center no-repeat;
										background-size: cover;`;
		}

		function plusSlidesClothes(n) {
			clothesShow(clothesCounter += n);
		}

		clothes_prev.addEventListener('click', function(){
			plusSlidesClothes(-1);
		});
		clothes_next.addEventListener('click', function(){
			plusSlidesClothes(1);
		});



// results 0
	function countSet(resultCount) {

		let result_value = document.getElementsByClassName('result-count'),
			result_progress = document.getElementsByClassName('progress-bar');

		for (let i = 0; i < result_value.length; i++) {
			result_value[i].textContent = `${resultCount}%`;
			result_progress[i].style.cssText = `height: ${resultCount}%;`;
		}

// fair elections
		let honest = document.getElementById('voting');

		honest.addEventListener('click', () => {
			for (let i = 0; i < mainCards_childs.length; i++) {
				if(mainCards_childs[i].classList.contains('main-cards-item-active')) {
					mainCards_childs[i].classList.remove('main-cards-item-active');
				}
			}

			let progress_1 = Math.floor(Math.random()*100),
				progress_2 = Math.floor(Math.random()*(100-progress_1)),
				progress_3 = 100-(progress_1+progress_2),
				progress_array = [progress_1, progress_2, progress_3];

			for (let i = 0; i < result_value.length; i++) {
				result_value[i].textContent = `${progress_array[i]}%`;
				result_progress[i].style.cssText = `height: ${progress_array[i]}%;`;
			}
//winner
			let max;
			if (progress_1 > progress_2) {max = progress_1;}
			else {max = progress_2;}

			if (max < progress_3) {max = progress_3;}

			for (let i = 0; i < result_value.length; i++) {
				if (result_value[i].innerHTML === `${max}%`) {mainCards_childs[i].classList.add('main-cards-item-active');}
			}
		});

// unfair elections
		
		let crime = document.getElementById('crime');

		crime.addEventListener('click', () => {
			for (var i = 0; i < mainCards_childs.length; i++) {
				if(mainCards_childs[i].classList.contains('main-cards-item-active')) {
					mainCards_childs[i].classList.remove('main-cards-item-active');
				}
			}

			let progress_crime_1 = Math.floor(Math.random()*75),
				progress_crime_2 = Math.floor(Math.random()*(75-progress_crime_1)),
				progress_crime_3 = (75-(progress_crime_1+progress_crime_2))+25,
				progress_crime_array = [progress_crime_1, progress_crime_2, progress_crime_3];

			for (let i = 0; i < result_value.length -1 ; i++) {
				result_value[i].textContent = `${progress_crime_array[i]}%`;
				result_progress[i].style.cssText = `height: ${progress_crime_array[i]}%;`;
			}
			result_value[result_value.length-1].textContent = `${progress_crime_3}%`;
			result_progress[result_value.length-1].style.cssText = `height: ${progress_crime_3}%;`;
//winner
			let max;
			if (progress_crime_1 > progress_crime_2) {max = progress_crime_1;}
			else {max = progress_crime_2;}

			if (max < progress_crime_3) {max = progress_crime_3;}

			for (let i = 0; i < result_value.length; i++) {
				if (result_value[i].innerHTML === `${max}%`) {mainCards_childs[i].classList.add('main-cards-item-active');}
			}
		});
	}

});




	

	