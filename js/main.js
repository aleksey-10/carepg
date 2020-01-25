// 1. menu

const headMobWidth = 1200;

let hdr = document.querySelector('header'), 
	nav = hdr.querySelector('#nav');

let menuShown = false;


// menu events (mobile width)

hdr.querySelector('#navIcon').addEventListener('click', function(event) {
	if ( menuShown ) return closeMenu(nav);
		
	toggleMenu(nav);
	setTimeout(() => nav.style.right = 0, 0 );
})

nav.addEventListener('transitionend', function() {
	if (nav.style.right == '-100%') toggleMenu(nav);
})

nav.addEventListener('click', (event) => { if(event.target == 'A') closeMenu(nav) } );

document.addEventListener('click', function(event) {
	if (event.target != nav) closeMenu(nav);
})

// events functions

function toggleMenu(menu) {
	menu.classList.toggle('show-menu');
	return menuShown = !menuShown;
}

function closeMenu(menu) {
	menu.style.right = '-100%';
}


// 2. add carousel from Carousel.js for block "carousel" on the top of page

let carouselContainer = document.querySelector('#carousel');
let carousel = new Carousel(carouselContainer);

carouselContainer.querySelector('.arw').addEventListener( 'click', carousel );


// 3. add carousel for block "work" from Carousel.js

let work = document.querySelector('#work'), 
	feature = work.querySelector('.feature');

let featureCarousel = new Carousel(feature);

setContainerWidth(feature.querySelector('.feature-describe'), work );
window.addEventListener('resize', () => setContainerWidth(feature.querySelector('.feature-describe'), work ) ); 

feature.querySelector('.feature-nav').addEventListener( 'click', featureCarousel );

feature.querySelector('.feature-nav').addEventListener('click', function(event) {
	if (!event.target.parentElement.classList.contains('switcher')) return;
	
	for (let switcher of this.children)
		switcher.classList.remove('selected-number');

	event.target.parentElement.classList.add('selected-number');
})

// functions

function setContainerWidth(container, sample) {
	for (elem of container.children) {
		elem.style.width = sample.clientWidth + 'px';
	}
}
