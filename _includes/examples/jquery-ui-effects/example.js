$('.slides').slidex({ transition: function(from, to) {
    var effects = [ 'clip', 'drop', 'explode', 'fold', 'puff' ];

    to.addClass('slidex-semi-active');
    return from.effect(effects[ this.index % effects.length ], {}, this.config.speed, function() {
            to.addClass('slidex-active').removeClass('slidex-semi-active');
            from.removeClass('slidex-active').show();
        });
}});