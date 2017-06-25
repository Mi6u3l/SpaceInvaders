function Laser(coordinates){
    this.col = coordinates.col;
    this.row = coordinates.row;
}

Laser.prototype.move = function() {
    this.row-=1;
};

Laser.prototype.collidesWith = function(pos) {
    return this.row == pos.row && this.col == pos.column;
 };
