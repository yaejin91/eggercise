// 'use strict';

// describe('Controller: LoginCtrl', function () {

//   beforeEach(module('eggercise'));

//   var LoginCtrl,
//     $httpBackend,
//     $location,
//     $cookieStore;

//   beforeEach(inject(function ($controller, _$httpBackend_, _$location_, _$cookieStore_) {
//     LoginCtrl = $controller('LoginCtrl', {});
//     $httpBackend = _$httpBackend_;
//     $cookieStore = _$cookieStore_;
//     $location = _$location_;
//   }));

//   afterEach(function () {
//     $httpBackend.verifyNoOutstandingExpectation();
//     $httpBackend.verifyNoOutstandingRequest();
//     $cookieStore.remove('token');
//   });

//   it('should redirect to / after successful login', function () {
//     LoginCtrl.login({ email: 'test@test.com', password: 'test' });
//     $httpBackend.expectPOST('/auth/local')
//       .respond({ token: 'token' });
//     $httpBackend.flush();
//     expect($location.path()).toBe('/');
//   });

// });
