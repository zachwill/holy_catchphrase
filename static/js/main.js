(function(window, $) {

    // A function to rotate the action element.
    function rotate() {
        if (!window._action) {
            window._action = $('.action');
        }

        setTimeout(function(e) {
            var action = window._action;
            action.addClass('rotate');
        }, 15);

        setTimeout(function(e) {
            var action = window._action;
            action.removeClass('rotate')
        }, 1400);

        setTimeout(function(e) {
            var action = window._action;
            action.hide();
        }, 2400);
    }


    var button = $('.btn');
    button.click(function(e) {
        var action = $('.action'),
            text = $(this).text();

        e.preventDefault();
        action.text(text).show();
        rotate();

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
