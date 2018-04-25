;(function () {

	'use strict';

  $('a.page-scroll').click(function() {
   if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
     var target = $(this.hash);
     target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
     if (target.length) {
     $('html,body').animate({
                            scrollTop: target.offset().top - 40
                            }, 900);
     return false;
     }
     }
     });

   // affix the navbar after scroll below header
   $('#nav').affix({
   offset: {
   top: $('header').height()
   }
   });



	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}

	};

	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#gtco-offcanvas, .js-gtco-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	    	if ( $('body').hasClass('offcanvas') ) {
    			$('body').removeClass('offcanvas');
    			$('.js-gtco-nav-toggle').removeClass('active');
	    	}
	    }
		});

	};



	var header = function() {
		$('.header-fixed').css('padding-top', $('.gtco-nav').height());
	};

	var navigation = function() {

		$('body').on('click', '#gtco-offcanvas ul a:not([class="external"]), .main-nav a:not([class="external"])', function(event){
			var section = $(this).data('nav-section');
				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top - 55
			    	}, 500, 'easeInOutExpo');
			   }

			   if ($('body').hasClass('offcanvas')) {
			   	$('body').removeClass('offcanvas');
			   	$('.js-gtco-nav-toggle').removeClass('active');
			   }
		   event.preventDefault();
		   return false;
		});

	};

   // Pretty Photo
    var PrettyPhoto = function() {

    $("a[rel^='prettyPhoto']").prettyPhoto({
        social_tools: false
    });
  }


	var offcanvasMenu = function() {

		$('body').prepend('<div id="gtco-offcanvas" />');
		$('body').prepend('<a href="#" class="js-gtco-nav-toggle gtco-nav-toggle"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#gtco-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#gtco-offcanvas').append(clone2);

		$('#gtco-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#gtco-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');
		});


		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-gtco-nav-toggle').removeClass('active');

	    	}
		});
	};


	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('.main-nav > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('div[data-section]');

		$section.waypoint(function(direction) {

		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};

	var burgerMenu = function() {

		$('body').on('click', '.js-gtco-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('offcanvas') ) {
				$('body').removeClass('offcanvas');
			} else {
				$('body').addClass('offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});

				}, 100);

			}

		} , { offset: '85%' } );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var owlCarousel = function(){

		var owl = $('.owl-carousel-carousel');
		owl.owlCarousel({
			items: 3,
			loop: true,
			margin: 20,
			nav: true,
			dots: true,
			smartSpeed: 800,
			navText: [
		      "<i class='ti-arrow-left owl-direction'></i>",
		      "<i class='ti-arrow-right owl-direction'></i>"
	     	],
	     	responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:2
	        },
	        1000:{
	            items:3
	        }
	    	}
		});


		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 20,
			nav: true,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
			navText: [
		      "<i class='ti-arrow-left owl-direction'></i>",
		      "<i class='ti-arrow-right owl-direction'></i>"
	     	]
		});

	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){

			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');

			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});

	};


	// Loading page
	var loaderPage = function() {
		$(".gtco-loader").fadeOut("slow");
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#gtco-counter').length > 0 ) {
			$('#gtco-counter').waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	var accordion = function() {
		$('.gtco-accordion-heading').on('click', function(event){

			var $this = $(this);

			$this.closest('.gtco-accordion').find('.gtco-accordion-content').slideToggle(400, 'easeInOutExpo');
			if ($this.closest('.gtco-accordion').hasClass('active')) {
				$this.closest('.gtco-accordion').removeClass('active');
			} else {
				$this.closest('.gtco-accordion').addClass('active');
			}
			event.preventDefault();
		});
	};

	var sliderMain = function() {

	  	$('#gtco-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	  	$('#gtco-hero .flexslider .slides > li').css('height', $(window).height());
	  	$(window).resize(function(){
	  		$('#gtco-hero .flexslider .slides > li').css('height', $(window).height());
	  	});

	};


	// based on Portfolio isotope filter /* Highlights Portfolio items by skill*/
	$(window).load(function() {
			var $container = $('.portfolio-items');

			$('.cat span').click(function() {
					$('.cat .active').removeClass('active');
					$(this).addClass('active');
					var i = 0;
					var x1 = document.getElementsByClassName("skill-item");
					for (i=0; i < x1.length; i++) {
						x1[i].classList.remove("skill-highlight");
					}

					var selector = $(this).attr('data-filter');
					var x = document.getElementsByClassName(selector);
					for (i=0; i < x.length; i++) {
						x[i].classList.add("skill-highlight");
					}

					/*  "skill" descriptions under buttons with default text for "clear all"  */
					var text;
					switch(selector) {
							case "ux":
									text = "User experience (UX) and interface design encompasses projects which focused on the user's experience with the project.";
									break;
							case "video":
									text = "Video and illustration projects showcase the variety of video production, illustration, art design, and creative projects we have been involved with over the years.";
									break;
							case "event":
									text = "Event Planning highlights the concerts, large events, and peripheral activities we have planned.";
									break;
							case "clothing":
									text = "Clothing design focuses on the success of several designs which made their way into Hollywood films and enjoyed large market success in the US and abroad.";
									break;
							case "research":
									text = "Data Scientist & Reseatch highlights projects where rigorous scientific method and data collection were used to answer the hypotheses posed by the funding organization.";
									break;
							case "product":
									text = "Product Design highlights projects where the design of the product was crucial to its success.";
									break;
							case "interactive":
									text = "Interactive Design highlights projects with interactive elements for users to engage with the project.";
									break;
							case "game":
									text = "Game Design highlights computer games designed and executed.";
									break;
							default:
									text = "Select a catergory to see related projects.";
					}

					var i = 0;
					var x2 = document.getElementById("descriptors");
					x2.innerHTML = text;

					return false;
			});

	});











	$(function(){
		fullHeight();
		mobileMenuOutsideClick();
		header();
		navigation();
		offcanvasMenu();
		burgerMenu();
		navigationSection();
		contentWayPoint();
		dropdown();
		owlCarousel();
		goToTop();
		loaderPage();
		counterWayPoint();
		accordion();
		sliderMain();
	});


}());
