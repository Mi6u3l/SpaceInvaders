function DeathStar (coordinates) {
  this.direction = 'left';
  this.coordinates = coordinates;
}


DeathStar.prototype.move = function() {
      if (this.coordinates[0].column === 0) {
       this.direction = 'right';
      } else if (this.coordinates[1].column === 14) {
       this.direction = 'left';
      }   

      switch(this.direction) {
        case 'right':
          this.goRight();
        break;
        case 'left':
          this.goLeft();
        break;
      }
};


DeathStar.prototype.goLeft = function() {
  this.coordinates.forEach(function(position, index) {
    position.column = position.column - 1;
  });
};

DeathStar.prototype.goRight = function() {
  this.coordinates.forEach(function(position, index) {
    position.column = position.column + 1;
  });
};