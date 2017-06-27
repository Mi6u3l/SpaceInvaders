var game;

$(document).ready(function() {
  game = new Game({
    lives: 3,
    rows: 15,
    columns: 16,
    invaders: new Invaders( {
       lastInvadersRow: 4,
        direction: 'left',
        firstLineInvaders: { image: '', locations : [
          { row: 2, column: 3 },
          { row: 2, column: 4 },
          { row: 2, column: 5 },
          { row: 2, column: 6 },
          { row: 2, column: 7 },
          { row: 2, column: 8 },
          { row: 2, column: 9 },
          { row: 2, column: 10 },
          { row: 2, column: 11 }, 
          { row: 2, column: 12 } ]
        },
         secondLineInvaders: { image: '', locations : [
          { row: 3, column: 3 },
          { row: 3, column: 4 },
          { row: 3, column: 5 },
          { row: 3, column: 6 },
          { row: 3, column: 7 },
          { row: 3, column: 8 },
          { row: 3, column: 9 },
          { row: 3, column: 10 },
          { row: 3, column: 11 }, 
          { row: 3, column: 12 } ]
        },
          thirdLineInvaders: { image: '', locations : [
          { row: 4, column: 3 },
          { row: 4, column: 4 },
          { row: 4, column: 5 },
          { row: 4, column: 6 },
          { row: 4, column: 7 },
          { row: 4, column: 8 },
          { row: 4, column: 9 },
          { row: 4, column: 10 },
          { row: 4, column: 11 }, 
          { row: 4, column: 12 } ]
        }
      
    }),
    ship : new Ship({
      locations: [{ row: 13, column: 8 }],
      image1: '',
      image2: ''
    })
        
  });
  
});

$('#feedbackModal').on('hidden.bs.modal', function () {
    game.start();
});

var startGame = function() {
  $('.intro').hide();
  $('.game-wrapper').show();
  game.start();
};
