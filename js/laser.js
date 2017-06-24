function Laser(coordinates){
    this.col = coordinates.col;
    this.row = coordinates.row;
}


Laser.prototype.move = function() {
    this.row-=1;
};