angular.module("socialmonkeys")
  .controller("BadgeController",function($scope,$timeout, $interval){
    $scope.badges = [];
    $scope.init = function(){
      $scope.badges =[
       {"id":"1","name":"Masseuse Assistant","pic":"/assets/badges/monkeylove-badges-masseuse.svg"},
       {"id":"2","name":"Banana Giver","pic":"/assets/badges/monkeylove-badges-banana-giver.svg"},
       {"id":"3","name":"Ordinary dude","pic":"/assets/badges/monkeylove-badges-ordinary-dude.svg"},
       {"id":"4","name":"Heavy sleeper","pic":"/assets/badges/monkeylove-badges-heavy-sleeper.svg"},
       {"id":"5","name":"Monkeynator","pic":"/assets/badges/monkeylove-badges-monkeynator.svg"},
       {"id":"6","name":"Monkey king","pic":"/assets/badges/monkeylove-badges-monkey-king.svg"}
     ];
     var user = $scope.$parent.getUser();
     console.log(user);
     if(user.actionScratch > 29){
       $scope.badge1complete = true;
     }
     if(user.actionBanana >9){
       $scope.badge2complete = true;
     }
     if(user.actionScratch > 0 || user.actionBanana > 0 || user.actionPet > 0 ){
       $scope.badge3complete = true;
     }
     if(user.actionSpank > 2){
       $scope.badge5complete = true;
     }
     var i =0;
     for(var monkey in user.monkeys){
       i++;
     }
     console.log(i+" monkeys owned");
     if(i>9){
       $scope.badge6complete = true;
     }

    }

    $scope.init();

});
