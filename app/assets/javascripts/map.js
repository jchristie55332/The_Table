var ngMap={services:{},directives:{}};ngMap.services.Attr2Options=function($parse){function camelCase(e){return e.replace(SPECIAL_CHARS_REGEXP,function(e,t,r,n){return n?r.toUpperCase():r}).replace(MOZ_HACK_REGEXP,"Moz$1")}var SPECIAL_CHARS_REGEXP=/([\:\-\_]+(.))/g,MOZ_HACK_REGEXP=/^moz([A-Z])/,toOptionValue=function(input,options){var output,key=options.key,scope=options.scope;try{var num=Number(input);if(isNaN(num))throw"Not a number";output=num}catch(err){try{if(output=JSON.parse(input),output instanceof Array){if(!(output[0]instanceof Array))return new google.maps.LatLng(output[0],output[1]);output=output.map(function(e){return new google.maps.LatLng(e[0],e[1])})}}catch(err2){if(input.match(/^[A-Z][a-zA-Z0-9]+\(.*\)$/))try{var exp="new google.maps."+input;output=eval(exp)}catch(e){output=input}else if(input.match(/^[A-Z][a-zA-Z0-9]+\.[A-Z]+$/))try{output=scope.$eval("google.maps."+input)}catch(e){output=input}else if(input.match(/^[A-Z]+$/))try{var capitializedKey=key.charAt(0).toUpperCase()+key.slice(1);output=scope.$eval("google.maps."+capitializedKey+"."+input)}catch(e){output=input}else output=input}}return output};return{filter:function(e){var t={};for(var r in e)r.match(/^\$/)||(t[r]=e[r]);return t},getOptions:function(e,t){var r={};for(var n in e)if(e[n]){if(n.match(/^on[A-Z]/))continue;if(n.match(/ControlOptions$/))continue;r[n]=toOptionValue(e[n],{scope:t,key:n})}return r},getEvents:function(e,t){var r={},n=function(e){return"_"+e.toLowerCase()},o=function(t){var r=t.match(/([^\(]+)\(([^\)]*)\)/),n=r[1],o=r[2].replace(/event[ ,]*/,""),a=e.$eval("["+o+"]");return function(t){e[n].apply(this,[t].concat(a))}};for(var a in t)if(t[a]){if(!a.match(/^on[A-Z]/))continue;var i=a.replace(/^on/,"");i=i.charAt(0).toLowerCase()+i.slice(1),i=i.replace(/([A-Z])/g,n);var s=t[a];r[i]=new o(s)}return r},getControlOptions:function(e){var t={};if("object"!=typeof e)return!1;for(var r in e)if(e[r]){if(!r.match(/(.*)ControlOptions$/))continue;var n=e[r],o=n.replace(/'/g,'"');o=o.replace(/([^"]+)|("[^"]+")/g,function(e,t,r){return t?t.replace(/([a-zA-Z0-9]+?):/g,'"$1":'):r});try{var a=JSON.parse(o);for(var i in a)if(a[i]){var s=a[i];if("string"==typeof s?s=s.toUpperCase():"mapTypeIds"===i&&(s=s.map(function(e){return google.maps.MapTypeId[e.toUpperCase()]})),"style"===i){var p=r.charAt(0).toUpperCase()+r.slice(1),c=p.replace(/Options$/,"")+"Style";a[i]=google.maps[c][s]}else a[i]="position"===i?google.maps.ControlPosition[s]:s}t[r]=a}catch(u){}}return t},getAttrsToObserve:function(e){for(var t=e[0].attributes,r=[],n=0;n<t.length;n++){var o=t[n];o.value&&o.value.match(/\{\{.*\}\}/)&&r.push(camelCase(o.name))}return r},toOptionValue:toOptionValue,camelCase:camelCase}},ngMap.services.GeoCoder=function(e){return{geocode:function(t){var r=e.defer(),n=new google.maps.Geocoder;return n.geocode(t,function(e,t){t==google.maps.GeocoderStatus.OK?r.resolve(e):r.reject("Geocoder failed due to: "+t)}),r.promise}}},ngMap.services.GeoCoder.$inject=["$q"],ngMap.services.NavigatorGeolocation=function(e){return{getCurrentPosition:function(){var t=e.defer();return navigator.geolocation?navigator.geolocation.getCurrentPosition(function(e){t.resolve(e)},function(e){t.reject(e)}):t.reject("Browser Geolocation service failed."),t.promise},watchPosition:function(){return"TODO"},clearWatch:function(){return"TODO"}}},ngMap.services.NavigatorGeolocation.$inject=["$q"],ngMap.services.StreetView=function(e){return{getPanorama:function(t,r){r=r||t.getCenter();var n=e.defer(),o=new google.maps.StreetViewService;return o.getPanoramaByLocation(r||t.getCenter,100,function(e,t){n.resolve(t===google.maps.StreetViewStatus.OK?e.location.pano:!1)}),n.promise},setPanorama:function(e,t){var r=new google.maps.StreetViewPanorama(e.getDiv(),{enableCloseButton:!0});r.setPano(t)}}},ngMap.services.StreetView.$inject=["$q"],ngMap.directives.map=function(e,t){var r=e;return{restrict:"AE",controller:ngMap.directives.MapController,link:function(e,n,o,a){e.google=google;var i=document.createElement("div");i.style.width="100%",i.style.height="100%",n.prepend(i);var s=r.filter(o),p=r.getOptions(s,e),c=r.getControlOptions(s),u=r.getEvents(e,s),l=angular.extend(p,c);l.zoom=l.zoom||15,a.initMap(i,l,u),a.initMarkers(),a.initShapes(),a.initMarkerClusterer();for(var g=r.getAttrsToObserve(n),v=0;v<g.length;v++){var m=g[v];o.$observe(m,function(e){var n=r.camelCase("set-"+m),o=r.toOptionValue(e,{key:m});a.map[n]&&("setCenter"==n&&"string"==typeof o?t.geocode({address:o}).then(function(e){a.map.setCenter(e[0].geometry.location)}):a.map[n](o))})}e.maps=e.maps||{},e.maps[p.id||Object.keys(e.maps).length]=a.map,e.$emit("mapsInitialized",e.maps)}}},ngMap.directives.map.$inject=["Attr2Options","GeoCoder"],ngMap.directives.MapController=function(e,t,r){this.map=null,this.controls={},this.markers=[],this.shapes=[],this.markerClusterer=null,this.initMap=function(e,n,o){this.map=new google.maps.Map(e,{});var a=n.center;a instanceof google.maps.LatLng||delete n.center;var i=this;"string"==typeof a?r.geocode({address:a}).then(function(e){i.map.setCenter(e[0].geometry.location)}):a||t.getCurrentPosition().then(function(e){var t=e.coords.latitude,r=e.coords.longitude;i.map.setCenter(new google.maps.LatLng(t,r))},function(){if(n.geoFallbackCenter instanceof Array){var e=n.geoFallbackCenter[0],t=n.geoFallbackCenter[1];i.map.setCenter(new google.maps.LatLng(e,t))}else this.map.setCenter(new google.maps.LatLng(0,0))}),this.map.setOptions(n);for(var s in o)s&&google.maps.event.addListener(this.map,s,o[s])},this.addMarker=function(e){e.setMap(this.map),e.centered&&this.map.setCenter(e.position);var t=Object.keys(this.map.markers).length;this.map.markers[e.id||t]=e},this.initMarkers=function(){this.map.markers={};for(var e=0;e<this.markers.length;e++){var t=this.markers[e];this.addMarker(t)}},this.addShape=function(e){e.setMap(this.map);var t=Object.keys(this.map.shapes).length;this.map.shapes[e.id||t]=e},this.initShapes=function(){this.map.shapes={};for(var e=0;e<this.shapes.length;e++){var t=this.shapes[e];this.addShape(t)}},this.initMarkerClusterer=function(){this.markerClusterer&&(this.map.markerClusterer=new MarkerClusterer(this.map,this.markerClusterer.data,this.markerClusterer.options))}},ngMap.directives.MapController.$inject=["$scope","NavigatorGeolocation","GeoCoder"],ngMap.directives.marker=function(e,t,r){var n=e;return{restrict:"AE",require:"^map",link:function(e,o,a,i){var s=n.filter(a);e.google=google;var p=n.getOptions(s,e),c=n.getEvents(e,s),u=function(e,r){var i=new google.maps.Marker(e);Object.keys(r).length>0;for(var s in r)s&&google.maps.event.addListener(i,s,r[s]);for(var p=n.getAttrsToObserve(o),c=0;c<p.length;c++){var u=p[c];a.$observe(u,function(e){var r=n.camelCase("set-"+u),o=n.toOptionValue(e,{key:u});i[r]&&("setPosition"==r&&"string"==typeof o?t.geocode({address:o}).then(function(e){i[r](e[0].geometry.location)}):i[r](o))})}return i};if(p.position instanceof google.maps.LatLng){var l=u(p,c);p.ngRepeat?i.addMarker(l):i.markers.push(l)}else if("string"==typeof p.position){var g=p.position;g.match(/^current/i)?r.getCurrentPosition().then(function(e){var t=e.coords.latitude,r=e.coords.longitude;p.position=new google.maps.LatLng(t,r);var n=u(p,c);i.addMarker(n)}):t.geocode({address:p.position}).then(function(e){var t=e[0].geometry.location;p.position=t;var r=u(p,c);i.addMarker(r)})}}}},ngMap.directives.marker.$inject=["Attr2Options","GeoCoder","NavigatorGeolocation"],ngMap.directives.markerClusterer=function(e){var t=e;return{restrict:"AE",require:"^map",link:function(e,r,n,o){var a=e.$eval(n.markers);delete n.markers;for(var i=t.filter(n),s=[],p=0;p<a.length;p++){var c=a[p],u=c.position[0],l=c.position[1];c.position=new google.maps.LatLng(u,l);var g=new google.maps.Marker(c),v=t.getEvents(e,c);for(var m in v)m&&google.maps.event.addListener(g,m,v[m]);s.push(g)}o.markers=s,o.markerClusterer={data:s,options:i}}}},ngMap.directives.markerClusterer.$inject=["Attr2Options"],ngMap.directives.shape=function(e){var t=e,r=function(e){return new google.maps.LatLngBounds(e[0],e[1])},n=function(e,t){switch(e){case"circle":return new google.maps.Circle(t);case"polygon":return new google.maps.Polygon(t);case"polyline":return new google.maps.Polyline(t);case"rectangle":return t.bounds=r(t.bounds),new google.maps.Rectangle(t);case"groundOverlay":case"image":var n=t.url,o=r(t.bounds),a={opacity:t.opacity,clickable:t.clickable,id:t.id};return new google.maps.GroundOverlay(n,o,a)}return null};return{restrict:"AE",require:"^map",link:function(e,r,o,a){var i=t.filter(o),s=i.name;delete i.name;var p=t.getOptions(i),c=n(s,p);p.ngRepeat?a.addShape(c):c&&a.shapes.push(c);var u=t.getEvents(e,i);for(var l in u)u[l]&&google.maps.event.addListener(c,l,u[l])}}},ngMap.directives.shape.$inject=["Attr2Options"];var ngMapModule=angular.module("ngMap",[]);for(var key in ngMap.services)ngMapModule.service(key,ngMap.services[key]);for(var key in ngMap.directives)"MapController"!=key&&ngMapModule.directive(key,ngMap.directives[key]);

(function() {

  var app = angular.module('theTable', ['ngMap']);
  app.controller('mapController', ["$scope", "$http", function($scope, $http) {




    $scope.foo = function(event) {
      alert('this is at '+ this.getPosition());
      };
    $http.get("/restaurants.json").success(function(data){
      navigator.geolocation.getCurrentPosition(function(position){

        $scope.currentLat = position.coords.latitude
        $scope.currentLng = position.coords.longitude
        debugger
        for (var i = 0; i < data.length; i++) {
          var R = 6371;
          var lat1 = data[i].lat;
          var lon1 = data[i].lng;
          var lat2 = $scope.currentLat;
          var lon2 = $scope.currentLng;
          var x = (lon2-lon1) * Math.cos((lat1+lat2)/2);
          var y = (lat2-lat1);
          var d = Math.sqrt(x*x + y*y) * R;
          data[i].distance = d;
          console.log(R);
          console.log(lat1);
          console.log(lon1);
          console.log(lat2);
          console.log(lon2);
          console.log(x);
          console.log(y);
          console.log(d);
        }
      });

      $scope.restaurants = data;
    })
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.numberOfPages=function(){
      return Math.ceil($scope.restaurants.length/$scope.pageSize);                
    }

  }]);
  app.filter('startFrom', function() {
      return function(input, start) {
          start = +start; //parse to int
          return input.slice(start);
      }
  });
  
})();