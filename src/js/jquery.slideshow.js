(function($) {
    $.slideshow = function(target, config) {
        var defaults = {
                interval: 5,
                speed: 'slow'
            }, self = this, isShowing = false, timer;

        self.config = $.extend(defaults, config);
        self.target = target;
        self.slides = $(self.target).children();
        self.currentIndex = 0;

        $(self.slides[self.currentIndex]).css('z-index', 2);

        self.show = function() {
            if (isShowing) {
                return false;
            }
            isShowing = true;

            var current = $(self.slides[self.currentIndex]),
                nextIndex = self.currentIndex == self.slides.length - 1 ? 0 : self.currentIndex + 1;
                next = $(self.slides[nextIndex]);

            self.change(current, next, function() {
                self.currentIndex = nextIndex;
                isShowing = false;
            });
        };

        self.change = function(from, to, callback) {
            to.css('z-index', 1);
            from.fadeOut(self.config.speed, function() {
                to.css('z-index', 2);
                from.css('z-index', 0).show();
                callback.call(self);
            });
        };

        self.start = function() {
            timer = setInterval(function() { self.show(); }, self.config.interval * 1000);
        };


        self.stop = function() {
            clearInterval(timer);
        };
    };

    $.fn.slideshow = function(config) {
        return this.each(function() {
            var slideshow = new $.slideshow(this, config);
            slideshow.start();
        });
    }

}(jQuery));
