<?php
/**
 * Шаблон стартовой страницы сайта
 * 
 * @package    DIAFAN.CMS
 * @author     diafan.ru
 * @version    6.0
 * @license    http://www.diafan.ru/license.html
 * @copyright  Copyright (c) 2003-2018 OOO «Диафан» (http://www.diafan.ru/)
 */
 
if(! defined("DIAFAN"))
{
	$path = __FILE__;
	while(! file_exists($path.'/includes/404.php'))
	{
		$parent = dirname($path);
		if($parent == $path) exit;
		$path = $parent;
	}
	include $path.'/includes/404.php';
}
?><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<!-- шаблонный тег show_head выводит часть HTML-шапки сайта. Описан в файле themes/functions/show_head.php. -->
<insert name="show_head">
<meta name="viewport" content="width=1280">

<link rel="shortcut icon" href="<insert name="path">favicon.ico" type="image/x-icon">
<!-- шаблонный тег show_css подключает CSS-файлы. Описан в файле themes/functions/show_css.php. -->
<insert name="show_css" files="default.css, style.css, menu.css">

</head>

<body>
<div id="top-line">
	<div class="wrapper">  
		<div class="top-phone">      
			<insert name="show_block" module="site" id="1">
		</div>
		<!-- шаблонный тег вывода блока ссылок на разные языковые версии сайта. Вид формы редактируется в файле modules/languages/views/languages.view.show_block.php. -->
		<insert name="show_block" module="languages">

		<div class="top-line-right">
			<!-- шаблонный тег вывода количества отложенных товаров. Вид формы редактируется в файле modules/wishlist/views/wishlist.view.show_block.php. -->
			<insert name="show_block" module="wishlist">

			<!-- шаблонный тег вывода формы корзины. Вид формы редактируется в файле modules/cart/views/cart.view.show_block.php. -->
			<insert name="show_block" module="cart">
		</div>
	</div>
</div>
<div id="top-menuline">  
	<div class="wrapper">
		<div id="logo">
			<!-- шаблонный тег вывода "умной ссылки", которая не ссылается сама на себя. Если это не требуется, можно заменить на классические <a href="/">Название сайта</a>  -->
			<insert name="show_href" img="img/logo_LANG.png" alt="title" width="220" height="80">
		</div>
		<!-- шаблонный тег вывода первого меню (параметр id=1). Настраивается в файле modules/menu/views/menu.view.show_block_topmenu.php 
		Документация тега http://www.diafan.ru/dokument/full-manual/templates-functions/#show_block_menu -->
		<insert name="show_block" module="menu" id="1" template="topmenu">

		<!-- шаблонный тег вывода формы поиска. Вид формы редактируется в файле modules/search/views/search.view.show_search.php. -->
		<insert name="show_search" module="search" template="top" ajax="true">   
	</div>
</div>  
<!-- шаблонный тег вывода баннеров. Блок выводит баннеры слайдера. Вид блока редактируется в файле modules/bs/views/bs.view.show_block_slider.php-->
<insert name="show_block" module="bs" count="3" cat_id="1" template="slider">  
 
<div class="wrapper content">
	<div id="left-col">
		<div class="block">
			<h3><insert value="Продукция"></h3>
			<!-- шаблонный тег вывода меню каталога (параметр id=2). Настраивается в файле modules/menu/views/menu.view.show_block_leftmenu.php 
			Документация тега http://www.diafan.ru/dokument/full-manual/templates-functions/#show_block_menu -->
			<insert name="show_block" module="menu" id="2" template="leftmenu">
		</div>
		<!-- шаблонный тег вывода формы поиска по товарам. Вид формы редактируется в файле modules/shop/views/shop.view.show_search.php. -->
		<insert name="show_search" module="shop" cat_id="current" ajax="true">
		<!-- шаблонный тег вывода формы входа и регистрации пользователей. Вид формы редактируется в файле modules/registration/views/registration.view.show_login.php. -->
		<insert name="show_login" module="registration">

		<!-- шаблонный тег вывода блока некоторых товаров из магазина. Вид блока товаров редактируется в файле modules/shop/views/shop.view.show_block.php. -->
		<insert name="show_block" module="shop" count="1" images="1" sort="rand" template="left">

		<!-- шаблонный тег вывода блока с голосованиями. Вид блока редактируется в файле modules/votes/views/votes.view.show_block.php. -->
		<insert name="show_block" module="votes" sort="rand">     
	</div>  
	<div id="right-col">
		<!-- шаблонный тег вывода блока новостей. Вид блока файлов редактируется в файле modules/news/views/news.view.show_block.php. -->
		<insert name="show_block" module="news" count="2" images="1">  
		<!-- шаблонный тег вывода блока статей. Вид блока статей редактируется в файле modules/clauses/views/clauses.view.show_block.php. -->
		<insert name="show_block" module="clauses" count="1" images="1">  
		<!-- шаблонный тег вывода блока последних комментариев на сайте сайта. Вид блока редактируется в файле modules/comments/views/comments.view.show_block.php -->
		<insert name="show_block" module="comments">    
		<!-- шаблонный тег вывода блока некоторых изображений из фотогалереи. Вид блока фотографий редактируется в файле modules/photo/views/photo.view.show_block.php. -->
		<insert name="show_block" module="photo" sort="rand" count="1" cat_id="1">   
		<!-- шаблонный тег вывода блока некоторых позиций из файлового архива. Вид блока файлов редактируется в файле modules/files/views/files.view.show_block.php. -->
		<insert name="show_block" module="files" count="2" images="1">
	</div>
	<!--/right-col -->
	<div id="center-col">

		<!-- шаблонный тег вывода навигации "Хлебные крошки"-->
		<insert name="show_breadcrumb">  

		<!-- шаблонный тег вывода основного контента сайта -->
		<insert name="show_body">

		<!-- шаблонный тег вывода блока некоторых товаров из магазина. Вид блока товаров редактируется в файле modules/shop/views/shop.view.show_block.php. -->
		<insert name="show_block" module="shop" count="3" images="1" sort="rand">

		<!-- шаблонный тег вывода блока вопросов и ответов сайта. Вид блока редактируется в файле modules/faq/views/faq.view.show_block.php. -->    
		<insert name="show_block" module="faq" count="2" often="0">
		<!-- шаблонный тег вывода блока последних сообщений на форуме. Вид блока файлов редактируется в файле modules/forum/views/forum.view.show_block_messages.php. -->
		<insert name="show_block_messages" module="forum" count="3" cat_id="all">
	</div>
	<div class="clear">&nbsp;</div>
	<div class="bs_center">
	  <!-- шаблонный тег вывода баннеров. Блок выводит все баннеры. Вид блока редактируется в файле modules/bs/views/bs.view.show_block.php-->
	  <insert name="show_block" module="bs" count="1" cat_id="2">
	</div>
</div>
<!-- шаблонный тег вывода формы для подписчиков. Вид блока редактируется в файле modules/subscription/views/subscription.view.form.php.  -->
<insert name="show_form" module="subscription"> 
<div id="footer">
	<div class="wrapper">
		<div class="contacts">
			<h3><insert value="Контакты"></h3>
			<insert name="show_block" module="site" id="2">
		</div>

		<!-- шаблонный тег вывода кнопок социальных сетей. Правится в файле themes/functions/show_social_links_main.php -->
		<insert name="show_social_links_main">

		<div class="footer-menu">
			<h3><insert value="О магазине"></h3>
			<!-- шаблонный тег вывода первого меню (параметр id=1). Настраивается в файле modules/menu/views/menu.view.show_menu.php, так как параметр template не был передан. Тогда в оформлении используются параметры tag 
			Документация тега http://www.diafan.ru/dokument/full-manual/templates-functions/#show_block_menu -->
			<insert name="show_block" module="menu" 
				id="1" 
		  count_level="1"
				tag_level_start_1="[ul]"
				tag_start_1="[li]" 
				tag_end_1="[/li]" 
				tag_level_end_1="[/ul]"
				tag_level_start_2=""
				tag_start_2="[li class='podmenu']" 
				tag_end_2="[/li]"
				tag_level_end_2=""
				>
		</div>
		<div class="copyright">
			<h3>&copy; <insert name="show_year"> Demosite.ru</h3>
			<!-- шаблонный тег подключает файл-блок -->
			<insert name="show_include" file="diafan">    
			<div class="notes">
				<span class="note mistakes">
					<i class="fa fa-warning"></i>
					<!-- шаблонный тег ошибка на сайте -->
					<insert name="show_block" module="mistakes">
				</span>
				<span class="note sitemap">
					<i class="fa fa-link"></i>
					<!-- шаблонный тег show_href выведет ссылку на карту сайта <a href="/map/"><img src="/img/map.png"></a>, на странице карты сайта тег выведет активную иконку -->
					<insert name="show_href" rewrite="map" alt="Карта сайта">
				</span>
				<span class="note siteinfo">
					<i class="fa fa-signal"></i>
					<!-- шаблонный тег вывода количества пользователей on-line. Вид блока редактируется в файле modules/users/views/users.view.show_block.php. -->
					<insert name="show_block" module="users">
				</span>
			</div>
		</div>
	</div>
</div>
<!--/footer -->

<!-- шаблонный тег подключает on-line консультант -->
<insert name="show_block" module="consultant" system="jivosite">

<!-- шаблонный тег show_js подключает JS-файлы. Описан в файле themes/functions/show_js.php. -->
<insert name="show_js">

<script type="text/javascript" asyncsrc="<insert name="custom" path="js/menu.js" absolute="true">" charset="UTF-8"></script>
<script type="text/javascript" asyncsrc="<insert name="custom" path="js/main.js" absolute="true">" charset="UTF-8"></script>
<script type="text/javascript" asyncsrc="<insert name="custom" path="js/common.js" absolute="true">" charset="UTF-8"></script>



<insert name="show_include" file="counters">

</body>
</html>
