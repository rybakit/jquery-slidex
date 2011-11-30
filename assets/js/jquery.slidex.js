(function($) {
    $.slidex = function(target, config) {
        this.config = $.extend($.slidex.defaults, config);
        this.target = target;
        this.init();
    };

    $.extend($.slidex, {
        defaults: {
            interval: 5,
            speed: 'slow',
            transition: function(from, to) {
                from.addClass('slidex-semi-active').removeClass('slidex-active');
                return to.hide().addClass('slidex-active').fadeIn(this.config.speed, function() {
                    from.removeClass('slidex-semi-active');
                });
            }
        },

        prototype: {
            constructor: $.slidex,

            init: function() {
                this.slides = $(this.target).children();
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

            play: function() {
                var self = this;
                if (self.timer) {
                    clearInterval(self.timer);
                }
                self.timer = setInterval(function() { self.show(); }, self.config.interval * 1000);
            }
        }
    });

    $.fn.slidex = function(config, decorate) {
        return this.each(function() {
            var slidex = new $.slidex(this, config);
            if ($.isFunction(decorate)) {
                decorate(slidex);
            }
            slidex.play();
        });
    }

}(jQuery));