angular.module("socialmonkeys")
  .controller("BananaController",function($scope,$timeout, $interval){
    $scope.bananas = [];
    $scope.bananasOwned = {};
    $scope.init = function(){
      $scope.bananas =[
       {"id":"1","name":"Regular Banana","pic":"/assets/bananas/monkeylove-banana-regular.svg",price:100, "description":"Be healthy."},
       {"id":"2","name":"Twin Banana","pic":"/assets/bananas/monkeylove-banana-twin.svg",price:10, "description":"Double the love collected"},
       {"id":"3","name":"Banana Split","pic":"/assets/bananas/monkeylove-banana-split.svg",price:1000, "description":"c0m3 3at s0m3 :3"},
       {"id":"4","name":"Dark banana","pic":"/assets/bananas/monkeylove-banana-dark.svg",price:50, "description":"Spank a monkey now!!!"}
     ];

     var user = $scope.$parent.getUser();
     console.log(user);
     $scope.bananasOwned = user.bananas;

    }

    $scope.init();

    $scope.buyBanana = function(banana){
      var user = $scope.$parent.getUser();
      if(!user.bananas){
        $scope.$parent.user.bananas = {};
      }
      if(banana.price <= user.love){
        $scope.$parent.user.love -= banana.price;
        $scope.$parent.user.bananas[banana.id] = banana;
      }

      $scope.$parent.saveUserData();
      $scope.init();
    }

});
