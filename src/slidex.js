(function($) {
    "use strict";

    $.slidex = function(target, options) {
        this.$target = $(target);
        this.options = $.extend({}, $.slidex.defaults, options);
        this.init();
    };

    $.extend($.slidex, {
        defaults: {
            delay: 5,
            speed: 'slow',
            filter: null,
            animate: function($from, $to) {
                $from.addClass('slidex-semi-active').removeClass('slidex-active');
                return $to.hide().addClass('slidex-active').fadeIn(this.options.speed, function() {
                    $from.removeClass('slidex-semi-active');
                });
            }
        },
        _locked: false,
        _timer: null,

        prototype: {
            init: function() {
                this.slides = this.$target.children(this.options.filter);
                this.index = $('>.slidex-active', this.$target).index();
                if (-1 === this.index) {
                    $(this.slides[this.index = 0]).addClass('slidex-active');
                }
            },

            show: function(index) {
                var self = this;

                if (self._locked) {
                    return false;
                }
                self._locked = true;

                if ('undefined' === typeof index) {
                    index = self.index === self.slides.length - 1 ? 0 : self.index + 1;
                }

                self.$target.trigger('before.slidex', [self.index, index]);
                $.when(
                    self.options.animate.call(self, $(self.slides[self.index]), $(self.slides[index]))
                ).done(function() {
                    self.index = index;
                    self.$target.trigger('after.slidex');
                    self._locked = false;
                });
            },

            start: function() {
                var self = this;
                if (!this._timer) {
                    this._timer = setInterval(function() { self.show(); }, self.options.delay * 1000);
                    this.$target.trigger('start.slidex');
                }
            },

            stop: function() {
                if (this._timer) {
                    clearInterval(this._timer);
                    this._timer = null;
                    this.$target.trigger('stop.slidex');
                }
            }
        }
    });

    $.fn.slidex = function(options, decorate) {
        return this.each(function() {
            var slidex = $(this).data('slidex');
            if (!slidex) {
                slidex = new $.slidex(this, options);
                if ($.isFunction(decorate)) {
                    decorate(slidex);
                }
                $(this).data('slidex', slidex);
            }

            slidex.start();
        });
    };

}(window.jQuery));