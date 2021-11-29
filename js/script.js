// Webp converter
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp');
	}
	else{
		document.querySelector('body').classList.add('no-webp');
	}
});
// /Webp converter
// ==========================================================================
function changeHeaderLogo () {
	var headerLogo = $('.header__logo img');
	if($('.icon-menu').hasClass('_active')){
		setTimeout(function(){
			headerLogo.attr("src","img/footer/logo-white.png")
		}, 340);
	}
	else {
		setTimeout(function(){
			headerLogo.attr("src","img/intro/logo-black.png");
		}, 140);
	}
}

function changeHeaderLogoFast () {
	var headerLogo = $('.header__logo img');
	if($("#header").hasClass('fixed')){
		headerLogo.attr("src","img/footer/logo-white.png");
	}
	else {
		headerLogo.attr("src","img/intro/logo-black.png");
	}
}


$(document).ready(function() {
	// Deleting all empty links
	var empties = $('a').filter(function(){
		return (($(this).html().trim() == '') && !($(this).get(0).hasAttribute('href')));
	});

	empties.remove();
	// /Deleting all empty links
	// ==========================================================================

	// Burger menu
	$('.icon-menu').click(function(event) {
		$('.icon-menu,.menu__body').toggleClass('_active');
		$('body').toggleClass('_lock');
		changeHeaderLogo();
	});
	// /Burger menu

	// ==========================================================================
	// Scroll to section
	$("[data-scroll]").on("click", function(event) {
		event.preventDefault();

		var $this = $(this),
			blockId = $this.data('scroll'),
			blockOffset;
		if(blockId == "#header"){
			blockOffset = 0;
		}
		else {
			blockOffset = $(blockId).offset().top;
		}

		$(".menu a").removeClass("_active");
		$this.addClass("_active");

		if($("#nav").hasClass("_active")) {
			$("#nav_toggle").toggleClass("_active");
			$("#nav").toggleClass("_active");
		}

		changeHeaderLogo();

		$('body').removeClass("_lock");

		$("html, body").animate({
			scrollTop: blockOffset
		}, 500);
	});
	// /Scroll to section.

	// ==========================================================================

	// Slider
	$('.media__content').slick({
		adaptiveHeight: true,
		speed: 700,
		easing: 'ease',
		variableWidth: true,
		infinite: true,
		slidesToShow: 3,
		dots: true,
		appendArrows: $('.media__slider-arrows'),
		appendDots: $('.media__slider-arrows'),
		responsive: [
	        {
	          breakpoint: 768,
	          settings: {
	            slidesToShow: 2
	          }
	        },
	        {
	          breakpoint: 480,
	          settings: {
	            slidesToShow: 1
	          }
	        },
	      ]

	});

	// /Slider
	
	// ==========================================================================
	// Fixed Header 
	var intro = $("#intro"),
		header = $("#header"),
		page = $(".page"),
		menu = $(".menu"),
		introH = intro.innerHeight(),
		scrollOffset = $(window).scrollTop();


	$(window).on("scroll", function(){
		scrollOffset = $(this).scrollTop();
		checkScroll(scrollOffset);
	});

	$(window).resize(function(){
		introH = intro.innerHeight()
		scrollOffset = $(this).scrollTop();
		checkScroll(scrollOffset);
	});

	function checkScroll (scrollOffset) {
		if (scrollOffset >= introH) {
			header.addClass("fixed");	
			menu.addClass("_container");	
			page.addClass("header-fixed");	
		}
		else {
			header.removeClass("fixed");
			menu.removeClass("_container");	
			page.removeClass("header-fixed");
		}
	}


	checkScroll(scrollOffset);
	// /Fixed Header 

});

// ==========================================================================
// Tabs
const tabsBtn = document.querySelectorAll(".tabs__item");
const tabsItems = document.querySelectorAll(".menu__item");

function changeTab (item) {
	let currentBtn = item;
		let tabId = currentBtn.getAttribute("href");
		let currentTab = document.querySelector(tabId);

		if(!currentBtn.classList.contains('_active')) {
			tabsBtn.forEach(function(item) {
				item.parentElement.classList.remove('_active');
			});

			tabsItems.forEach(function(item) {
				item.classList.remove('_active');
			});

			currentBtn.parentElement.classList.add('_active');
			currentTab.classList.add('_active');
		}
}

tabsBtn.forEach(function(item) {
	onTabClick(item);
});

function onTabClick (item) {
	item.parentElement.addEventListener("mouseenter", function(event) {
		event.preventDefault();
		changeTab(item);
	});
	item.parentElement.addEventListener("click", function(event) {
		event.preventDefault();
		changeTab(item);
	});
	
}

document.querySelector('.tabs__item:nth-child(1)').click();
// /Tabs
// ==========================================================================

// Show all
const showAllBtns = document.querySelectorAll('.menu__item-show-all');

showAllBtns.forEach(function(item) {
	onShowAllClick(item);
});

function onShowAllClick (item) {
	item.addEventListener("click", function(event) {
		event.preventDefault();
		let currentBlockToShow = $(item).parent().find(".menu__item-rest-labels");

		if(!currentBlockToShow.hasClass("_active")) {
			currentBlockToShow.addClass("_active");
			$(item).find('a').text("Скрыть");
		}
		else {
			currentBlockToShow.removeClass("_active");
			$(item).find('a').text("Показать все бренды");
		}
	});
}
// /Show all
// ==========================================================================
