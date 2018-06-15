# mMenu
Модуль мобильного меню для CMS Diafan

#### Что нового
v.0.2 Реализован overlay.

v.0.1 Тестовая версия. Ставится в папку "custom", на чистой CMS.

### Инициализация:
```javascript
$(document).ready(function() {
	
	mMenu.init({
		block: '.my-block',
		button: '.my-button'
	});

});
```

### Настройки

Свойство | Тип | По умолчанию | Описание
------ | ---- | ------- | -----------
block | $(element) | false | Блок меню. Можно указать несколько элементов. Например: $('.el-1, .el-2, ...')
button | $(element) | false | Кнопка, по нажатию которой открывается/закрывается меню
btnCloseMenuText | string | '' | Текст кнопки "закрыть"
btnCloseMenuClass | string | '' | Добавляет класс к кнопке "закрыть". Классы прописываются без точки в начале имени класса. Можно добавить несколько классов. Например: 'class1 class2'.
submenuClass | string | '' | Класс подменю. Указывается при нестандартной верстке подменю (т.е если блок подменю не "ul")
submenuRemoveClasses | boolean | false | Удаляет атрибут "class" у всех вложенных элементов подменю
comment | string | 'This block is add...' | Коментарий в вёрстке
overlay | boolean | false | Оверлей
overlayBlur | boolean | false | Размытие текста под оверлеем

### Мотоды

Метод | Аргумент | Описание
------ | -------- | -----------
`mMenu.init` | options : object | Инициализирует mMenu
`mMenu.destroy` | | Разрушает mMenu
`mMenu.destroyEvents` | | Удаляет обработчики событий

#### Зависимости

jQuery 3.0