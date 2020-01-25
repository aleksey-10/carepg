class Carousel {
	constructor (carus) {
		this.carus = carus;
		this.container = carus.querySelector('.container');
		this.active = this.container.querySelector('.active');
	}

	handleEvent(event) {
		if (event.target.classList.contains('left-arw')) this.turn(false);
		if (event.target.classList.contains('right-arw')) this.turn(true);

		if (event.target.parentElement.classList.contains('switcher')) {
			this.switcher = event.target.parentElement;
			this.switcherTurn();
		}
		if (event.target.classList.contains('switcher')) {
			this.switcher = event.target;
			this.switcherTurn();	
		}
	}

	turn(side) {

		const itemWidth = this.container.firstElementChild.clientWidth;

		if (!this.marg) this.marg = 0;

		let moveContainer = () => this.container.style.marginLeft = this.marg + 'px';

		if (side) {

			if (!this.active.nextElementSibling) {
				let first = this.container.firstElementChild;
				this.container.append(first);
				
				this.container.style.transition = 'none';
				this.marg += itemWidth;
				moveContainer();
			}

			this.active.nextElementSibling.classList.add('active');			
			this.marg -= itemWidth;
			
		} else {

			if (!this.active.previousElementSibling) {
				let last = this.container.lastElementChild;
				this.container.prepend(last);

				this.container.style.transition = 'none';
				this.marg -= itemWidth;
				moveContainer();
			}

			this.active.previousElementSibling.classList.add('active');
			this.marg += itemWidth;	
		}

		setTimeout(() => {
			this.container.style.transition = 'margin 0.5s';
			moveContainer();
		}, 0);

		this.active.classList.remove('active');
		this.active = this.container.querySelector('.active');
	}

	switcherTurn() {
		let nextIndex, prevIndex;

		for (let i = 0; i < this.container.children.length; i++) {
			if (this.container.children[i].classList.contains('active')) prevIndex = i;
			if (this.switcher.parentElement.children[i] == this.switcher) nextIndex = i;
		}

		let difference = nextIndex - prevIndex;

		for (let i = 0; i < Math.abs( difference ); i++ )
			if (difference < 0) this.turn(false);
			else this.turn(true);
	}
}