(function(Text) {
    "use strict";
    Text.setWidth(80);
    Text.setHeight(20);

    Text.addStates(':hover', ':active');
    
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
        'name':'touchcancel',
        'description':'On Touch Cancel',
        'category':'Touch Events'
    },{ 
        'name':'touchend',
        'description':'On Touch End',
        'category':'Touch Events'
    },{ 
        'name':'touchstart',
        'description':'On Touch Start',
        'category':'Touch Events'
    });

    Text.customizeProperty('value', { multiline: true });

    Text.addLabel({ defaultValue: '', description: 'Label for widget' });

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
        $(this.node).find('a').click(function(e){ e.preventDefault(); });
        if(this.url() || this.url.boundDatasource()) {
            this.urlTarget.show();
        } else {
            this.urlTarget.hide();
        }
    };

    function showValue(){
        var dsValue = this.value.boundDatasource();
        if(dsValue && dsValue.datasourceName){
            this.value('['+dsValue+']');
        }
    }
    
    Text.doAfter('init', function() {
        this._formatter = false;
        this.render();
        showUrl.call(this);
        showValue.call(this);
        this.url.onChange(showUrl);
        this.subscribe('datasourceBindingChange', 'url', showUrl, this);  
        this.subscribe('datasourceBindingChange','value', showValue, this);
        
        // disable click
        $(this.node).off('click', this._handleClick);
        $(this.node).find('a').click(function(e){ e.preventDefault(); });
    });
    
    Text.customizeProperty('displayValue', { display: false, sourceDisplay: false });
    Text.customizeProperty('plainText', {title: 'Plain text'});
    Text.customizeProperty('url', {title: 'URL'});
    Text.customizeProperty('urlTarget', {title: 'Target'});
    Text.customizeProperty('autoResize', {title: 'Auto resize'});

    Text.studioOnResize(function(){
        this.autoResize(false);
    });

});