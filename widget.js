WAF.define('Text', ['waf-core/widget'], function(Widget) {
    "use strict";

    var Text = Widget.create('Text', {
        value: Widget.property({
            type: 'string'
        }),
        format: Widget.property({
            type: 'string',
            bindable: false
        }),
        autoResize: Widget.property({
            type: 'boolean',
            defaultValue: true,
            bindable: false
        }),
        url: Widget.property({ type: 'string' }),
        urlTarget: Widget.property({
            type: 'enum',
            values: ['_blank', '_self'],
            bindable: false
        }),
        scrollbar: Widget.property({
            type: 'enum',
            values: {
                'hidden':  'Hidden',
                'horizontal':  'Horizontal',
                'vertical': 'Vertical',
                'both': 'Both'
            },
            defaultValue: 'Hidden',
            bindable: false
        }),

        plainText: Widget.property({
            type: 'boolean',
            defaultValue: true,
            bindable: false
        }),        
        addTabIndex : function() {

        },
        render: function(value) {
            value = value || this.value();
            value = WAF.utils.formatString(value,this.format());
            if(this.plainText()) {
                this.node.textContent = value;
            } else {
                this.node.innerHTML = value;
            }
            this.autoResizer();
        },
        clear: function(){
            this.value('');
        },
        autoResizer: function(){
            if (this.autoResize()) {
                this.style({
                    'width'     : 'auto',
                    'height'    : 'auto',
                    'white-space': 'nowrap'
                });
                this.size(this.width(),this.height());
                this.autoResize(true);
            }else{
                this.style({
                    'width'     : '',
                    'height'    : '',
                    'white-space': 'normal'
                });
            }
        },
        setOverflow: function(){
            switch(this.scrollbar()){
                case 'hidden':
                    this.style({
                        'overflow'  : 'hidden'
                    });
                    break;
                case 'horizontal':
                    this.style({
                        'overflow-x'  : 'auto',
                        'overflow-y'  : 'hidden'
                    });
                    break;
                case 'vertical':
                    this.style({
                        'overflow-x'  : 'hidden',
                        'overflow-y'  : 'auto'
                    });
                    break;
                case 'both':
                    this.style({
                        'overflow'  : 'auto'
                    });
                    break;
                default:
                    break;
            };
        },
        init: function() {
            this.render();
            this.autoResizer();
            this.setOverflow();

            this.value.onChange(function(){ this.render(); });
            this.plainText.onChange(function(){ this.render(); });
            this.format.onChange(function(){ this.render(); });
            this.autoResize.onChange(function(){ this.autoResizer(); });
            this.scrollbar.onChange(function(){ this.setOverflow(); });

            $(this.node).on('click', function() {
                if(this.url()) {
                    if(this.urlTarget() === '_blank') {
                        window.open(this.url());
                    } else {
                        window.location = this.url();
                    }
                }
            }.bind(this));
        }
    });

    return Text;
});