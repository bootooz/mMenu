$(document).ready(function() {
	
	//Инициализация модуля
	mMenu.init({
		block: '.js-mMenu_append, .footer-menu, #footer .socials',
		button: '.js-mMenu__show-hide-btn',
		btnCloseMenuText: 'скрыть меню',
		btnCloseMenuClass: 'class1 class2',
		submenuClass: 'js-submenuClass',
		overlay: true
	});

});