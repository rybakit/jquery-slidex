(function($) {
    $.slideshow = function(target, config) {
        this.config = $.extend($.slideshow.defaults, config);
        this.target = target;
        this.init();
    };

    $.extend($.slideshow, {
        defaults: {
            interval:   5,
            speed:      'slow',
            plugins:    [],

            /*
            transition: function(from, to) {
                to.addClass('active').show();
                from.removeClass('active').show();
            }
            */

            transition: function(from, to) {
                from.addClass('last-active').removeClass('active');
                return to.hide().addClass('active').fadeIn(this.config.speed, function() {
                    from.removeClass('last-active');
                });
            }
        },

        prototype: {
            constructor: $.slideshow,

            init: function() {
                this.slides = $(this.target).children();
                this.index = $('>.active', this.target).index();
                if (-1 == this.index) {
                    $(this.slides[ this.index = 0 ]).addClass('active');
                }
                for (var i = 0, len = this.config.plugins.length; i < len; i++) {
                    this.config.plugins[i].call(this);
                }
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
                $.when(
                    this.config.transition.call(self, $(self.slides[self.index]), $(self.slides[data.nextIndex]))
                ).done(function() {
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