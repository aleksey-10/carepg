// login settings 

window.onload = () => setData(modal_login);

modal_login.addEventListener( 'click', event => {
	if (event.target == modal_login) modal_login.style.display = 'none';
} );

modal_login.querySelector('#xBtn').onclick = () => modal_login.style.display = 'none';

let toggleForm = formToggleDisplay(modal_login);

login.addEventListener('click', function(event){
	if (!event.target.classList.contains('btn')) return;
	toggleForm();
});

let loginForm = document.form_login;

loginForm.onsubmit = () => { 
	localStorage.setItem('name', loginForm.elements.name.value);
	toggleForm();
};

function formToggleDisplay(container) {
	let val = true;

	return function() {
		if (val) {
			container.style.display = 'flex';
		} else {
			container.style.display = 'none';
		}

		val = !val;

		setData(container);
	}
}

function setData(container) {
	if (!localStorage.length) return;
		
	setUserData( localStorage.getItem('name') );

	let logout = container.querySelector('#logout');
	logout.style.display = 'inline-block';
	loginForm.style.display = 'none';	
		
	showFormOnClick(logout);
}


function showFormOnClick(elem) {
	elem.onclick = () => {
		elem.style.display = 'none';
		localStorage.removeItem('name');

		loginForm.style.display = 'flex';

		setUserData('guest');
	}
}

function setUserData(name) {
	document.querySelector('.user-name').innerHTML = name;

	for (let elem of document.querySelectorAll('.user-pic') ) {
		if (name == 'guest') elem.style.color = 'silver';
		else elem.style.color = '#00CC44';
	}
}