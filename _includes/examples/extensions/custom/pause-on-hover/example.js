$('.slides').slidex({ delay: 1 }, function(slidex) {
    $(slidex.target)
        .mouseover(function() { slidex.stop(); })
        .mouseout(function() { slidex.start(); });
});