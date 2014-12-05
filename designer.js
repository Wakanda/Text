(function(Text) {
    "use strict";
    Text.setWidth(80);
    Text.setHeight(20);

    Text.addEvents({ 
        'name':'action' 
    },{ 
        'name':'click', 
        'category':'Mouse Events',
        'description':'On Click'
    },{ 
        'name':'dblclick', 
        'description':'On Double Click',
        'category':'Mouse Events'
    },{ 
        'name':'mousedown', 
        'description':'On Mouse Down',
        'category':'Mouse Events'
    },{ 
        'name':'mouseout',
        'description':'On Mouse Out',
         'category':'Mouse Events'
    },{ 
        'name':'mouseover',
        'description':'On Mouse Over',
        'category':'Mouse Events'
    },{ 
        'name':'mouseup',
        'description':'On Mouse Up',
        'category':'Mouse Events'
    },{ 
        'name':'touchstart',
        'description':'On Touch Start',
        'category':'Touch Events'
    },{ 
        'name':'touchend',
        'description':'On Touch End',
        'category':'Touch Events'
    },{ 
        'name':'touchcancel',
        'description':'On Touch Cancel',
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
    
    Text.customizeProperty('plainText', {title: 'Plain text'});
    Text.customizeProperty('url', {title: 'URL'});
    Text.customizeProperty('urlTarget', {title: 'Target'});
    Text.customizeProperty('autoResize', {title: 'Auto resize'});

    Text.studioOnResize(function(){
        this.autoResize(false);
    });

    function showValue(){
        if(this.value.boundDatasource() && this.value.boundDatasource().datasourceName){
            this.value('['+this.value.boundDatasource()['datasourceName']+'.'+this.value.boundDatasource()['attribute']+']')
        }else{
            this.clear();
        }
    }
    Text.doAfter('init', function() {
        this.subscribe('datasourceBindingChange','value', showValue, this);
    });

});