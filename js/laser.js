function Laser(coordinates){
    this.col = coordinates.col;
    this.row = coordinates.row;
}

Laser.prototype.moveShipLaser = function() {
    this.row-=1;
};

Laser.prototype.moveInvadersLaser = function() {
    this.row = parseInt(this.row) + 1;
};


Laser.prototype.collidesWith = function(pos) {
    return this.row == pos.row && this.col == pos.column;
 };
