$(window).on('load', function () {
	console.log('qq');

// Map number x from range [a, b] to [c, d]
const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;

// Gets the mouse position
const getMousePos = (e) => {
		let posx = 0;
		let posy = 0;
		if (!e) e = window.event;
		if (e.pageX || e.pageY) {
				posx = e.pageX;
				posy = e.pageY;
		}
		else if (e.clientX || e.clientY)    {
				posx = e.clientX + body.scrollLeft + document.documentElement.scrollLeft;
				posy = e.clientY + body.scrollTop + document.documentElement.scrollTop;
		}

		return { x : posx, y : posy }
};

// Generate a random float.
const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

const menuEl = document.querySelector('.menu');

class Menu {
	constructor(el) {
			console.log('class Menu');
			console.log(el);
			// el is the menu element (<nav>)
			this.DOM = {el: el};
			// the menu item elements (<a>)
			this.DOM.menuItems = this.DOM.el.querySelectorAll('.menu__item');
			// menu item properties that will animate as we move the mouse around the menu
			// we will be using interpolation to achieve smooth animations.
			// the “previous” and “current” values are the values to interpolate.
			// the value applied to the element, this case the image element (this.DOM.reveal) will be a value between these two values at a specific increment.
			// the amt is the amount to interpolate.
			this.animatableProperties = {
					// translationX
					tx: {previous: 0, current: 0, amt: 0.08},
					// translationY
					ty: {previous: 0, current: 0, amt: 0.08},
					// Rotation angle
					rotation: {previous: 0, current: 0, amt: 0.04},
					// CSS filter (brightness) value
					brightness: {previous: 1, current: 1, amt: 0.08},
			};
			// array of MenuItem instances
			this.menuItems = [];
			// initialize the MenuItems
			[...this.DOM.menuItems].forEach((item, pos) => this.menuItems.push(new MenuItem(item, pos, this.animatableProperties)));
			// show the menu items (initial animation where each menu item gets revealed)
			this.showMenuItems();
	}
	// initial animation for revealing the menu items
	showMenuItems() {
			gsap.to(this.menuItems.map(item => item.DOM.textInner), {
					duration: 1.2,
					ease: 'Expo.easeOut',
					startAt: {y: '100%'},
					y: 0,
					delay: pos => pos*0.06
			});
	}
}

new Menu(menuEl)

});