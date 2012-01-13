$('.slides').slidex({ delay: 2 }, function(slidex) {
    $(slidex.target)
        .mouseover(function() { slidex.stop(); })
        .mouseout(function() { slidex.start(); });
});
