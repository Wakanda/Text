WAF.define('Text', ['waf-core/widget'], function(Widget) {
    "use strict";

    var Text = Widget.create('Text', {
        value: Widget.property({
            type: 'string',
            description: 'Value to display',
            defaultValueCallback: function(){
                return (this.plainText() && this._displayValue) ? this.node.textContent : this.node.innerHTML;
            }
        }),
        _displayValue : null,
        displayValue : function(value){
            if(arguments.length > 0){
                this._displayValue = value;
            }
            return this._displayValue;
        },
        format: Widget.property({
            type: 'string',
            description: 'Format for the Value',
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
            defaultValue: '_blank',
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
        getType: function() {
            var binding = this.value.boundDatasource();
            if(!binding || !binding.valid) {
                return;
            }
            switch(binding.datasource.getAttribute(binding.attribute).type) {
                case "long":
                case "number":
                case "float":
                case "long":
                case "byte":
                case "word":
                case "long64":
                    return 'Number';
                case "string":
                    return "String";
                case "date":
                    return "Date";
            }
        }, 
        getFormattedValue: function(value){
            if(value === null) {
                return '';
            }else if(this._formatter && !this.format()){
                var bound = this.value.boundDatasource();
                if(bound && bound.datasource && bound.datasource.getClassAttributeByName(bound.attribute).defaultFormat) {
                    var defaultFormatter = 'format' + bound.datasource.getClassAttributeByName(bound.attribute).type.charAt(0).toUpperCase() + bound.datasource.getClassAttributeByName(bound.attribute).type.slice(1).toLowerCase();
                    if (defaultFormatter in WAF.utils) {
                        value = WAF.utils[defaultFormatter](value, { format: bound.datasource.getClassAttributeByName(bound.attribute).defaultFormat.format });
                    }else{
                        value = WAF.utils.formatString(value,bound.datasource.getClassAttributeByName(bound.attribute).defaultFormat.format);
                    }
                }
            }else if(this._formatter && this.format()){
                var formatter = 'format' + this.getType();
                if (formatter in WAF.utils) {
                    value = WAF.utils[formatter](value, { format: this.format() });
                }else{
                    value = WAF.utils.formatString(value, { format: this.format() });
                }
            }
            return value;
        },
        render: function(value) {
            value = value || this.value();
            value = this.displayValue(this.getFormattedValue(value)); 
            if(!this.url()){
                if(this.plainText()) {
                    this.node.textContent = value;
                } else {
                    this.node.innerHTML = value;
                }
            }else{
                this.node.innerHTML = '<a href="'+this.url()+'" target="'+this.urlTarget()+'">'+value+'</a>';
            }
        },
        clear: function(){
            this.value('');
            this.displayValue('');
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
            }
        },
        init: function() {
            this._formatter = true;
            this.render();
            this.setOverflow();

            this.value.onChange(function(){ this.render(); });
            this.plainText.onChange(function(){ this.render(); });
            this.url.onChange(function(){ this.render(); });
            this.urlTarget.onChange(function(){ this.render(); });
            this.format.onChange(function(){ this.render(); });
            this.scrollbar.onChange(function(){ this.setOverflow(); });
        }
    });

    Text.addTabIndex();
    
    return Text;
});