mMenu = {

    defaultSettings: {
        menu: '.js-mMenu_append',
        comment: 'This block is added here using javascript. This initialize function - mMenu.init(). Look file main.js or common.js',
    },

    isInit: false,

    init: function(setup = this.defaultSettings, _ = this) {

        if (_.isInit){ return 'Error: This module is already initialized!';}
        if (!$(setup.menu).length) { return 'Error: Can not find "setup.menu"!';}
        
        var mobileMenuHtml = '<div class="js-mMenu"><div class="js-mMenu_buttons"></div><div class="js-mMenu_list"></div></div>';
            menu = $(setup.menu).clone(true),
            btn = $('.js-mMenu__show-hide-btn').clone(true);

            var comment = '<!-- '+ setup.comment +' -->';



        $('body').prepend(mobileMenuHtml);
        
            $('.js-mMenu').prepend(comment);

        btn.appendTo(".js-mMenu .js-mMenu_buttons");

        menu.removeAttr('class').removeAttr('id').addClass('js-mMenu_is-appended');

        menu.appendTo(".js-mMenu .js-mMenu_list");
        

        //Кнопка "Показать / Скрыть меню"
        $(document).on('click', '.js-mMenu__show-hide-btn', function (e) {

            var scrollWidth = _.getScrollbarWidth();

            $('.js-mMenu').toggleClass('js-mMenu__showed');
            
            //Отменяет прокрутку страницы.
            $('body').toggleClass('js-mMenu__no-scroll').toggleClass('js-mMenu__scrBarrWidth'+scrollWidth);

        });


        //Вставляем кнопки для submenu

        $('.js-mMenu li.parent > a').addClass('js-mMenu_parent-link').append('<div class="js-mMenu_show-child"></div>');

        $(document).on('click', '.js-mMenu_show-child', function(e) {
            e.preventDefault();
            $(this).toggleClass('js-mMenu_show-child--active').parent().next().slideToggle();
        });

        _.isInit = true;

        return _;
    },

    destroy: function() {
        if(!this.isInit){ return 'Error: This module is not initialised!'; }

        var scrollWidth = this.getScrollbarWidth();

        $('.js-mMenu').remove();
        $('body').removeClass('js-mMenu__no-scroll').removeClass('js-mMenu__scrBarrWidth'+scrollWidth);

        this.isInit = false;

        return 'Module destroyed!';

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
    }

}