$(function() {
  $( "#slider-range" ).slider({
    range: true,
    min: 10,
    max: 50,
    values: [ 15, 45 ],
    slide: function( event, ui ) {
      $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
    }
  });
});