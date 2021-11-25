const sliderControl = document.querySelector('.slider__control');
const previousButton = sliderControl.querySelector('.slider__button--previous');
const nextButton = sliderControl.querySelector('.slider__button--next');
const userInputs = Array.from(document.querySelectorAll('.subscribe__input'));
const subscribeForm = document.querySelector('.subscribe__form');
const confirmMessage = document.querySelector('.subscribe__confirm');

sliderControl.addEventListener('click', (evt) => {
	let target = evt.target;
	let slides = Array.from(document.querySelectorAll('.slider__item'));
	let leftHiddenSlide = document.querySelector('.slider__item--previous').previousElementSibling;
	let rightHiddenSlide = document.querySelector('.slider__item--next').nextElementSibling;

	if (target.classList.contains('slider__button--previous')) {
		slides.forEach(slide => {
			if (slide.classList.contains('slider__item--previous')) {
				slide.classList.remove('slider__item--previous');
				slide.classList.add('slider__item--hidden');
			} else if (slide.classList.contains('slider__item--current')) {
				slide.classList.remove('slider__item--current');
				slide.classList.add('slider__item--previous');
			} else if (slide.classList.contains('slider__item--next')) {
				slide.classList.remove('slider__item--next');
				slide.classList.add('slider__item--current');
			}
		})
		if (rightHiddenSlide) {
			rightHiddenSlide.classList.remove('slider__item--hidden');
			rightHiddenSlide.classList.add('slider__item--next');
		} else {
			slides[0].classList.remove('slider__item--hidden');
			slides[0].classList.add('slider__item--next');
		}
	}
	if (target.classList.contains('slider__button--next')) {
		slides.forEach(slide => {
			if (slide.classList.contains('slider__item--previous')) {
				slide.classList.remove('slider__item--previous');
				slide.classList.add('slider__item--current');
			} else if (slide.classList.contains('slider__item--current')) {
				slide.classList.remove('slider__item--current');
				slide.classList.add('slider__item--next');
			} else if (slide.classList.contains('slider__item--next')) {
				slide.classList.remove('slider__item--next');
				slide.classList.add('slider__item--hidden');
			}
		});
		if (leftHiddenSlide) {
			leftHiddenSlide.classList.remove('slider__item--hidden');
			leftHiddenSlide.classList.add('slider__item--previous');
		} else {
			slides[slides.length - 1].classList.remove('slider__item--hidden');
			slides[slides.length - 1].classList.add('slider__item--previous');
		}
	}
});

userInputs.forEach(input => {
	input.addEventListener('change', () => {
		if(input.value !== '') {
			input.nextElementSibling.classList.add('subscribe__hint--show');
		}
	})
});

subscribeForm.addEventListener('submit', (evt) => {
	evt.preventDefault();
	confirmMessage.classList.remove('subscribe__confirm--hide');
	userInputs.forEach(input => {
		input.value = "";
		input.nextElementSibling.classList.remove('subscribe__hint--show');
	});
	setTimeout(() => {
		confirmMessage.classList.add('subscribe__confirm--hide');
	}, 2000);
})
