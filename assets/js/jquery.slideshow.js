(function($) {
    $.slideshow = function(target, config) {
        this.config = $.extend($.slideshow.defaults, config);
        this.target = target;
        this.init();
    };

    $.extend($.slideshow, {
        defaults: {
            interval: 5,
            speed: 'slow',
            transition: 'fade',
            plugins: []
        },

        transitions: {
            fade: function(from, to) {
                var d = $.Deferred();

                to.addClass('next');
                from.fadeOut(this.config.speed, function() {
                    to.addClass('current').removeClass('next');
                    from.removeClass('current').show();
                    d.resolve();
                });

                return d.promise();
            }
        },

        prototype: {
            constructor: $.slideshow,

            init: function() {
                this.slides = $(this.target).children();
                this.index = $('>.current', this.target).index();
                if (-1 == this.index) {
                    $(this.slides[ this.index = 0 ]).addClass('current');
                }
                for (var i = 0, len = this.config.plugins.length; i < len; i++) {
                    this.config.plugins[i].call(this);
                }
            },

            transition: function() {
                if ($.isFunction(this.config.transition)) {
                    return this.config.transition;
                }
                if (!$.slideshow.transitions[this.config.transition]) {
                    $.error('The transition "' + this.config.transition + '" is not supported.');
                    return false;
                }
                return $.slideshow.transitions[this.config.transition];
            },

            next: function() {
                var self = this;

                if (self.locked) {
                    return false;
                }
                self.locked = true;

                var data = {
                    nextIndex: self.index == self.slides.length - 1 ? 0 : self.index + 1
                };

                $(self).trigger('beforeNext.slideshow', [data]);
                self.transition()
                    .call(self, $(self.slides[self.index]), $(self.slides[data.nextIndex]))
                    .done(function() {
                        self.index = data.nextIndex;
                        $(self).trigger('afterNext.slideshow');
                        self.locked = false;
                    });
            }
        }
    });

    $.fn.slideshow = function(config) {
        return this.each(function() {
            var slideshow = new $.slideshow(this, config);
            setInterval(function() { slideshow.next(); }, slideshow.config.interval * 1000);
        });
    }

}(jQuery));