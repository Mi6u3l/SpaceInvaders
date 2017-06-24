function Game(options) {
    this.rows = options.rows;
    this.columns = options.columns;
    this.invaders = options.invaders;
    this.ship = options.ship;
 
    var canvas = document.getElementById('board');
    for(var col = 0; col < this.columns; col++){ 
            var colDiv = document.createElement("div"); 
            colDiv.className = "row"; 
            for(var row = 0; row < this.rows; row++){ 
                var cell = document.createElement("div"); 
                cell.className = "gridsquare"; 
                cell.innerText = (row * this.rows) + col;
                cell.setAttribute('data-row', row);
                cell.setAttribute('data-col', col);
                colDiv.appendChild(cell); 
            } 
        canvas.appendChild(colDiv); 
        } 

     this._drawInvaders();
     this._drawShip();
     this._assignControlsToKeys();
}

Game.prototype._drawInvaders = function() {
    this.invaders.firstLineInvaders.locations.forEach(function(position, index) {
    if (position.row !== 'x') {
        var selector = '[data-row=' + position.row + ']' +
                    '[data-col=' + position.column + ']';
        $(selector).addClass('invader');
    }
  });

   this.invaders.secondLineInvaders.locations.forEach(function(position, index) {
    var selector = '[data-row=' + position.row + ']' +
                   '[data-col=' + position.column + ']';
    $(selector).addClass('invader');
  });

   this.invaders.thirdLineInvaders.locations.forEach(function(position, index) {
    var selector = '[data-row=' + position.row + ']' +
                   '[data-col=' + position.column + ']';
    $(selector).addClass('invader');
  });
};

Game.prototype._drawShip = function() { 
        this.ship.locations.forEach(function(position, index) {
        var selector = '[data-row=' + position.row + ']' +
                    '[data-col=' + position.column + ']';
        $(selector).addClass('ship');
    });
};

Game.prototype._drawLaser = function() {
    var selector = '[data-row=' + (this.laser.row-1) + ']' +
                   '[data-col=' + this.laser.col + ']';
    $(selector).addClass('laser');
};

Game.prototype._clearInvaders = function() {
  $('.invader').removeClass('invader');
};

Game.prototype._clearShip = function() {
  $('.ship').removeClass('ship');
};

Game.prototype._clearLaser = function() {
  $('.laser').removeClass('laser');
};

Game.prototype._updateInvaders = function() {
  this.invaders.move();
  this._clearInvaders();
  this._drawInvaders();
};

Game.prototype.moveShipLeft = function() {
    this.ship.goLeft();
    this._clearShip();
    this._drawShip();
};

Game.prototype.moveShipRight = function() {
    this.ship.goRight();
    this._clearShip();
    this._drawShip();
};

Game.prototype.shootLaser = function() {
    var laserStartCol = this.ship.locations[2].column;
    var laserStartRow = this.ship.locations[2].row;
    this.laser = new Laser({col: laserStartCol, row: laserStartRow});
    this._drawLaser();
    if (!this.laser.intervalId) {
        this.laser.intervalId = setInterval(this._updateLaser.bind(this), 150);   
    }
};

Game.prototype._updateLaser = function() {
    this.laser.move();
    this._clearLaser();
    var invaderShot = false;
    this.invaders.thirdLineInvaders.locations.forEach(function(position, index) {
        if (this.laser.collidesWith(position)) {           
            clearInterval(this.laser.intervalId);
            invaderShot = true;
             var selector = '[data-row=' + position.row + ']' +
                    '[data-col=' + position.column + ']';
             position.row = 'x';
             $(selector).removeClass('invader');
             
        }
    }.bind(this));

    this.invaders.secondLineInvaders.locations.forEach(function(position, index) {
        if (this.laser.collidesWith(position)) {    
            console.log('shot');   
             clearInterval(this.laser.intervalId);
             invaderShot = true;
             var selector = '[data-row=' + position.row + ']' +
                    '[data-col=' + position.column + ']';
             position.row = 'x';
             $(selector).removeClass('invader');
        }
    }.bind(this));

    this.invaders.firstLineInvaders.locations.forEach(function(position, index) {
        if (this.laser.collidesWith(position)) {        
            clearInterval(this.laser.intervalId);
            invaderShot = true;
            var selector = '[data-row=' + position.row + ']' +
                    '[data-col=' + position.column + ']';
             position.row = 'x';
             $(selector).removeClass('invader');
        }
    }.bind(this));

    if (!invaderShot) {
        this._drawLaser();
    }
};

Game.prototype.start = function() {
      if (!this.intervalId) {
        this.intervalId = setInterval(this._updateInvaders.bind(this), 1000);
  }
};

Game.prototype._assignControlsToKeys = function() {
  $('body').on('keydown', function(e) {
    switch (e.keyCode) {
      case 32: // arrow left
        if(this.laser !== undefined) {
            clearInterval(this.laser.intervalId);
        }
        this.shootLaser();
        break;
      case 37: // arrow left
        this.moveShipLeft();
        break;
      case 39: // arrow right
        this.moveShipRight();
    }
  }.bind(this));
};


