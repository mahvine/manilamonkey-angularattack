angular.module("socialmonkeys")
  .controller("MonkeyController",function($scope,$timeout, $interval){
    $scope.monkeys = [];
    $scope.mainMonkey = null;

    $scope.init = function(){
      $scope.monkeyMap ={"1":{"id":"1","name":"Caesar","pic":"/assets/heads/monkeyhead1.png"},
       "2":{"id":"2","name":"Betsy","pic":"/assets/heads/monkeyhead2.png"},
       "3":{"id":"3","name":"Joe","pic":"/assets/heads/monkeyhead3.png"},
       "4":{"id":"4","name":"Rafiki","pic":"/assets/heads/monkeyhead4.png"},
       "5":{"id":"5","name":"Kong","pic":"/assets/heads/monkeyhead5.png"}
     };
     //set delay
     $timeout(function(){
       $scope.$parent.init();
       $scope.monkeys = $scope.$parent.user.monkeys;
   		 $scope.numberOfMonkeys = Object.keys($scope.$parent.user.monkeys).length;
       $scope.bananas = $scope.$parent.user.bananas;
   		 $scope.currentLove = $scope.$parent.user.love;
     },2000);
    }
    $scope.init();

    $scope.setMainMonkey = function(monkey){
      $scope.mainMonkey = monkey;
    }

    $scope.actionOngoing = false;

    $scope.myAnimation = '';
    $scope.baseAnimationDuration = 1;
    $scope.action1Scratch = function(){
      $scope.myAnimation = 'animation-scratch';
      if(!$scope.$parent.user.actionScratch){
        $scope.$parent.user.actionScratch=0;
      }
      $scope.$parent.user.actionScratch++;
      $scope.monkeyAction();
    }

    $scope.action2Banana = function(){
      $scope.myAnimation = 'animation-banana';

      if(!$scope.$parent.user.actionBanana){
        $scope.$parent.user.actionBanana=0;
      }
      $scope.$parent.user.actionBanana++;
      $scope.monkeyAction();
    }

    $scope.action3Pet = function(){
      $scope.myAnimation = 'animation-pet';
      if(!$scope.$parent.user.actionPet){
        $scope.$parent.user.actionPet=0;
      }
      $scope.$parent.user.actionPet++;
      $scope.monkeyAction();
    }

    $scope.action4Spank = function(){
      $scope.myAnimation = 'animation-spank';
      if(!$scope.$parent.user.actionSpank){
        $scope.$parent.user.actionSpank=0;
      }
      $scope.$parent.user.actionSpank++;
      $scope.monkeyAction();
    }

    $scope.monkeyAction = function(){
      console.log("action started");
      $scope.actionOngoing = true;
      $scope.cancelInterval();
      if(!$scope.mainMonkey.actionCount){
        $scope.mainMonkey.actionCount=0;
      }
      $scope.mainMonkey.actionCount++;
      $scope.$parent.user.monkeys[$scope.mainMonkey.id] = $scope.mainMonkey;
      $scope.$parent.saveUserData();
      $scope.totalDuration = ($scope.baseAnimationDuration + $scope.mainMonkey.actionCount) * 1.4;

      $scope.countdownInterval = $interval(function(){
        $scope.totalDuration--;
        if($scope.totalDuration<1){


          $scope.myAnimation = false;
          $scope.actionOngoing = false;
          $scope.giveHeart();
          $scope.cancelInterval();
        }
        console.log("count down:"+$scope.totalDuration);
      },1000);
    }

    $scope.cancelInterval = function(){
      if($scope.countdownInterval){
        $interval.cancel($scope.countdownInterval);
          $scope.countdownInterval = undefined;
      }
    }

    $scope.givingheart = false;

    $scope.giveHeart = function(){
      $scope.givingheart = true;
      var actionCount = $scope.mainMonkey.actionCount;
      $scope.mainMonkey = null;

      $timeout(function(){
        var bonus = Math.floor(actionCount / 3);
        if($scope.$parent.user.bananas["2"]){
          $scope.$parent.user.love+=Math.floor(Math.random() * (15 - 3 + 1)) + bonus;
        }else{
          $scope.$parent.user.love+= 1 + bonus;
        }

        $scope.$parent.saveUserData();
        $scope.givingheart = false;
      },2000);
    }

    $scope.getMonkey = function(id){
      return $scope.monkeyMap[id];
    }


		$scope.adoptNewMonkey = function(){
			var numberOfMonkeys = Object.keys($scope.$parent.user.monkeys).length;
			var priceOfLove = 10*numberOfMonkeys*1.3;
			if($scope.$parent.user.love >= priceOfLove || numberOfMonkeys==0){
        //var key = (numberOfMonkeys+1)+"";
        //$scope.$parent.user.monkeys[key] =  $scope.getMonkey(key);
				if($scope.$parent.adoptRandomMonkey()){
          $scope.$parent.user.love -= priceOfLove;
          $scope.$parent.saveUserData();
        }

        $scope.init();
			}else{
				alert("Not enough love");
			}
		}

});
