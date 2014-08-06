WAF.define('Text', ['waf-core/widget'], function(Widget) {
    "use strict";

    var setOverflow = function() {
        this.removeClass('waf-overflow-x');
        this.removeClass('waf-overflow-y');
        this.removeClass('waf-overflow-xy');
        if(this.overflow()) {
            this.addClass(this.overflow());
        }
    };

    var Text = Widget.create('Text', {
        value: Widget.property({
            defaultValueCallback: function() {
                return this.node.innerHTML;
            }
        }),
        url: Widget.property({ type: 'string' }),
        urlTarget: Widget.property({
            type: 'enum',
            values: ['_blank', '_self'],
            bindable: false
        }),
        overflow: Widget.property({
            type: 'enum',
            values: {
                '': 'Hidden',
                'waf-overflow-x': 'Horizontal',
                'waf-overflow-y': 'Vertical',
                'waf-overflow-xy': 'Both'
            },
            defaultValue: function() {
                var r = /\bwaf-overflow-(x|y|xy)\b/.exec(this.node.className);
                return r ? r[0] : '';
            },
            bindable: false
        }),
        plainText: Widget.property({
            type: 'boolean',
            defaultValue: true,
            bindable: false
        }),
        render: function() {
            if(this.plainText()) {
                this.node.textContent = this.value();
            } else {
                this.node.innerHTML = this.value();
            }
        },
        init: function() {
            this.render();
            this.value.onChange(this.render);
            this.plainText.onChange(this.render);

            $(this.node).on('click', function() {
                if(this.url()) {
                    if(this.urlTarget() === '_blank') {
                        window.open(this.url());
                    } else {
                        window.location = this.url();
                    }
                }
            }.bind(this));

            setOverflow.call(this);
            this.overflow.onChange(setOverflow);
        }
    });

    return Text;
});
