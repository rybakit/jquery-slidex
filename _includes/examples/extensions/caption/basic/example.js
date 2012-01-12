$('.slides').slidex({ filter: 'img' }, function (slidex) {
    $.slidex.ext.caption(slidex, '.slidex-caption');
});