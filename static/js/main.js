// jQuery CSS3 Rotate
(function(d){function e(a){for(var b=["transform","WebkitTransform","MozTransform","msTransform","OTransform"],c;c=b.shift();)if(a.style[c]!==void 0)return c;return!1}d.cssHooks.rotate={get:function(a){var b=e(a);return b?a.style[b].replace(/.*rotate\((.*)deg\).*/,"$1"):""},set:function(a,b){var c=e(a);if(c)b=parseInt(b),d(a).data("rotatation",b),a.style[c]=b==0?"":"rotate("+b%360+"deg)";else return""}};d.fx.step.rotate=function(a){d.cssHooks.rotate.set(a.elem,a.now)}})(jQuery);


// Actual start of application's JavaScript
(function(window, $) {

    var button = $('.btn');

    button.click(function(e) {
        var action = $('.action'),
            text = $(this).text();

        e.preventDefault();

        action.text(text).show();

        setTimeout(function(e) {
            $('.action').addClass('rotate');
        }, 50);

        setTimeout(function(e) {
            $('.action').removeClass('rotate').hide();
        }, 1500);

        $.ajax({
            cache: false,
            url: '/random',
            success: function(data) {
                var button = $('.btn'),
                    catchphrase = $('.catchphrase');
                catchphrase.text(data.catchphrase);
                button.text(data.action);
            }
        });
    });

})(window, jQuery);
