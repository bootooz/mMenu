mMenu = {
    //block - required
    //button - required
    defaultSettings: {
        block: false,
        button: false,
        comment: 'This block is added here using javascript. This initialize function - mMenu.init(). Look file main.js or common.js',
        btnCloseMenuText: '',
        overlay: false,
    },

    isInit: false,
    isOverlay: false,

    init: function(userSettings = this.defaultSettings, _ = this) {

    	//Setup - это объект, который происходит из слияния "настроек по умолчанию" и "настроек переданных в init()"
    	//Причём настройки переданные в init() заменяют "настройки по умолчанию"
    	var setup = $.extend( _.defaultSettings, userSettings );

    	//_.isInit - Флаг инициализации модуля
        if (_.isInit){ console.log('mMenu error: This module is already initialized!'); return false;}
        //Не указан блок меню
        if (!setup.block) { console.log('mMenu error: The "block" property can not be empty!'); return false; }
        if (!$(setup.block).length) { console.log('mMenu error: Object "$('+setup.block+')" not found!'); return false; }
        
        //Каркас
        var mobileMenuHtml = '<div class="js-mMenu"><div class="js-mMenu_block"><div class="js-mMenu_buttons"></div><div class="js-mMenu_list"></div></div></div>';    
        $('body').prepend(mobileMenuHtml);
        $('.js-mMenu').prepend('<!-- '+ setup.comment +' -->');


        //Инициализация кнопки "скрыть меню"
        _.setButtonHideMenu(setup.button, setup.btnCloseMenuText);

        //Добавление блоков в модуль (по умолчанию добавляется только $('.js-mMenu_append'))
        //В "setup.block" можно передать другой набор блоков
        _.insertBlocks(setup.block);

        _.setOverlay(setup.overlay);

        _.setEventListener();

        _.isInit = true;

        return _;
    },

    insertBlocks: function(block) {
    	var block = $(block).clone(true);
        
        block.removeAttr('class').removeAttr('id').addClass('js-mMenu_is-appended');

        block.appendTo(".js-mMenu .js-mMenu_list");
        
        //Вставляем кнопки для submenu
        $('.js-mMenu .js-mMenu_list ul > li > ul').parent().children('a').addClass('js-mMenu_parent-link').append('<div class="js-mMenu_show-child"></div>');
        $('.js-mMenu .js-mMenu_list ul > li > ul').parent().children('ul').addClass('js-mMenu_submenu');
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

    setButtonHideMenu: function(button, btnCloseMenuText) {

        if (!button) { console.log('mMenu error: The "button" property can not be empty!'); return false; }
        if (!$(button).length) { console.log('mMenu error: Object "$('+button+')" not found!'); return false; }

    	var btn = $(button).clone(true);
    	
    	if (btnCloseMenuText)
    	{
    		btn.html(btnCloseMenuText);
    	}

        btn.appendTo(".js-mMenu .js-mMenu_buttons");
    },
    setEventListener: function(_ = this) {

    	var menu = $('.js-mMenu .js-mMenu_block'),
            overlay = $('.js-mMenu_overlay'),
    		body = $('body');

    	//Кнопка "Показать / Скрыть меню"
        $('.js-mMenu__show-hide-btn').on('click', toggleMenu);

        //Оверлей
        overlay.on('click', toggleMenu);

        function toggleMenu(e) {
            var scrollWidth = _.getScrollbarWidth();

            menu.toggleClass('js-mMenu__showed');
            
            //Если меню открыли
            if (menu.hasClass('js-mMenu__showed'))
            {
                //Отменяет прокрутку страницы.
                body.addClass('js-mMenu__no-scroll');
                
                //Работа со скроллбаром
                body.addClass('js-mMenu__scrBarrWidth'+scrollWidth);

                //Оверлей
                overlay.addClass('js-mMenu_overlay--showed');
            }
            //Если меню закрывают
            else
            {
                //Оверлей
                //Класс анимирует прозрачность при закрытии меню
                overlay.addClass('js-mMenu_overlay--closing');
            }   
        }

        //Действия после анимации меню.
        menu.on('transitionend webkitTransitionEnd oTransitionEnd', function () {

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

                //Оверлей
                //После полного закрытия меню, удаляем все активирующие классы
                overlay.removeClass('js-mMenu_overlay--showed').removeClass('js-mMenu_overlay--closing');
            }

        });

        //"Показать / Скрыть" вложенные пункты меню
        $('.js-mMenu_show-child').on('click', function(e) {
            e.preventDefault();
            $(this).toggleClass('js-mMenu_show-child--active').parent().next().slideToggle();
        });
    },

    setOverlay: function(init, _ = this) {
        if (init)
        {
            var module = $('.js-mMenu');
            
            module.append('<div class="js-mMenu_overlay"></div>');

            _.isOverlay = true;
        }
    },

    destroy: function(_ = this) {
        if(!_.isInit){ console.log('Error: This module is not initialised!'); return false; }

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