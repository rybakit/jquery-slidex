(function($) {
    if ('undefined' == typeof $.slideshow) {
        throw '$.slideshow is not found.';
    }

    ($.slideshow.ext = $.slideshow.ext || {}).navigation = function(slideshow) {
        var items = [];
        for (var i = 0, len = slideshow.slides.length; i < len; i++) {
            if (i == slideshow.currentIndex) {
                items.push('<li style="opacity:.9"></li>');
            } else {
                items.push('<li></li>');
            }
        }
        var nav = $('<ul class="navigation">' + items.join('') + '</ul>');
        nav.find('li').eq(slideshow.currentIndex).addClass('current');
        $(slideshow.target).append(nav);

        var jumpToIndex = null;

        nav.find('li').click(function() {
            jumpToIndex = $(this).index();
            slideshow.next();
        });

        $(slideshow).bind({
            beforeNext: function(e, data) {
                if (null !== jumpToIndex) {
                     data.nextIndex = jumpToIndex;
                    jumpToIndex = null;
                }
                nav.find('li').eq(slideshow.currentIndex).animate({ opacity: .5 }, slideshow.config.speed);
                nav.find('li').eq(data.nextIndex).animate({ opacity: .9 }, slideshow.config.speed);
            }
        });
    }
}(jQuery));
