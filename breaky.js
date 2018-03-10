
(function(window, document, exportName, undefined){
  var fnIndex = 0;
  // object that assigns each function to breakpoint and on/offs
  var fnSwitch = {};
  // object of all functions and active state
  var fnList = {};
  // All possible breakpoints ex, ["mobile", "tablet", "desktop"]
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

     function readValue( el, pseudo ) {
      return window.getComputedStyle(
          document.querySelector(el), ':' + pseudo
        ).getPropertyValue( 'content' ).replace( /\"/g, '' ).replace( /\'/g, '' );
    }
    // Add function to {fnList}
    function appendFunction( fn ) {
      fnIndex++;
      fnList[fnIndex] = {};
      fnList[fnIndex]["fn"] = fn;
      fnList[fnIndex]["active"] = false;
    }

    function indexOf (collection, value) {
        // check if array protype exists if not use our own
        if (Array.prototype.indexOf) {
            return collection.indexOf( value );
        }
        for (var i = 0, l = collection.length; i < l; i++) {
            if(value === collection[i]) {
                return i;
            }
        }
    }
    // adds function to {fnSwitch}
    function connectFunction( view1, direction, view2 ) {
      // get index of view 1 and view 2 relative to the breakpoints array
      var viewIndex1 = indexOf(breakpoints, view1);
      var viewIndex2 = indexOf(breakpoints, view2);


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
    // Populates the object {fnSwitch} which will contain
    // all functions that should be called at certain breakpoints
    // by setting on and off arrays
    function createFnSwitch() {
      breakpointsLength = breakpoints.length;

      for(var i = 0; i < breakpointsLength; i++ ) {
        fnSwitch[breakpoints[i]] = {};
        fnSwitch[breakpoints[i]].on = [];
        fnSwitch[breakpoints[i]].off = [];
      }
    }
    function connectAndAppendFn( fn, view1, direction, view2 ) {
      // adds function to fnList
      appendFunction( fn );

      // add function to
      connectFunction( view1, direction, view2 );
    }

    // Define breaky
    breaky = {
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
      initIE8 : function(bp, value) {
          if(!window.getComputedStyle) {
            breakpoints = bp;
            createFnSwitch();
            breaky.value = value;
          }
      },
      init : function() {
        // get all possible breakpoints
        breakpoints = readValue( "html", "before" ).split( "," );

        // populate the object fnSwitch with on/off arrays
        createFnSwitch();

        // get the current breakpoint value
        breaky.value = readValue( "body", "before" );

        window.onresize = function () {
          if(breaky.value !== readValue( "body", "before" )) {
            breaky.value = readValue( "body", "before" );
            setSwitch();
          }
        }
      }
    }
    if(document["body"]) {
      if(window.getComputedStyle) {
        breaky.init();
      }
    } else  {
      if(typeof jQuery === 'function') {
        jQuery(function(){
          if(window.getComputedStyle) {
            breaky.init();
          }
        });
      } else {
        document.addEventListener("DOMContentLoaded", function(event) {
          if(window.getComputedStyle) {
            breaky.init();
          }
        });
      }
    }
    var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {}));
    freeGlobal.breaky = breaky;
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return breaky;
        });
    } else if (typeof module != 'undefined' && module.exports) {
        module.exports = breaky;
    } else {
        window[exportName] = breaky;
    }
})(window, document, 'breaky');
