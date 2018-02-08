mMenu = {

    defaultSettings: {
        menu: '.js-mMenu_append',
        comment: 'This block is added here using javascript. This initialize function - mMenu.init(). Look file main.js or common.js',
        btnHideMenuText: '',
    },

    isInit: false,

    init: function(userSettings = this.defaultSettings, _ = this) {

    	//Setup - это объект, который происходит из слияния "настроек по умолчанию" и "настроек переданных в init()"
    	//Причём настройки переданные в init() заменяют "настройки по умолчанию"
    	var setup = $.extend( _.defaultSettings, userSettings );

    	//_.isInit - Флаг инициализации модуля
        if (_.isInit){ return 'Error: This module is already initialized!';}
        
        //Каркас
        var mobileMenuHtml = '<div class="js-mMenu"><div class="js-mMenu_buttons"></div><div class="js-mMenu_list"></div></div>';    
        $('body').prepend(mobileMenuHtml);
        $('.js-mMenu').prepend('<!-- '+ setup.comment +' -->');


        //Инициализация кнопки "скрыть меню"
        _.setButtonHideMenu(setup.btnHideMenuText);

        //Добавление блоков в модуль (по умолчанию добавляется только $('.js-mMenu_append'))
        //В "setup.menu" можно передать другой набор блоков
        _.insertBlocks(setup.menu);

        _.setEventListener();

        _.isInit = true;

        return _;
    },

    insertBlocks: function(menu) {
    	var menu = $(menu).clone(true);
        
        menu.removeAttr('class').removeAttr('id').addClass('js-mMenu_is-appended');

        menu.appendTo(".js-mMenu .js-mMenu_list");
        
        //Вставляем кнопки для submenu
        $('.js-mMenu li.parent > a').addClass('js-mMenu_parent-link').append('<div class="js-mMenu_show-child"></div>');
    },

    getScrollbarWidth: function() {
        // создадим элемент с прокруткой
        var div = document.createElement('div');

        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';

        // при display:none размеры нельзя узнать
        // нужно, чтобы элемент был видим,
        // visibility:hidden - можно, т.к. сохраняет геометрию
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        var scrollWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);

        return scrollWidth;
    },

    setButtonHideMenu: function(btnHideMenuText) {

    	var btn = $('.js-mMenu__show-hide-btn').clone(true);
    	
    	if (btnHideMenuText)
    	{
    		btn.html(btnHideMenuText);
    	}

        btn.appendTo(".js-mMenu .js-mMenu_buttons");
    },
    setEventListener: function(_ = this) {

    	var menu = $('.js-mMenu'),
    		body = $('body');

    	//Кнопка "Показать / Скрыть меню"
        $('.js-mMenu__show-hide-btn').on('click', function(e) {
            var scrollWidth = _.getScrollbarWidth();

            menu.toggleClass('js-mMenu__showed');
            
            //Если меню открыли
            if (menu.hasClass('js-mMenu__showed'))
            {
	            //Отменяет прокрутку страницы.
	            body.addClass('js-mMenu__no-scroll');
	            
            	//Работа со скроллбаром
            	body.addClass('js-mMenu__scrBarrWidth'+scrollWidth);
            }
        	
        });

        //Действия после анимации меню.
        $('.js-mMenu').on('transitionend webkitTransitionEnd oTransitionEnd', function () {

        	// Для плавного появления скролбара.
            // Если меню закрыли. После того как меню спрячется, появится скролбар. 
            // Иначе из-за ширины скролбара страница дёргается. 
            if (!menu.hasClass('js-mMenu__showed'))
            {
            	var scrollWidth = _.getScrollbarWidth();
            	
            	//Возвращает прокрутку страницы.
	            body.removeClass('js-mMenu__no-scroll');

            	//Работа со скроллбаром
            	body.removeClass('js-mMenu__scrBarrWidth'+scrollWidth);
            }

        });

        //"Показать / Скрыть" вложенные пункты меню
        $('.js-mMenu_show-child').on('click', function(e) {
            e.preventDefault();
            $(this).toggleClass('js-mMenu_show-child--active').parent().next().slideToggle();
        });
    },

    destroy: function(_ = this) {
        if(!_.isInit){ return 'Error: This module is not initialised!'; }

        var scrollWidth = this.getScrollbarWidth();

        $('.js-mMenu').remove();
        $('body').removeClass('js-mMenu__no-scroll').removeClass('js-mMenu__scrBarrWidth'+scrollWidth);

        _.destroyEvents();

        _.isInit = false;

        return 'Module destroyed!';

    },
    destroyEvents: function() {
    	$('.js-mMenu__show-hide-btn').unbind('click');
    	$('.js-mMenu_show-child').unbind('click');
    }

}