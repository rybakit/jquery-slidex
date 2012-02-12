$('.slides').slidex({ animate: function($from, $to) {
    var effects = [ 'clip', 'drop', 'explode', 'fold', 'puff' ],
        effect = effects[Math.floor(Math.random() * effects.length)];

    $to.addClass('slidex-semi-active');
    return $from.effect(effect, {}, this.options.speed, function() {
            $to.addClass('slidex-active').removeClass('slidex-semi-active');
            $from.removeClass('slidex-active').show();
        });
}});