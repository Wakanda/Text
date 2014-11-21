(function(Text) {
    "use strict";
    Text.setWidth(50);
    Text.setHeight(16);

    Text.addEvents({ 
        'name':'action' 
    },{ 
        'name':'click', 
        'category':'Mouse Events' 
    },{ 
        'name':'dblclick', 
        'category':'Mouse Events'
    },{ 
        'name':'mousedown', 
        'category':'Mouse Events'
    },{ 
        'name':'mouseout',
         'category':'Mouse Events'
    },{ 
        'name':'mouseover',
        'category':'Mouse Events'
    },{ 
        'name':'mouseup',
        'category':'Mouse Events'
    },{ 
        'name':'touchstart',
        'category':'Touch Events'
    },{ 
        'name':'touchend',
        'category':'Touch Events'
    },{ 
        'name':'touchcancel',
        'category':'Touch Events'
    });

    Text.customizeProperty('value', { multiline: true });

    Text.addLabel({ defaultValue: '' });

    Text.setPanelStyle({
        'fClass': true, //This property is for the design panel
        'text': true,
        'textShadow': true,
        'dropShadow': true, 
        'innerShadow': true,
        'background': true,
        'border': true,
        'sizePosition': true,
        'label': true,
        'disabled': ['border-radius']
    });

    var showUrl = function() {
        if(this.url() || this.url.boundDatasource()) {
            this.urlTarget.show();
        } else {
            this.urlTarget.hide();
        }
    };

    Text.doAfter('init', function() {
        showUrl.call(this);
        this.url.onChange(showUrl);
        this.subscribe('datasourceBindingChange', 'url', showUrl, this);  
    });
    
    Text.studioOnResize(function(){
        this.autoResize(false);
    });

});
