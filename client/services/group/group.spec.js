// (function() {
//   'use strict';

//   describe('GroupService', function() {
//     var service, $httpBackend, handler, groupData, errorMessage;

//     // Configure module that contains the controller being tested
//     beforeEach(module('eggercise'));

//     beforeEach(inject(function (_$httpBackend_, _GroupService_) {
//       $httpBackend = _$httpBackend_;
//       service = _GroupService_;
//       groupData = [];


//       // Define an object with functions to handle success and error for our API calls
//       // These functions simulate the functions written in controllers when a service is called
//       handler = {
//         success: function(group) {
//           groupData.push(group);
//         },
//         error: function(err) {
//           errorMessage = err;
//         }
//       }; 

//       // Use the Jasmine spyOn method to setup a callback using our handler mock object
//       spyOn(handler, 'success').and.callThrough();
//       spyOn(handler, 'error').and.callThrough();
      
//     }));

//     afterEach(function() {
//      $httpBackend.verifyNoOutstandingExpectation();
//      $httpBackend.verifyNoOutstandingRequest();
//     });


//     //Test for createGroup()
//     it('should create a new group', function () {
//         // expect(200);
//         var createG = service.createGroup()
//             .then(function () {
//                 console.log('successful');
//             })
//             .catch(function (err) {
//               console.log('Error!!!', err);
//             });
//         expect(createG).toBeTruthy();
//         // $httpBackend.flush();
//     });


//     it('should delete a group', function() {
//       var id = '565f912826c74d251d0a7b04';
//       var response = {
//         group: {
          
//           _id : id,
//           name : 'testGroup',
//           email : 'testGroup@test.com',
//           bet : 100,
//           start : '2015-12-01T08:00:00Z',
//           end : '2015-12-31T08:00:00Z',
//           _creator : '565f912726c74d251d0a7b03',
//           _members : [ ],
//           __v : 0 
//         }
//       };

//       // Use the httpBackend mock service to capture the call to our API and return the data we specify in the response variable
//       $httpBackend.whenPOST(/delete\/\w+$/).respond(response);
//       // setup the service to use the success and error handler functions we defined in the beforeEach block. 
//       service.deleteGroup(id).then(handler.success, handler.error);
//       // execute the HTTP API call
//       $httpBackend.flush();

//       //tests the results
//       expect(handler.success).toHaveBeenCalled();
//       expect(groupData).toEqual(response);
//       expect(handler.error).not.toHaveBeenCalled();
//       expect(errorMessage).toBeUndefined();

//     });

//   });
// })();