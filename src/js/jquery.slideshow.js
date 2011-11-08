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
        self.currentIndex = 0;

        $(self.slides[self.currentIndex]).css('z-index', 2);
        //$.slideshow.ext.navigation(self);

        self.next = function() {
            if (isLocked) {
                return false;
            }
            isLocked = true;

            var data = {
                nextIndex: self.currentIndex == self.slides.length - 1 ? 0 : self.currentIndex + 1
            };

            $(self).trigger('beforeNext.slideshow', [data]);
            self.transform($(self.slides[self.currentIndex]), $(self.slides[data.nextIndex]), function() {
                self.currentIndex = data.nextIndex;
                $(self).trigger('afterNext.slideshow');
                isLocked = false;
            });
        };

        self.transform = function(from, to, callback) {
            to.css('z-index', 1);
            from.fadeOut(self.config.speed, function() {
                to.css('z-index', 2);
                from.css('z-index', 0).show();
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
