import '../imports/startup/client/main.js';


// This is to correct the materialize toast error:
//    'Vel is not defined'
if ($) {
  Vel = $.Velocity;
}
else {
  Vel = Velocity; // change value with jQuery.Velocity
}
