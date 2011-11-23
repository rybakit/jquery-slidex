(function($) {
    if ('undefined' == typeof $.slideshow) {
        $.error('jQuery.slideshow is not defined.');
    }

    ($.slideshow.plugins = $.slideshow.plugins || {}).pagination = function() {
        var self = this, jumpToIndex = null, items = [];

        for (var i = 0, len = self.slides.length; i < len; i++) {
            items.push(i == self.index ? '<li class="current"></li>' : '<li></li>');
        }
        var nav = $('<ul class="pagination">' + items.join('') + '</ul>').appendTo(self.target);

        nav.find('li').click(function() {
            if (null !== jumpToIndex) {
                return false;
            }
            jumpToIndex = $(this).index();
            self.next();
        });

        $(self).bind({
            'beforeNext.slideshow': function(e, data) {
                if (null !== jumpToIndex) {
                    data.nextIndex = jumpToIndex;
                    jumpToIndex = null;
                }
                if (self.index == data.nextIndex) {
                    return;
                }
                nav.find('li:eq(' + self.index + ')').animate({ opacity: 0.4 }, self.config.speed);
                nav.find('li:eq(' + data.nextIndex + ')').animate({ opacity: 0.8 }, self.config.speed);
                //nav.find('li:eq(' + self.index + '), li:eq(' + data.nextIndex + ')').toggleClass('current', self.config.speed);
            }
        });
    }
}(jQuery));