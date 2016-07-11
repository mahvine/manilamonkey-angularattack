angular
	.module("socialmonkeys")
	.config(function($urlRouterProvider, $stateProvider,$httpProvider){
		$stateProvider
			.state('bananas',{
				url : '/bananas',
				templateUrl : '/app2/scripts/bananas/bananas.html',
        controller: 'BananaController'
			})
			;
	})
