angular
	.module("socialmonkeys")
	.config(function($urlRouterProvider, $stateProvider,$httpProvider){
		$stateProvider
			.state('badges',{
				url : '/badges',
				templateUrl : '/app2/scripts/badges/badges.html',
        controller: 'BadgeController'
			})
			;
	})
