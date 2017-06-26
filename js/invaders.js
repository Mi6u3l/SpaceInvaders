function Invaders(options) {
  this.firstLineInvaders = options.firstLineInvaders;
  this.secondLineInvaders = options.secondLineInvaders;
  this.thirdLineInvaders = options.thirdLineInvaders;
  this.direction = 'left';
  this.lastInvadersRow = options.lastInvadersRow;
  this.totalHorizontalMoves = 0;
}

Invaders.prototype.move = function() {
      if (this.firstLineInvaders.locations[0].column === 1) {
       this.direction = 'right';
       this.totalHorizontalMoves += 1;
      } else if (this.firstLineInvaders.locations[9].column === 14) {
       this.direction = 'left';
       if (this.totalHorizontalMoves === 1)
       { 
         this.goDown();
         this.lastInvadersRow += 1;
         this.totalHorizontalMoves = 0;
       }
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

Invaders.prototype.goDown = function() {
 this.firstLineInvaders.locations.forEach(function(position, index) {
    position.row = position.row + 1;
  });
   this.secondLineInvaders.locations.forEach(function(position, index) {
    position.row = position.row + 1;
  });
   this.thirdLineInvaders.locations.forEach(function(position, index) {
    position.row = position.row + 1;
  });
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