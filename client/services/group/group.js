'use strict';

angular.module('eggercise')
	.service('GroupService', function ($rootScope, $q, $http) {
		var service = {};

		service.createGroup = function () {
			var deferred = $q.defer();
			//Create a new group by calling the api route for create group
			$http.post('api/groups/create/')
				.success(function (data) {
					deferred.resolve(data);
					return false;
				})
				.error(function (error) {
					deferred.reject('Error: ' + error);
					console.log('error');
					return false;
				})

			//body requires name, email, bet, start, end, _creator
			//should return 200
			//TODO: should return new group created with the attributes.
			return deferred.promise;
		}
		return service;
	})