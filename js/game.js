function Game(options) {
    this.rows = options.rows;
    this.columns = options.columns;
    this.invaders = options.invaders;
    this.ship = options.ship;
    this.lives = options.lives;
    this.points = 0;
    this.deathStar = options.deathStar;
    this.shipDestroyed = false;
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
     this._drawDeathStar();
     this._drawShip();
     this._assignControlsToKeys();
}

Game.prototype._drawDeathStar = function() {
    this.deathStar.coordinates.forEach(function(position, index) {
    if (position.row !== 'x') {
        var selector = '[data-row=' + position.row + ']' +
                    '[data-col=' + position.column + ']';
        if (index === 0) {
            $(selector).addClass('death-star1');
        } else {
            $(selector).addClass('death-star2');
        }
    }
  });
};

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

Game.prototype._clearDeathStar = function() {
    $('.death-star1').removeClass('death-star1');
    $('.death-star2').removeClass('death-star2');
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


Game.prototype._updateDeathStar = function () {
    this.deathStar.move();
    this._clearDeathStar();
    this._drawDeathStar();
};

Game.prototype._updateInvaders = function() {
  this.invaders.move();
  this._clearInvaders();
  this._drawInvaders();

  var shipDestroyed = document.getElementById('shipDestroyed');
  shipDestroyed.volume = 0.4;               
  this.invaders.thirdLineInvaders.locations.forEach(function(position, index) {
        if (this.ship.collidesWith(position)) {       
             var selector = '[data-row=' + position.row + ']' +
                    '[data-col=' + position.column + ']';
             position.row = 'x';
             shipDestroyed.play();
             $(selector).removeClass('ship');
             $(selector).addClass('explosion');
             
        }
    }.bind(this));

    this.invaders.secondLineInvaders.locations.forEach(function(position, index) {
        if (this.ship.collidesWith(position)) {       
             var selector = '[data-row=' + position.row + ']' +
                    '[data-col=' + position.column + ']';
             position.row = 'x';
             shipDestroyed.play();
             $(selector).removeClass('ship');
             $(selector).addClass('explosion');
        }
    }.bind(this));

    this.invaders.thirdLineInvaders.locations.forEach(function(position, index) {
        if (this.ship.collidesWith(position)) {       
             var selector = '[data-row=' + position.row + ']' +
                    '[data-col=' + position.column + ']';
             position.row = 'x';
             shipDestroyed.play();
             $(selector).removeClass('ship');
             $(selector).addClass('explosion');
             
        }
    }.bind(this));

  this._checkForGameEnd();
  if (!this.invadersLaser || (this.invadersLaser && this.invadersLaser.intervalId)) {
    this._getFrontLineInvaders();
  }
   
};

Game.prototype._checkForGameEnd = function() { 
    if ($('.ship').length === 0) {
        this.lives-=1;
         this.shipDestroyed = true;
        $('#lives-ul li:last-child').remove();
        if (this.lives !== 0) {
            $('#feedbackModalBody').text('Ouch! You have ' + this.lives + ' Millenium Falcon(s) left.');
            $('#feedbackModal').modal('show');
            this.stop();
        }
         
        this._drawShip();
    
        if (this.lives === 0) {
            this.stop();
            $('#feedbackModal').modal('show');
            $('#feedbackModalBody').text('The Dark side was stronger today. You made ' +  $('.points-total').text() + ' points');
            $('#feedbackModalButton').html('Play again');
            $("#feedbackModalButton").attr('onclick','location.reload()');
        } else {
            setTimeout(function(){ 
                $('.explosion').removeClass('explosion'); 
                this.shipDestroyed = false; 
            }.bind(this), 2000);
        }        
    }
    if ($('.invader1').length === 0) {
        this.stop();
         $('#feedbackModal').modal('show');
         $('#feedbackModalBody').text('Well done, this will teach Vader a lesson! You made ' +  $('.points-total').text() + ' points');
         $('#feedbackModalButton').html('Play again');
         $("#feedbackModalButton").attr('onclick','location.reload()');
    }
};

Game.prototype._getFrontLineInvaders = function() {
  var frontLineInvaders = [];
  var firstRow = this.invaders.lastInvadersRow;
  var firstAliveInvaders = $(".invader3[data-row='" + firstRow + "']").each(function() {
     var dataRow = ($(this).attr('data-row'));
     var dataColumn = ($(this).attr('data-col'));
     var obj = {
         col: dataColumn,
         row: dataRow,
         boardCoordinates: "'[data-row='" + dataRow + "']''[data-col='" + dataColumn + "']'"
     };
     frontLineInvaders.push(obj);
  });

  var secondRow = this.invaders.lastInvadersRow - 1;
  var secondAliveInvaders = $(".invader2[data-row='" + secondRow + "']").each(function() {
     var dataRow = ($(this).attr('data-row'));
     var dataColumn = ($(this).attr('data-col'));
     //check for invader in front of this
     var invaderInFront = $(".invader3[data-row='" + firstRow + "'][data-col='" + dataColumn + "']");
     if (invaderInFront.length === 0) {
     var obj = {
         col: dataColumn,
         row: dataRow,
         boardCoordinates: "'[data-row='" + dataRow + "']''[data-col='" + dataColumn + "']'"
        };
        frontLineInvaders.push(obj);
     }
  });

  var thirdRow = this.invaders.lastInvadersRow - 2;
  var thirdAliveInvaders = $(".invader1[data-row='" + thirdRow + "']").each(function() {
     var dataRow = ($(this).attr('data-row'));
     var dataColumn = ($(this).attr('data-col'));
     //check for invader in front of this
     var invaderInFront = $(".invader2[data-row='" + secondRow + "'][data-col='" + dataColumn + "']");
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
    var shipLaserSound = document.getElementById('shipLaser');
    shipLaserSound.volume = 0.3;
    shipLaserSound.play();
    var laserStartCol = this.ship.locations[0].column;
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
             var shipDestroyed = document.getElementById('shipDestroyed');
             shipDestroyed.volume = 0.4;  
             shipDestroyed.play();
             $(selector).removeClass('ship');
             $(selector).addClass('explosion');
        }
    }.bind(this));

    if (!shipShot) {
        this._drawInvadersLaser(); 
    } else {
        this._checkForGameEnd();
    }
};

Game.prototype._updateShipLaser = function() {
    this.shipLaser.moveShipLaser();
    this._clearLaser();
    var invaderShot = false;
    var invaderDestroyed = document.getElementById('invaderDestroyed');
    invaderDestroyed.volume = 0.7;

    this.deathStar.coordinates.forEach(function(position, index) {
         if (this.shipLaser.collidesWith(position)) {   
              clearInterval(this.shipLaser.intervalId);
              invaderShot = true;
               var selector = '[data-row=' + position.row + ']' +
                    '[data-col=' + position.column + ']';
             position.row = 'x';
             this.points += 60;
            $('.points-total').text(this.points); 
            var deathStartHit = document.getElementById('deathStarHit');
            deathStartHit.play();
            if (index === 0) {
                $(selector).removeClass('death-start1');
            } else {
                $(selector).removeClass('death-start2');
            }
             
         }
    }.bind(this));

    this.invaders.thirdLineInvaders.locations.forEach(function(position, index) {
        if (this.shipLaser.collidesWith(position)) {      
            clearInterval(this.shipLaser.intervalId);
            invaderShot = true;
             var selector = '[data-row=' + position.row + ']' +
                    '[data-col=' + position.column + ']';
             position.row = 'x';
             this.points += 10;
             $('.points-total').text(this.points); 
             invaderDestroyed.play();
             $(selector).removeClass('invader3');
             
        }
    }.bind(this));

    this.invaders.secondLineInvaders.locations.forEach(function(position, index) {
        if (this.shipLaser.collidesWith(position)) {    
             clearInterval(this.shipLaser.intervalId);
             invaderShot = true;
             var selector = '[data-row=' + position.row + ']' +
                    '[data-col=' + position.column + ']';
             position.row = 'x';
             this.points += 20;
             $('.points-total').text(this.points);
             invaderDestroyed.play();
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
             this.points += 30;
             $('.points-total').text(this.points);
             invaderDestroyed.play();
             $(selector).removeClass('invader1');
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

    if (!this.deathStartIntervalId) {
        this.deathStartIntervalId = setInterval(this._updateDeathStar.bind(this), 200);
    }
  
};

Game.prototype.stop = function() {
  if (this.intervalId) {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }
};

Game.prototype._shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

Game.prototype._assignControlsToKeys = function() {
  $('body').on('keydown', function(e) {
    switch (e.keyCode) {
      case 32: // space key
        e.preventDefault();
        if(this.shipLaser !== undefined) {
            clearInterval(this.shipLaser.intervalId);
        }
        if (!this.shipDestroyed) {
            this.shootShipLaser();
        }
        break;
      case 37: // arrow left
       if (!this.shipDestroyed) {
        this.moveShipLeft();
       }
        break;
      case 39: // arrow right
      if (!this.shipDestroyed) {
        this.moveShipRight();
      }
    }
  }.bind(this));
};


