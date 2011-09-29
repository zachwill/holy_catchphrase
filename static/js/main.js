(function(window, $) {

    window._action = $('.action');

    // A function to rotate the action element.
    function rotate() {
        setTimeout(function(e) {
            var action = window._action;
            action.addClass('rotate');
        }, 20);

        setTimeout(function(e) {
            var action = window._action;
            action.removeClass('rotate')
        }, 1400);

        setTimeout(function(e) {
            var action = window._action,
                button = $('.btn');
            button.attr('disabled', false);
            action.hide();
        }, 2400);
    }


    var button = $('.btn');
    button.click(function(e) {
        var self = $(this),
            action = window._action,
            text = $(this).text();

        e.preventDefault();

        if (self.attr('disabled')) {
            return false;
        } else {
            self.attr('disabled', true);
        }

        if (text.length <= 6) {
            action.css('background-image', 'url(/static/img/kapow.png)');
        } else {
            action.css('background-image', '');
        }

        action.html(text).show();
        rotate();

        $.ajax({
            cache: false,
            url: '/random',
            success: function(data) {
                var button = $('.btn'),
                    catchphrase = $('.catchphrase');
                catchphrase.html(data.catchphrase);
                button.html(data.action + '!');
            }
        });
    });

})(window, jQuery);
