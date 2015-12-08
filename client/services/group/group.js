'use strict';

angular.module('eggercise')
	.service('GroupService', function ($rootScope, $q, $http) {
		var service = {};
    var tempId = '566234fbc6e3a5280b12099f';

		service.createGroup = function (formData) {
			var deferred = $q.defer();
			console.log(formData);
			//Create a new group by calling the api route for create group
			$http.post('api/groups/create/', formData)
				.success(function (data) {
					formData = {};
					deferred.resolve(data);
				})
				.error(function (error) {
					deferred.reject('Error: ' + error);
					console.log('error');
				});
			return deferred.promise;
			//body requires name, email, bet, start, end, _creator
			//should return 200
			//TODO: should return new group created with the attributes.
		}

    //delete group by group id
    service.deleteGroup = function (id){
      console.log("I'm fabulous cuz im in GroupService!");
      console.log('id: ', id);

    // return $http.post('/api/groups/delete/' + id)
      $http.post('/api/groups/delete/' + tempId)
        .sucess(function (deletedGroup){
          console.log('deletedGroup: ', deletedGroup);
          return deletedGroup;
        })
        .error(function (err){
          $q.reject(err);
          console.log('Error: ' + err);
        });
    };


		return service;
	});

