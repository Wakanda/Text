WAF.define('Text', ['waf-core/widget'], function(Widget) {
    "use strict";

    var Text = Widget.create('Text', {
        value: Widget.property({
            type: 'string',
            description: 'Value to display',
            defaultValue: 'Text'
        }),
        format: Widget.property({
            type: 'string',
            description: 'Format for the Value',
            bindable: false
        }),
        autoResize: Widget.property({
            type: 'boolean',
            description: 'Automatically resize the widget',
            defaultValue: true,
            bindable: false
        }),
        url: Widget.property({
            type: 'string',
            description: 'URL to include on Value'
        }),
        urlTarget: Widget.property({
            type: 'enum',
            description: 'Location where to open the URL',
            values: ['_blank', '_self'],
            bindable: false
        }),
        scrollbar: Widget.property({
            type: 'enum',
            description: 'Display scrollbars',
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
            description: 'Value displayed as plain text or formatted HTML text',
            defaultValue: true,
            bindable: false
        }),                
        render: function(value) {
            value = value || this.value();
            value = WAF.utils.formatString(value,this.format());
            if(!this.url()){
                if(this.plainText()) {
                    this.node.textContent = value;
                } else {
                    this.node.innerHTML = value;
                }
            }else{
                this.node.innerHTML = '<a href="'+this.url()+'" target="'+this.urlTarget()+'">'+value+'</a>';
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
                    'white-space': ''
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
            this.url.onChange(function(){ this.render(); });
            this.urlTarget.onChange(function(){ this.render(); });
            this.format.onChange(function(){ this.render(); });
            this.autoResize.onChange(function(){ this.autoResizer(); });
            this.scrollbar.onChange(function(){ this.setOverflow(); });
        }
    });

    Text.addTabIndex();
    
    return Text;
});