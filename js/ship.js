function Ship(options) {
  this.locations = options.locations;
  this.image1 = options.image1;
  this.image2 = options.image2;
}

Ship.prototype.goLeft = function() {
  this.locations.forEach(function(position, index) {
    if (index === 0 || index == 1) {
      if ((position.column - 1) > 0) {
        position.column = position.column - 1;
      }
    }
    if (index === 2 || index == 3) {
       if ((position.column - 1) > 1) {
        position.column = position.column - 1;
      }
    }
  });
};

Ship.prototype.goRight = function() {
  this.locations.forEach(function(position, index) {
    if (index === 0 || index == 1) {
      if ((position.column + 1) < 14) {
        position.column = position.column + 1;
      }
    }
    if (index === 2 || index == 3) {
       if ((position.column + 1) < 15) {
        position.column = position.column + 1;
      }
    }
  });
};


Ship.prototype.collidesWith = function(pos) {
    return this.locations[0].row == pos.row && this.locations[0].column == pos.column;
 };
