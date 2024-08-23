var stages = [
	{
		"html" : "<p><span>1</span>Строительство железнодорожной магистрали Москва-Васюки</p>"
	},
	{
		"html" : "<p><span>2</span>Открытие фешенебельной гостиницы «Проходная пешка» и других небоскрёбов</p>"
	},
	{
		"html" : "<p><span>3</span>Поднятие сельского хозяйства в радиусе на тысячу километров: производство овощей, фруктов, икры, шоколадных конфет</p>"
	},
	{
		"html" : "<p><span>4</span>Строительство дворца для турнира</p>"
	},
	{
		"html" : "<p><span>5</span>Размещение гаражей для гостевого автотранспорта</p>"
	},
	{
		"html" : "<p><span>6</span>Постройка сверхмощной радиостанции для передачи всему миру сенсационных результатов</p>"
	},
	{
		"html" : "<p><span>7</span>Создание аэропорта «Большие Васюки» с регулярным отправлением почтовых самолётов и дирижаблей во все концы света, включая Лос-Анжелос и Мельбурн</p>"
	}
];

function changeActive(e) {
	var ActItem = e.item.index;
	$('ul.rows li').removeClass('active');
	$('ul.rows li[data-rows="'+ ActItem  +'"]').addClass('active');
	$('.grid-page .tournament-page-btn').removeClass('disabled');

	if( ActItem == 0 ) {
		$('.grid-page .tournament-page-prev').addClass('disabled');
	}

	if( ActItem == $('.stages-grid[data-stages-grid="1"] .stages-item').length - 1 ) {
		$('.grid-page .tournament-page-next').addClass('disabled');
	}
}

function changeCurrent(e) {
	if (e.item) {
		var index = e.item.index;
		var count = e.item.count;
		
		if (index > count) {
			index -= count;
		}

		if (index <= 0) {
			index += count;
		}

		$('.tournament-page-txt').html(index + ' <span>/ '+ count +'</span>');
	}
}

$(document).ready(function(){
	$('.main-btn a[href^="#"').on('click', function() {
		var href = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(href).offset().top - 40
		});
		return false;
	});

	$('.tournament-slider').addClass('carousel-2 owl-carousel');
	$('.tournament-slider').find('.tournament-item').addClass('owl-pic');

	let $owl = $('.carousel-2');
	$owl.owlCarousel({
		margin: 20,
		loop: true,
		center: true,
		startPosition: -2,
		stagePadding: 0,
		nav: true,
		dots: false,
		navText: ['', ''],
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		onTranslated: changeCurrent,
		onInitialized: changeCurrent,
		responsive: {
            0:{
                items:1
            },
            1000:{
                items:3
            }
        }
	});

	$('.grid-wrap').append('<div class="stages-grid" data-stages-grid="0"></div><div class="stages-grid" data-stages-grid="1" style="display: none;"></div>');

	for (i = 0; i < stages.length; i++) {
		$('.stages-grid[data-stages-grid="0"]').append('<div class="stages-item"><div class="stages-item-middle">' + stages[i].html + '</div></div>');
	}

	$('.stages-grid[data-stages-grid="1"]').append('<div class="stages-item"><div class="stages-item-middle">' + stages[0].html + stages[1].html + '</div></div>');
	$('.stages-grid[data-stages-grid="1"]').append('<div class="stages-item"><div class="stages-item-middle">' + stages[2].html + '</div></div>');
	$('.stages-grid[data-stages-grid="1"]').append('<div class="stages-item"><div class="stages-item-middle">' + stages[3].html + stages[4].html + '</div></div>');
	$('.stages-grid[data-stages-grid="1"]').append('<div class="stages-item"><div class="stages-item-middle">' + stages[5].html + '</div></div>');
	$('.stages-grid[data-stages-grid="1"]').append('<div class="stages-item"><div class="stages-item-middle">' + stages[6].html + '</div></div>');
	$('.stages-grid[data-stages-grid="1"]').addClass('carousel-3 owl-carousel');
	$('.stages-grid[data-stages-grid="1"]').find('.stages-item').addClass('owl-pic');

	let $owl2 = $('.carousel-3');
	$owl2.owlCarousel({
		margin: 20,
		loop: false,
		center: false,
		stagePadding: 0,
		nav: true,
		dots: false,
		navText: ['', ''],
		autoplay: false,
		onTranslated: changeActive,
		onInitialized: changeActive,
		responsive: {
            0:{
                items:1
            }
        }
	});

	for (i = 0; i < $('.stages-grid[data-stages-grid="1"] .stages-item').length; i++) {
		if( i == 0 ) {
			$('ul.rows').append('<li class="active" data-rows="'+ i +'"></li>');
		} else {
			$('ul.rows').append('<li data-rows="'+ i +'"></li>');
		}
	}
});