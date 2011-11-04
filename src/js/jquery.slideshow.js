(function($) {

  var isShowing = false, timer;

  $.slideshow = function(target, config) {
    this.config = $.extend(true, {}, $.slideshow.defaults, config);
    this.target = target;
    this.init();
  };

  $.extend($.slideshow, {
    defaults: {
      interval: 5,
      speed: 'slow',
    },

    prototype: {
      init: function() {
        this.slides = $(this.target).children();
        this.currentIndex = 0;
        this.current = $(this.slides[this.currentIndex]).css('z-index', 2);
      },

      show: function() {
        if (isShowing) {
          return;
        }
        //console.log(this.target.id + ': ' + new Date());
        isShowing = true;

        var self = this, 
          nextIndex = self.currentIndex == self.slides.length - 1 ? 0 : self.currentIndex + 1;
          next = $(self.slides[nextIndex]);

        self.change(self.current, next, function() {
          self.current = next;
          self.currentIndex = nextIndex;
          isShowing = false;
        });
      },

      change: function(from, to, callback) {
        to.css('z-index', 1);
        from.fadeOut(this.config.speed, function() {
          to.css('z-index', 2);
          from.css('z-index', 0).show();
          callback();
        });
      },

      start: function() {
        timer = setInterval($.proxy(this.show, this), this.config.interval * 1000);
      },

      stop: function() {
        clearInterval(timer);
      }
    }
  });

  $.fn.slideshow = function(config) {
    return this.each(function() {
      var slideshow = new $.slideshow(this, config);
      slideshow.start();
    });
  }

}(jQuery));
