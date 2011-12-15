$('.slides').slidex({ transition: function(from, to) {
    from.addClass('slidex-semi-active').removeClass('slidex-active');
    return to.css('top', '-' + to.css('height'))
      .addClass('slidex-active')
      .animate({ top: 0 }, {
          duration: this.config.speed,
          specialEasing: { top: 'easeOutBounce' },
          complete: function() {
              from.removeClass('slidex-semi-active');
          }
      });
}});