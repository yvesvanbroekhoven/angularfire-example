angular.module("myChatRoom", ['firebase'])
  .controller('playersController', ['$scope', '$firebase', function($scope, $firebase) {
    var players_ref       = new Firebase("https://FIREBASE_ID.firebaseio.com/players"),
        unique_emails_ref = new Firebase("https://FIREBASE_ID.firebaseio.com/unique/emails");

    $scope.players = $firebase(players_ref);

    $scope.addPlayer = function() {
      if ( !$scope.player || !$scope.player.name || !$scope.player.email ) {
        console.warn("Fill in player details");
        return;
      }

      var email_key = $scope.player.email.replace('.',',');

      unique_emails_ref.child(email_key).set(true, function(err) {
        if (err) {
          console.warn("Email already used.")
          return;
        }

        $scope.players.$add({
          name:   $scope.player.name,
          email:  $scope.player.email
        });
      });
    };

    $scope.removePlayer = function(idx, player) {
      var email_key = player.email.replace('.',',');

      unique_emails_ref.child(email_key).set(null);
      $scope.players.$remove(idx);
    }
  }]);
