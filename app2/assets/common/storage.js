angular
	.module("StorageUtil",[
	     'LocalStorageModule'
	])
    .factory('StorageService', function ($window) {
        return {

            get: function (key) {
                return JSON.parse($window.localStorage.getItem(key));
            },

            save: function (key, data) {
                $window.localStorage.setItem(key, JSON.stringify(data));
            },

            remove: function (key) {
                $window.localStorage.removeItem(key);
            },

            clearAll : function () {
                $window.localStorage.clear();
            }
        };
    })
    .factory('SessionService', function (StorageService) {
        return {

            getSession: function () {
                return StorageService.get("session");
            },

            save: function (data) {
                return StorageService.save("session",data);
            },

            clear : function () {
            	console.log("logging out.");
            	StorageService.clearAll();
            }
        };
    });

