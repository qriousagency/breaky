!function(){function a(){for(var a=i[breaky.value].on,b=a.length,c=i[breaky.value].off,d=c.length,e=0;b>e;e++)j[a[e]].active||(j[a[e]].fn(),j[a[e]].active=!0);for(var e=0;d>e;e++)j[c[e]].active=!1}function b(a,b){return window.getComputedStyle(document.querySelector(a),":"+b).getPropertyValue("content").replace(/\"/g,"").replace(/\'/g,"")}function c(a){h++,j[h]={},j[h].fn=a,j[h].active=!1}function d(a,b){if(Array.prototype.indexOf)return a.indexOf(b);for(var c=0,d=a.length;d>c;c++)if(b===a[c])return c}function e(b,c,e){for(var f=d(k,b),g=d(k,e),j=0;j<k.length;j++)j==f&&"at"==c||f>=j&&"below"==c||j>=f&&"above"==c||j>=f&&g>=j&&"between"==c?i[k[j]].on.push(h):i[k[j]].off.push(h);a()}function f(){breakpointsLength=k.length;for(var a=0;a<breakpointsLength;a++)i[k[a]]={},i[k[a]].on=[],i[k[a]].off=[]}function g(a,b,d,f){c(a),e(b,d,f)}var h=0,i={},j={},k=[];window.breaky={below:function(a,b){g(b,a,"below")},above:function(a,b){g(b,a,"above")},between:function(a,b,c){g(c,a,"between",b)},at:function(a,b){g(b,a,"at")},initIE8:function(a,b){window.getComputedStyle||(k=a,f(),breaky.value=b)},init:function(){k=b("body","after").split(","),f(),breaky.value=b("body","before"),window.onresize=function(){breaky.value!==b("body","before")&&(breaky.value=b("body","before"),a())}}},window.getComputedStyle&&breaky.init()}();