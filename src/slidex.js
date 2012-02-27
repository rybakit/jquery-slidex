(function($) {
    "use strict";

    $.slidex = function(target, options) {
        this.$target = $(target);
        this.options = $.extend({}, $.slidex.defaults, options);
        this.init();
    };

    $.extend($.slidex, {
        defaults: {
            speed: 'slow',
            filter: null,
            animate: function($from, $to) {
                $from.addClass('slidex-semi-active').removeClass('slidex-active');
                return $to.hide().addClass('slidex-active').fadeIn(this.options.speed, function() {
                    $from.removeClass('slidex-semi-active');
                });
            }
        },

        prototype: {
            init: function() {
                this.slides = this.$target.children(this.options.filter);
                this.index = $(this.slides).filter('.slidex-active').index();
                if (-1 === this.index) {
                    $(this.slides[this.index = 0]).addClass('slidex-active');
                }
            },

            nextIndex: function() {
                return this.index === this.slides.length - 1 ? 0 : this.index + 1;
            },

            show: function(toIndex) {
                if ('undefined' === typeof toIndex) {
                    toIndex = this.nextIndex();
                }

                var e = $.Event('before'), self = this;
                this.$target.trigger(e, toIndex);

                if (false === e.result) {
                    return;
                }

                $.when(
                    this.options.animate.call(this, $(this.slides[this.index]), $(this.slides[toIndex]))
                ).done(function() {
                    self.index = toIndex;
                    self.$target.trigger('after');
                });
            }
        }
    });

    var lockable = function(slidex) {
        var locked;

        slidex.$target.on({
            'before': function(e, toIndex) {
                if (locked || slidex.index === toIndex) {
                    e.stopImmediatePropagation();
                    return false;
                }
                locked = true;
            },
            'after': function() {
                locked = false;
            }
        });
    };

    $.fn.slidex = function(options, decorate) {
        return this.each(function() {
            var $this = $(this), slidex = $this.data('slidex');
            if (!slidex) {
                slidex = new $.slidex(this, options);
                lockable(slidex);

                $this.click(function() {
                    slidex.show();
                });

                if ($.isFunction(decorate)) {
                    decorate(slidex);
                }
                $this.data('slidex', slidex);
            }
        });
    };

}(window.jQuery));