angular
	.module("socialmonkeys",["mdl","StorageUtil","ui.router",'ngAnimate'])
	.run(function($rootScope,$location,$state,StorageService){
		console.log("social monkey is running!");
		if(!StorageService.get("user")){
			$state.go("login");
			console.log("no user found");
		}
	})
	.config(function($urlRouterProvider, $stateProvider,$httpProvider){
		$urlRouterProvider.otherwise('/login');
		$stateProvider
			.state('login',{
				url : '/login',
				templateUrl : '/app2/scripts/login/login.html',
				controller: 'MainController'
			})
			;
	})
	.controller("MainController",function($scope,StorageService,$state,$window,$timeout){
		$scope.visibleMenu = false;
		$scope.people = [];

		$scope.showMenu = function(){
			$scope.visibleMenu = true;
		}

		$scope.hideMenu = function(){
			$scope.visibleMenu = false;
		}
		$scope.clickMenu = function(){
			$scope.visibleMenu=!$scope.visibleMenu;
		}
		$scope.init = function(){
			$scope.user = StorageService.get("user");
			if($scope.user){
				if($state.current.name == 'login'){
					$state.go("monkeys");
				}
				console.log(Object.keys($scope.user.monkeys).length);
			}

			$scope.tempPeople = StorageService.get("people");
			if($scope.tempPeople){
				$scope.people = $scope.tempPeople;
			}
		}

		$scope.getUser = function(){
			$scope.user = StorageService.get("user");
			return $scope.user;
		}

		$scope.init();

		$scope.initializeUser = function(id){
			$scope.user = StorageService.get(id);
			if($scope.user == null){
				$scope.user = {"id":id,"name":"Monkey Lover",love:0,monkeys:{},bananas:{}};
				$scope.user.monkeys["1"] = {"id":"1","name":"Caesar","pic":"/assets/heads/monkeyhead1.png"};
				StorageService.save(id,$scope.user);
			}

			StorageService.save("user",$scope.user);
		}

		$window.profileCallback = function(profile){
			console.log("angular profile callback success");
			$scope.initializeUser(profile.id);
		}

		$window.peopleCallback = function(people){
			console.log("angular people callback success");
			console.log(people);
			$scope.people = people.items;
			StorageService.save("people",$scope.people);
			$timeout(function(){
				$scope.init();
			},2000);

		}

		$scope.saveUserData = function(){
			StorageService.save("user",$scope.user);
			StorageService.save($scope.user.id,$scope.user);
		}
		$scope.pics = ["/assets/heads/monkeyhead5.png","/assets/heads/monkeyhead1.png","/assets/heads/monkeyhead4.png","/assets/heads/monkeyhead2.png","/assets/heads/monkeyhead3.png"]
		$scope.adoptRandomMonkey = function(){
			var user = $scope.getUser();

			$scope.tempPeople = StorageService.get("people");
			if($scope.tempPeople){
				$scope.people = $scope.tempPeople;
			}

			if($scope.people.length>1){
				var randomnumber = Math.floor(Math.random() * ($scope.people.length-1));
				var randompic = Math.floor(Math.random() * (4));
				var person = $scope.people[randomnumber];
				var numberOfMonkeys = Object.keys($scope.user.monkeys).length;
				console.log("random number:"+randomnumber);
				if(numberOfMonkeys<$scope.people.length){
					while(user.monkeys[person.id]){
						console.log("looking for new monkey");
						randomnumber = Math.floor(Math.random() * ($scope.people.length-1));
						person = $scope.people[randomnumber];
						randompic = Math.floor(Math.random() * (4));
					}
					var firstname = person.displayName.substring(0, person.displayName.indexOf(' '));
					$scope.user.monkeys[person.id] = {"id":person.id,"pic":$scope.pics[randompic],"name":firstname,"realpic":person.image.url};
					$scope.saveUserData();
					return true;
				}else{
					alert("You are a monkey god! you've tame all the monkeys in the universe. (you have no friends)");
				}
			}else{
				alert("Still fetching your friends or you have no friends? Hit refresh kid");
			}
			return false;
		}

		$scope.clearData = function(){
			StorageService.clearAll();
			$scope.init();
			$state.go("login");
		}

		$scope.signOut = function(){
			$window.signOut();
			StorageService.remove("user");
			$scope.init();
			$state.go("login");
			location.reload();
		}


	});
