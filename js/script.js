$(window).on('load', function() {
	setTimeout(function() {
		$('#loader').fadeOut(350);
	}, 500);
});

$(document).ready(function() {
    var isScrollingProgrammatically = false;

    // Обработка клика по меню
    $('.menu a').on('click', function(e) {
        e.preventDefault();
        var targetId = $(this).attr('href');
        var targetOffset = $(targetId).offset().top - 100;

        isScrollingProgrammatically = true; // ставим флаг

        // Плавный скролл
        $('html, body').animate({scrollTop: targetOffset}, 350, function() {
            // при завершении анимации снимаем флаг
            isScrollingProgrammatically = false;
            setActiveMenuItem($(e.target));
        });
    });

    // Обработка скролла
    $(window).on('scroll', function() {
        if (isScrollingProgrammatically) return; // пропускаем, если скролл вызван кликом

        var scrollPos = $(window).scrollTop();
        var activeFound = false; // флаг, есть ли активный раздел

        // Перебираем разделы
        $('.menu a').each(function() {
            var currLink = $(this);
            var ref = $(currLink.attr('href'));

            if (ref.length) {
                var sectionTop = ref.offset().top;
                var sectionBottom = sectionTop + ref.outerHeight();

                // если текущая прокрутка внутри раздела
                if (scrollPos >= sectionTop - 200 && scrollPos < sectionBottom - 200) {
                    setActiveMenuItem(currLink);
                    activeFound = true;
                }
            }
        });

        // Если ни один раздел не активен, убираем актив класс
        if (!activeFound) {
            $('.menu a').removeClass('active');
        }
    });

    function setActiveMenuItem($activeLink) {
        $('.menu a').removeClass('active');
        $activeLink.addClass('active');
    }

    // Вызов модалки bet
    $('#Upcoming .item-info_Team, #Completed .item-info_Team').click(function() {
    	modal('bet');
    });

   // Переключатель актив
	$('.S1bBet_list').on('click', 'li:not(.active)', function() {
		$(this).addClass('active').siblings().removeClass('active');
	});

	// Адаптивный input rub
	const input = document.querySelector('.modal-bet_top_val');
	if(input) {
		input.addEventListener('input', () => {
			const length = input.value.length || 1;
			input.style.width = `calc(${length}ch + 4px)`;
		});
		// Изначально устанавливаем ширину
		input.dispatchEvent(new Event('input'));
	}

	// Меню адаптив
	HTML = '';
	if( $('.header .mini-profile').length > 0 ) {
		HTML += '<div class="Profile-bg_Your_Link">';
			HTML += '<div class="Profile-bg_Your_Link_Item Dop Avatar">';
				HTML += '<a href=""><img src="images/ava.jpg" alt="" class="Ava"></a>';
				HTML += '<p class="nth-1">Step3 Designer Web Site</p>';
				HTML += '<p class="nth-2">ID: 3160</p>';
			HTML += '</div>';
			HTML += '<div class="Profile-bg_Your_Link_Item">';
				HTML += '<p>Balance:<span class="Profile-Balance_summ">9999</span><span class="Profile-Balance_rub">₽</span></p>';
				HTML += '<p> <a href="" class="mini-profile_balance_ico" style="margin:0;"> <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M0.758048 0.650678C0.461555 0.887872 0.413484 1.32051 0.650678 1.617L3.97376 5.77086L0.650678 9.92472C0.413484 10.2212 0.461554 10.6538 0.758047 10.891C1.05454 11.1282 1.48718 11.0802 1.72437 10.7837L5.39104 6.20034C5.59191 5.94925 5.59191 5.59247 5.39104 5.34138L1.72437 0.758048C1.48718 0.461555 1.05454 0.413484 0.758048 0.650678Z" fill="white" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path> </svg> </a> </p>';
			HTML += '</div>';
		HTML += '</div>';
	}
	if( $('.header .nav').length > 0 ) {
		HTML += $('.header .nav')[0].outerHTML;
	}
	HTML += '<div class="menu-ajax_line"></div>';
	if( $('.header .menu').length > 0 ) {
		HTML += $('.header .menu')[0].outerHTML;
	}
	if( $('.header .login').length > 0 ) {
		HTML += $('.header .login')[0].outerHTML;
	}
	$('#wrap').prepend('<div class="menu-overlay" onclick="HAS(`#wrap`, `menu_open`);" style="display:none;"></div><div class="menu-ajax" style="display:none;">'+ HTML +'</div>');
	$('.header .fixed').append('<div class="menu-mobile" onclick="HAS(`#wrap`, `menu_open`);"></div>');
});

function HAS(CLASS, TYPE) {
	if( $(CLASS).hasClass(TYPE) ) {
		$(CLASS).removeClass(TYPE);
	} else {
		$(CLASS).addClass(TYPE);
	}
}

function modal(type) {
	const $modal = $('#modal');
	const $modalItem = $modal.find('#modal-item');

	if (type === 'close') {
		// Восстановление прокрутки
		var scrollY = parseInt($('body').data('scrollY') || 0);
		$('body').css({
			'position': '',
			'top': '',
			'width': '',
			'overflow-y': 'scroll' // оставить линию видимой
		});
		$('body').removeData('scrollY');
		$(window).scrollTop(scrollY);
		
		$modal.fadeOut(150, () => {
			$modalItem.hide();
		});
	} else {
		// Зафиксировать текущую позицию
		var scrollY = $(window).scrollTop();
		$('body').data('scrollY', scrollY);  // сохранить позицию
		$('body').css({
			'position': 'fixed',
			'top': -scrollY + 'px',
			'width': '100%',
			'overflow-y': 'scroll' // полоса прокрутки всегда видна
		});
		
		$modal.fadeIn(350);
		const $targetItem = $modalItem.filter(`[data-modal="${type}"]`);
		if ($targetItem.length) {
			$targetItem.show();
		}
	}
}