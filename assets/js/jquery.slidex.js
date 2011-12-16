(function($) {
    $.slidex = function(target, config) {
        this.config = $.extend($.slidex.defaults, config);
        this.target = target;
        this.init();
    };

    $.extend($.slidex, {
        defaults: {
            delay: 5,
            speed: 'slow',
            filter: null,
            transition: function(from, to) {
                from.addClass('slidex-semi-active').removeClass('slidex-active');
                return to.hide().addClass('slidex-active').fadeIn(this.config.speed, function() {
                    from.removeClass('slidex-semi-active');
                });
            }
        },

        prototype: {
            init: function() {
                this.slides = $(this.target).children(this.config.filter);
                this.index = $('>.slidex-active', this.target).index();
                if (-1 == this.index) {
                    $(this.slides[ this.index = 0 ]).addClass('slidex-active');
                }
            },

            show: function(index) {
                var self = this;

                if (self.locked) {
                    return false;
                }
                self.locked = true;

                if ('undefined' === typeof index) {
                    index = self.index == self.slides.length - 1 ? 0 : self.index + 1;
                }

                $(self).trigger('before.slidex', [ self.index, index ]);
                $.when(
                    self.config.transition.call(self, $(self.slides[self.index]), $(self.slides[index]))
                ).done(function() {
                    self.index = index;
                    $(self).trigger('after.slidex');
                    self.locked = false;
                });
            },

            start: function() {
                var self = this;
                self.stop();
                self.timer = setInterval(function() { self.show(); }, self.config.delay * 1000);
            },

            stop: function() {
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
            }
        }
    });

    $.fn.slidex = function(config, decorate) {
        return this.each(function() {
            var slidex = new $.slidex(this, config);
            if ($.isFunction(decorate)) {
                decorate(slidex);
            }
            slidex.start();
        });
    }

}(jQuery));