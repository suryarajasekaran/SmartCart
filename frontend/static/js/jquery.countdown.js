(function($){

  // Our code will go here

}(jQuery));

$.widget('pixel.countdown', {});

$.widget('pixel.countdown', {
  _create: function(){
    var dateTime = this.element.attr('datetime') || this.element.text(),
        hour,
        min,
        setup    = false;

    dateTime = dateTime.split('T');

    if( dateTime.length === 2 ){
      // Create a new date based on the year, month, day
      this._endTime = new Date(dateTime[0]);

      // Get hours and minutes
      dateTime = dateTime[1].split(':');
      hour = parseInt( dateTime[0], 10);
      min  = parseInt( dateTime[1], 10);

      if( !isNaN(hour) && !isNaN(min) ){
        this._endTime.setUTCHours(hour, min);
        setup = true;
      }
    }

    // In this case we fail silently, and remove the widget
    // We could throw an error instead if wanted.
    if (!setup){
      this.destroy(); // Undo everything we did
      return false;
    }

    this._originalText = this.element.text();
  }
});