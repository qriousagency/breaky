
(function(){
	var fnIndex = 0;
	var fnSwitch = {};
	var fnList = {};
	var breakpoints = [];
  
  	function setSwitch() {
	    var onItems = fnSwitch[breaky.value].on;
	    var onItemsLength = onItems.length;
	    var offItems = fnSwitch[breaky.value].off;
	    var offItemsLength = offItems.length;

	    for ( var i = 0; i < onItemsLength; i++ ) {
			if(!fnList[onItems[i]].active) {   	
				fnList[onItems[i]].fn();
				fnList[onItems[i]].active = true;
			}
    	}
    	for ( var i = 0; i < offItemsLength; i++ ) {
     		fnList[offItems[i]].active = false;
    	}
  	}

	function readValue( el ) {
    	return window.getComputedStyle(
      		document.querySelector(el), ':before'
        ).getPropertyValue( 'content' ).replace( /\"/g, '' ).replace( /\'/g, '' );
  	}

  	function appendFunction( fn ){
    	fnIndex++;
    	fnList[fnIndex] = {};
    	fnList[fnIndex]["fn"] = fn;
    	fnList[fnIndex]["active"] = false;
  	}
  	
  	function connectFunction( view1, direction, view2 ) {
    	var viewIndex1 = breakpoints.indexOf( view1 );
    	var viewIndex2 = breakpoints.indexOf( view2 );

    	for( var i = 0; i < breakpoints.length; i++ ) {
      		if( i == viewIndex1 && direction == "at"
      	 	|| i <= viewIndex1 && direction == "below" 
         	|| i >= viewIndex1 && direction == "above" 
         	|| viewIndex1 <= i && i <= viewIndex2 &&  direction == "between" ) {
        		fnSwitch[breakpoints[i]].on.push( fnIndex );	
      		} else {
        		fnSwitch[breakpoints[i]].off.push( fnIndex );	
      		}
    	}
    	setSwitch();
  	}
  	
  	function createFnSwitch() {
  		breakpointsLength = breakpoints.length;
  		for(var i = 0; i < breakpointsLength; i++ ) {
	  		fnSwitch[breakpoints[i]] = {};
	  		fnSwitch[breakpoints[i]].on = [];
	  		fnSwitch[breakpoints[i]].off = [];
  		}
  	}
  	
  	function connectAndAppendFn( fn, view1, direction, view2 ) {
  		appendFunction( fn );
  		connectFunction( view1, direction, view2 );
  	}

  	window.breaky = {
	    below: function( view, fn ) {
	    	connectAndAppendFn( fn, view, "below" );
		},
	    above: function( view, fn ) {
	    	connectAndAppendFn( fn, view, "above" );
		},
	    between: function( view1, view2, fn ) {
	    	connectAndAppendFn( fn, view1, "between", view2 );
	    },
	    at : function( view, fn ) {
	    	connectAndAppendFn( fn, view, "at" );
	    },
	    init : function() {
        var timeOut = null;
  			breakpoints = readValue( "html" ).split( "," );
  			createFnSwitch();
  			breaky.value = readValue( "body" );
      	window.onresize = function () {
          if (timeOut != null) {
            clearTimeout(timeOut);
          }

          timeOut = setTimeout(function(){
            if(breaky.value !== readValue( "body" )){
              breaky.value = readValue( "body" );
              setSwitch();
            }
          }, 250);
        	
      	}
	    }
	}
	breaky.init();
})();