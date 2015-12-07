'use strict';

describe('GroupService', function () {
	var service,
		$httpBackend;

	//Configure module that contains the controller being tested
	beforeEach(function() {
		module('eggercise')
		inject(function (_GroupService_, _$httpBackend_) {
			service = _GroupService_;
			$httpBackend = _$httpBackend_;
		});

	});

	afterEach(function () {
	  // $httpBackend.verifyNoOutstandingExpectation();
	  // $httpBackend.verifyNoOutstandingRequest();
	});

	//Test for createGroup()
	it('should create a new group', function () {
		// expect(200);
		var createG = service.createGroup()
			.then(function () {
				console.log('successful');
			})
			.catch(function (err) {
			  console.log('Error!!!', err);
			});
		expect(createG).toBeTruthy();
		// $httpBackend.flush();
	})

	//TODO: Should test for negative condition (api call fails due to invalid data)
	// it('should not create a new group if given incomplete data', function () {
		
	// })

	// it('should return proper http status indicating error if given invalid data', function () {

	// })

})