function Invaders(options) {
  this.firstLineInvaders = options.firstLineInvaders;
  this.secondLineInvaders = options.secondLineInvaders;
  this.thirdLineInvaders = options.thirdLineInvaders;
  this.direction = 'left';
}

Invaders.prototype.move = function() {
      if (this.firstLineInvaders.locations[0].column === 1) {
       this.direction = 'right';
      } else if (this.firstLineInvaders.locations[9].column === 14) {
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

Invaders.prototype.goLeft = function() {
  this.firstLineInvaders.locations.forEach(function(position, index) {
    position.column = position.column - 1;
  });
   this.secondLineInvaders.locations.forEach(function(position, index) {
    position.column = position.column - 1;
  });
   this.thirdLineInvaders.locations.forEach(function(position, index) {
    position.column = position.column - 1;
  });
};

Invaders.prototype.goRight = function() {
  this.firstLineInvaders.locations.forEach(function(position, index) {
    position.column = position.column + 1;
  });
   this.secondLineInvaders.locations.forEach(function(position, index) {
    position.column = position.column + 1;
  });
   this.thirdLineInvaders.locations.forEach(function(position, index) {
    position.column = position.column + 1;
  });
};