WAF.define('Text', ['waf-core/widget'], function(Widget) {
    "use strict";

    var Text = Widget.create('Text', {
        init: function() {
            this.render();
            this.value.onChange(this.render);
        },
        render: function() {
            this.node.innerHTML = this.value() || '';
        },
        value: Widget.property({
            defaultValueCallback: function() {
                return this.node.innerHTML;
            }
        })
    });

    return Text;
});
