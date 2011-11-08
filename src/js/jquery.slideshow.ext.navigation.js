(function($) {
    if ('undefined' == typeof $.slideshow) {
        $.error('jQuery.slideshow is not defined.');
    }

    ($.slideshow.ext = $.slideshow.ext || {}).navigation = function(slideshow) {
        var jumpToIndex = null, items = [];

        for (var i = 0, len = slideshow.slides.length; i < len; i++) {
            items.push(i == slideshow.currentIndex ? '<li class="current"></li>' : '<li></li>');
        }
        var nav = $('<ul class="navigation">' + items.join('') + '</ul>')
            .appendTo(slideshow.target);

        nav.find('li').click(function() {
            if (null !== jumpToIndex) {
                return false;
            }
            jumpToIndex = $(this).index();
            slideshow.next();
        });

        $(slideshow).bind({
            'beforeNext.slideshow': function(e, data) {
                if (null !== jumpToIndex) {
                    data.nextIndex = jumpToIndex;
                    jumpToIndex = null;
                }
                if (slideshow.currentIndex == data.nextIndex) {
                    return;
                }
                nav.find('li:eq(' + slideshow.currentIndex + '), li:eq(' + data.nextIndex + ')').toggleClass('current', slideshow.config.speed);
            }
        });
    }
}(jQuery));
