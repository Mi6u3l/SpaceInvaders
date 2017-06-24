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
}

Game.prototype._drawInvaders = function() {
    this.invaders.firstLineInvaders.locations.forEach(function(position, index) {
    var selector = '[data-row=' + position.row + ']' +
                   '[data-col=' + position.column + ']';
    $(selector).addClass('invader');
    $(selector).text('1I');
  });

   this.invaders.secondLineInvaders.locations.forEach(function(position, index) {
    var selector = '[data-row=' + position.row + ']' +
                   '[data-col=' + position.column + ']';
    $(selector).addClass('invader');
    $(selector).text('2I');
  });

   this.invaders.thirdLineInvaders.locations.forEach(function(position, index) {
    var selector = '[data-row=' + position.row + ']' +
                   '[data-col=' + position.column + ']';
    $(selector).addClass('invader');
    $(selector).text('3I');
  });
};

Game.prototype._drawShip = function() { 
        this.ship.locations.forEach(function(position, index) {
        var selector = '[data-row=' + position.row + ']' +
                    '[data-col=' + position.column + ']';
        $(selector).addClass('ship');
        $(selector).text('S');
    });
};

Game.prototype._clearInvaders = function() {
  $('.invader').removeClass('invader');
};

Game.prototype._update = function() {
  this.invaders.move();
 

  this._clearInvaders();
  this._drawInvaders();
};


Game.prototype.start = function() {
      if (!this.intervalId) {
    this.intervalId = setInterval(this._update.bind(this), 1000);
  }
};



