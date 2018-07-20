mMenu = {
    //block - required
    //button - required
    defaultSettings: {
        block: false,
        button: false,
        comment: 'This block is added here using javascript. This initialize function - mMenu.init(). Look file main.js or common.js',
        btnCloseMenuText: '',
        btnCloseMenuClass: '',
        submenuClass: '',
        submenuRemoveClasses: false,
        submenuRemoveStyles: false,
        overlay: false,
        overlayBlur: false,
        position: 'left',
    },

    //Промежуточные состояния. Меняются при выполнении функций.
    isInit: false,
    isOverlay: false,
    isOverlayBlur: false,
    button: false,

    //Запланировано на будущее.
    //Переделать определение состояния меню (открыто/закрыто) с помощью флага status.
    status: 'closed',

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

        // Устанавливается позиционирование меню. (по умолчанию - слева)
        _.setPosition(setup.position);

        //Инициализация кнопки "скрыть меню"
        _.setButtonHideMenu(setup.button, setup.btnCloseMenuText, setup.btnCloseMenuClass);

        //(Удалить..) //Добавление блоков в модуль (по умолчанию добавляется только $('.js-mMenu_append'))
        //В "setup.block" можно передать набор блоков
        _.insertBlocks(setup.block, setup.submenuClass, setup.submenuRemoveClasses, setup.submenuRemoveStyles);
        

        // Вызываем метод _.overlay.init объекта overlay с помощью call() 
        // и передаем в метод _.overlay.init контекст _, далее - параметры используемые в функции init
        _.overlay.init.call(_, setup.overlay, setup.overlayBlur);

        _.setEventListener();

        _.isInit = true;

        return _;
    },

    // Устанавливается позиционирование меню. (по умолчанию - слева)
    setPosition: function(position, _ = this) {
            
        var block = $('.js-mMenu .js-mMenu_block');

        switch (position) {
            case 'right':
                block.addClass('js-mMenu__position_right');    
            break;
                       
            default:
                block.addClass('js-mMenu__position_left');
        }

    },

    //submenuClass - класс подменю. если не указан - за подменю принимается "ul" вложенный в "li" - .js-mMenu_list ul > li > ul
    //submenuRemoveClasses - bool - флаг. Если true - удалятся аттрибуты class у всех элементов внутри submenu
    insertBlocks: function(block, submenuClass, submenuRemoveClasses, submenuRemoveStyles) {
    	var block = $(block).clone(true);
        
        block.removeAttr('class').removeAttr('id').addClass('js-mMenu_is-appended');

        //Удаляем аттрибут "class"
        if (submenuRemoveClasses)
        {
            //Удалям аттрибут class у всех вложенных блоков.
            if (submenuClass)
            {
                block.find('.'+submenuClass).find('[class]').removeAttr('class');
            }
            else
            {
                block.find('li > ul').find('[class]').removeAttr('class');
            }
        }
		//Удаляем аттрибут "style"
        if (submenuRemoveStyles)
        {
            //Удалям аттрибут style у всех вложенных блоков.
            if (submenuClass)
            {
                block.find('.'+submenuClass).find('[style]').removeAttr('style');
            }
            else
            {
                block.find('li > ul').find('[style]').removeAttr('style');
            }
        }

        block.appendTo(".js-mMenu .js-mMenu_list");
        
        //Вставляем кнопки для submenu
        if (!submenuClass)
        {
        	//Если класс подменю не указан, принимаем за подменю любую ul находящуюся в li.
            $('.js-mMenu .js-mMenu_list ul > li > ul').parent().children('a').addClass('js-mMenu_parent-link').append('<div class="js-mMenu_show-child"></div>');
            $('.js-mMenu .js-mMenu_list ul > li > ul').parent().children('ul').addClass('js-mMenu_submenu');
        }
        else
        {
        	//Если класс подменю указан, принимаем за подменю блок с этим классом.
            $('.js-mMenu .js-mMenu_list ul > li > .'+submenuClass).parent().children('a').addClass('js-mMenu_parent-link').append('<div class="js-mMenu_show-child"></div>');
            $('.js-mMenu .js-mMenu_list ul > li > .'+submenuClass).parent().children('.'+submenuClass).addClass('js-mMenu_submenu');
            //Также оставляем стандартную обработку.
            $('.js-mMenu .js-mMenu_list ul > li > ul').not('.'+submenuClass).parent().children('a').addClass('js-mMenu_parent-link').append('<div class="js-mMenu_show-child"></div>');
            $('.js-mMenu .js-mMenu_list ul > li > ul').not('.'+submenuClass).parent().children('ul').addClass('js-mMenu_submenu');
        }
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

    setButtonHideMenu: function(button, btnCloseMenuText, btnCloseMenuClass, _ = this) {

        if (!button) { console.log('mMenu error: The "button" property can not be empty!'); return false; }
        if (!$(button).length) { console.log('mMenu error: Object "$('+button+')" not found!'); return false; }

    	var btn = $(button).clone(true);
    	
    	if (btnCloseMenuText)
    	{
    		btn.html(btnCloseMenuText);
    	}
    	if (btnCloseMenuClass)
        {
            btn.addClass(btnCloseMenuClass);
        }

        btn.appendTo(".js-mMenu .js-mMenu_buttons");

        _.button = button;
    },
    setEventListener: function(_ = this) {

    	var menu = $('.js-mMenu .js-mMenu_block'),
            button = $(_.button),
            overlay = $('.js-mMenu_overlay'),
    		body = $('body');

    	//Кнопка "Показать / Скрыть меню"
        button.on('click', toggleMenu);

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
                _.overlay.show.call(_, overlay);

            }
            //Если меню закрывают
            else
            {
                //Оверлей
                _.overlay.close.call(_, overlay);
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
            }
        });


        //"Показать / Скрыть" вложенные пункты меню
        $('.js-mMenu_show-child').on('click', function(e) {
            e.preventDefault();
            $(this).toggleClass('js-mMenu_show-child--active').parent().next().slideToggle();
        });
    },

    overlay: {
        
        init: function(init, overlayBlur, _ = this) {
            if (init)
            {
                var module = $('.js-mMenu');
                
                module.append('<div class="js-mMenu_overlay"></div>');

                _.isOverlay = true;
                _.isOverlayBlur = overlayBlur ? overlayBlur : false;
            }
            else if(!init && overlayBlur)
            {
                console.log('Error: The "overlayBlur" property only works when "overlay = true"'); return false;
            }
        },
        
        show: function(overlay, _ = this) {
            var overlay = overlay;

            if (_.isOverlay)
            {
                overlay.stop().fadeIn();

                //Добавляет размытие заднего фона. Работает только при оверлее
                if (_.isOverlayBlur)
                {
                    $('body > *').not('[class=js-mMenu]').addClass('js-mMenu__filter-blur');
                }
            }
        },

        close: function(overlay, _ = this) {
            var overlay = overlay;
            
            if (_.isOverlay)
            {
                overlay.stop().fadeOut();

                //Удаляет размытие заднего фона.
                if (_.isOverlayBlur)
                {
                    $('body > *').not('[class=js-mMenu]').removeClass('js-mMenu__filter-blur');
                }
            }
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
    
    destroyEvents: function(_ = this) {
        $(_.button).unbind('click');
        $('.js-mMenu_show-child').unbind('click');
    }

}