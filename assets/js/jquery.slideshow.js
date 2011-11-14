(function($) {
    $.slideshow = function(target, config) {
        var defaults = {
                interval: 5,
                speed: 'slow'
            }, self = this, isLocked = false, timer = null;

        self.config = $.extend(defaults, config);
        self.target = target;
        self.slides = $(self.target).children();

        self.index = $('>.current', self.target).index();
        if (-1 == self.index) {
            $(self.slides[self.index = 0]).addClass('current');
        }

        //$.slideshow.ext.navigation(self);

        self.next = function() {
            if (isLocked) {
                return false;
            }
            isLocked = true;

            var data = {
                nextIndex: self.index == self.slides.length - 1 ? 0 : self.index + 1
            };

            $(self).trigger('beforeNext.slideshow', [data]);
            self.transform($(self.slides[self.index]), $(self.slides[data.nextIndex]), function() {
                self.index = data.nextIndex;
                $(self).trigger('afterNext.slideshow');
                isLocked = false;
            });
        };

        self.transform = function(from, to, callback) {
            to.addClass('next');
            from.fadeOut(self.config.speed, function() {
                to.addClass('current').removeClass('next');
                from.removeClass('current').show();
                callback.call(self);
            });
        };
    };

    $.fn.slideshow = function(config) {
        return this.each(function() {
            var slideshow = new $.slideshow(this, config);
            setInterval(function() { slideshow.next(); }, slideshow.config.interval * 1000);
        });
    }

}(jQuery));
