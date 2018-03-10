(function($) {

    $.widget('time.countdown', {

        options : {
            remaining : (2 * 24 * 60 * 60 * 1000),
            updatefreq: 1000
        },

        _create : function () {
            'use strict';
            this._start();
        },

        _setOption: function(key, value) {
            key == 'remaining' ?
                this.reset(value) :
                this._super(key, value);
        },

        _start: function () {
            'use strict';
            // your countdown code
        },

        reset: function(remaining) {
            // You should perform some checks on the given value
            this.options.remaining = remaining;
            this._destroy();
            this._start();
        },

        _destroy: function() {
            'use strict';
            if (this.interval !== undefined)
                window.clearInterval(this.interval);
            this.element.html('');
        }
    });

})(jQuery);

// new value to set = 3600

// Call to the "public" `reset()` function
$('#timer').countdown('reset', 3600);

// Call to the `_setOption()`
$('#timer').countdown({remaining: 3600});

// Call to the `_setOption()`
$('#timer').countdown('option', 'remaining', 3600);