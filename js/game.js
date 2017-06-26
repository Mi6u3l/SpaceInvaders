function Game(options) {
    this.rows = options.rows;
    this.columns = options.columns;
    this.invaders = options.invaders;
    this.ship = options.ship;
 
    this.canvas = document.getElementById('board');
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
        this.canvas.appendChild(colDiv); 
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
        $(selector).addClass('invader1');
    }
  });

   this.invaders.secondLineInvaders.locations.forEach(function(position, index) {
    var selector = '[data-row=' + position.row + ']' +
                   '[data-col=' + position.column + ']';
    $(selector).addClass('invader2');
  });

   this.invaders.thirdLineInvaders.locations.forEach(function(position, index) {
    var selector = '[data-row=' + position.row + ']' +
                   '[data-col=' + position.column + ']';
    $(selector).addClass('invader3');
  });
};

Game.prototype._drawShip = function() { 
        this.ship.locations.forEach(function(position, index) {
        var selector = '[data-row=' + position.row + ']' +
                    '[data-col=' + position.column + ']';
        $(selector).addClass('ship');
    });
};

Game.prototype._drawInvadersLaser = function() {
    var row = parseInt(this.invadersLaser.row) + 1;
    var selector = '[data-row=' + row + ']' +
                   '[data-col=' + this.invadersLaser.col + ']';
    $(selector).addClass('invadersLaser');
};


Game.prototype._drawShipLaser = function() {
    var selector = '[data-row=' + (this.shipLaser.row-1) + ']' +
                   '[data-col=' + this.shipLaser.col + ']';
    $(selector).addClass('laser');
};

Game.prototype._clearInvaders = function() {
  $('.invader1').removeClass('invader1');
  $('.invader2').removeClass('invader2');
  $('.invader3').removeClass('invader3');
};

Game.prototype._clearShip = function() {
  $('.ship').removeClass('ship');
};

Game.prototype._clearLaser = function() {
  $('.laser').removeClass('laser');
};

Game.prototype._clearInvadersLaser = function() {
  $('.invadersLaser').removeClass('invadersLaser');
};

Game.prototype._updateInvaders = function() {
  this.invaders.move();
  this._clearInvaders();
  this._drawInvaders();
  this._checkForGameEnd();
  if (!this.invadersLaser || (this.invadersLaser && this.invadersLaser.intervalId)) {
    this._getFrontLineInvaders();
  }
   
};


Game.prototype._checkForGameEnd = function() { 
    var gameOver = false;
    if ($('.ship').length === 0) {
        alert('Game over!');  
        gameOver = true;
    }
    if ($('.invader1').length === 0) {
        alert('You win!');     
        gameOver = true;
    }

    if (gameOver) {
         clearInterval(this.invadersLaser.intervalId);
         clearInterval(this.shipLaser.intervalId);
         clearInterval(this.intervalId);
    }
};

Game.prototype._getFrontLineInvaders = function() {

  var frontLineInvaders = [];

  var firstAliveInvaders = $(".invader3[data-row='4']").each(function() {
     var dataRow = ($(this).attr('data-row'));
     var dataColumn = ($(this).attr('data-col'));
     var obj = {
         col: dataColumn,
         row: dataRow,
         boardCoordinates: "'[data-row='" + dataRow + "']''[data-col='" + dataColumn + "']'"
     };
     frontLineInvaders.push(obj);
  });

  var secondAliveInvaders = $(".invader2[data-row='3']").each(function() {
     var dataRow = ($(this).attr('data-row'));
     var dataColumn = ($(this).attr('data-col'));
     //check for invader in front of this
     var invaderInFront = $(".invader3[data-row='4'][data-col='" + dataColumn + "']");
     if (invaderInFront.length === 0) {
     var obj = {
         col: dataColumn,
         row: dataRow,
         boardCoordinates: "'[data-row='" + dataRow + "']''[data-col='" + dataColumn + "']'"
        };
        frontLineInvaders.push(obj);
     }
  });

  var thirdAliveInvaders = $(".invader1[data-row='2']").each(function() {
     var dataRow = ($(this).attr('data-row'));
     var dataColumn = ($(this).attr('data-col'));
     //check for invader in front of this
     var invaderInFront = $(".invader2[data-row='3'][data-col='" + dataColumn + "']");
     if (invaderInFront.length === 0) {
     var obj = {
         col: dataColumn,
         row: dataRow,
         boardCoordinates: "'[data-row='" + dataRow + "']''[data-col='" + dataColumn + "']'"
      };
        frontLineInvaders.push(obj);
     }
  });

  var shuffledFrontLineShooters = this._shuffle(frontLineInvaders);
  //shooting one laser at a time    
  this.shootInvadersLaser(shuffledFrontLineShooters[0]);
  

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

Game.prototype.shootShipLaser = function() {
    console.log('shooting');
    var laserStartCol = this.ship.locations[2].column;
    var laserStartRow = 13;
    this.shipLaser = new Laser({col: laserStartCol, row: laserStartRow});
    this._drawShipLaser();
    if (!this.shipLaser.intervalId) {
        this.shipLaser.intervalId = setInterval(this._updateShipLaser.bind(this), 150);   
    }
};

Game.prototype.shootInvadersLaser = function(obj) {
    var laserStartCol = obj.col;
    var laserStartRow = obj.row;
    this.invadersLaser = new Laser({col: laserStartCol, row: laserStartRow});
    this._drawInvadersLaser();
    if (!this.invadersLaser.intervalId) {
        this.invadersLaser.intervalId = setInterval(this._updateInvadersLaser.bind(this), 50);   
    }
};

Game.prototype._updateInvadersLaser = function() {
    this.invadersLaser.moveInvadersLaser();
    this._clearInvadersLaser();
    var shipShot = false;
    if (this.invadersLaser.row > 14) {
        clearInterval(this.invadersLaser.intervalId);
        this._clearInvadersLaser();
    }
   this.ship.locations.forEach(function(position, index) {
        if (this.invadersLaser.collidesWith(position)) {  
            clearInterval(this.invadersLaser.intervalId);
            shipShot = true;
            var selector = '[data-row=' + position.row + ']' +
                    '[data-col=' + position.column + ']';
             position.row = 'x';
             $(selector).removeClass('ship');
        }
    }.bind(this));

    if (!shipShot) {
        this._drawInvadersLaser(); 
    }
};

Game.prototype._updateShipLaser = function() {
    this.shipLaser.moveShipLaser();
    this._clearLaser();
    var invaderShot = false;
    this.invaders.thirdLineInvaders.locations.forEach(function(position, index) {
        if (this.shipLaser.collidesWith(position)) {           
            clearInterval(this.shipLaser.intervalId);
            invaderShot = true;
             var selector = '[data-row=' + position.row + ']' +
                    '[data-col=' + position.column + ']';
             position.row = 'x';
             $(selector).removeClass('invader1');
             
        }
    }.bind(this));

    this.invaders.secondLineInvaders.locations.forEach(function(position, index) {
        if (this.shipLaser.collidesWith(position)) {    
             clearInterval(this.shipLaser.intervalId);
             invaderShot = true;
             var selector = '[data-row=' + position.row + ']' +
                    '[data-col=' + position.column + ']';
             position.row = 'x';
             $(selector).removeClass('invader2');
        }
    }.bind(this));

    this.invaders.firstLineInvaders.locations.forEach(function(position, index) {
        if (this.shipLaser.collidesWith(position)) {        
            clearInterval(this.shipLaser.intervalId);
            invaderShot = true;
            var selector = '[data-row=' + position.row + ']' +
                    '[data-col=' + position.column + ']';
             position.row = 'x';
             $(selector).removeClass('invader3');
        }
    }.bind(this));

    if (!invaderShot) {
        this._drawShipLaser();
    }
};

Game.prototype.start = function() {
      if (!this.intervalId) {
        this.intervalId = setInterval(this._updateInvaders.bind(this), 1000);
  }
};

Game.prototype._shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

Game.prototype._assignControlsToKeys = function() {
  $('body').on('keydown', function(e) {
    switch (e.keyCode) {
      case 32: // arrow left
        if(this.shipLaser !== undefined) {
            clearInterval(this.shipLaser.intervalId);
        }
        this.shootShipLaser();
        break;
      case 37: // arrow left
        this.moveShipLeft();
        break;
      case 39: // arrow right
        this.moveShipRight();
    }
  }.bind(this));
};


