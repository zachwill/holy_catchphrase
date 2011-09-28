(function(window, $) {

    // A function to rotate the action element.
    function rotate() {
        if (!window._action) {
            window._action = $('.action');
        }

        setTimeout(function(e) {
            var action = window._action;
            action.addClass('rotate');
        }, 10);

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
            action = window._action || $('.action'),
            text = $(this).text();

        e.preventDefault();
        self.attr('disabled', true);
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
