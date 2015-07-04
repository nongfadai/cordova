define(function() {
    return function(it, opt) {
        var out = '<div class="header"></div><div class="content"></div>';
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            out += '<div class="itemfff"></div>';
        }
        out += '<div class="footer"></div>';
        return out;
    }
})