(function($) {
    $.slideshow = function(target, config) {
        var defaults = {
                interval: 5,
                speed: 'slow',
                autoStart: true
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

        self.isPlaying = function() {
            return null !== timer;
        };

        self.start = function() {
            timer = setInterval(function() { self.next(); }, self.config.interval * 1000);
        };

        self.stop = function() {
            clearInterval(timer);
            timer = null;
        };
    };

    $.fn.slideshow = function(method) {
        return this.each(function() {
            var slideshow = $.data(this, 'slideshow');

            if (slideshow && $.isFunction(slideshow[method])) {
                slideshow[method].apply(slideshow, Array.prototype.slice.call(arguments, 1));
            } else if ('object' === typeof method || !method) {
                slideshow = new $.slideshow(this, method);
                $.data(this, 'slideshow', slideshow);
                if (slideshow.config.autoStart) {
                    slideshow.start();
                }
            } else {
                $.error('Method ' +  method + ' does not exist on jQuery.slideshow');
            }
        });
    }

}(jQuery));
