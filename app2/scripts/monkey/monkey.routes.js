angular
	.module("socialmonkeys")
	.config(function($urlRouterProvider, $stateProvider,$httpProvider){
		$stateProvider
			.state('monkeys',{
				url : '/monkeys',
				templateUrl : '/app2/scripts/monkey/monkey.html',
        controller: 'MonkeyController'
			})
			;
	})
