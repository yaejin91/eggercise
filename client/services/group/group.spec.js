(function() {
  'use strict';

  describe('GroupService', function() {
    var service, httpBackend, handler, groupData, errorMessage;

    // Configure module that contains the controller being tested
    beforeEach(module('eggercise'));

    beforeEach(inject(function (_$httpBackend_, _GroupService_) {
      httpBackend = _$httpBackend_;
      service = _GroupService_;
      groupData = [];

      // Define an object with functions to handle success and error for our API calls
      // These functions simulate the functions written in controllers when a service is called
      handler = {
        success: function(groups) {
          groupData = groups;
        },
        error: function(err) {
          errorMessage = err;
        }
      }; 

      // Use the Jasmine spyOn method to setup a callback using our handler mock object
      spyOn(handler, 'success').and.callThrough();
      spyOn(handler, 'error').and.callThrough();
    }));

    afterEach(function() {
     httpBackend.verifyNoOutstandingExpectation();
     httpBackend.verifyNoOutstandingRequest();
    });


    it('should delete a group', function() {
      var response = {
        group: {
          
          _id : ObjectId('565f912826c74d251d0a7b04'),
          name : 'testGroup',
          email : 'testGroup@test.com',
          bet : 100,
          start : ISODate('2015-12-01T08:00:00Z'),
          end : ISODate('2015-12-31T08:00:00Z'),
          _creator : ObjectId('565f912726c74d251d0a7b03'),
          _members : [ ],
          __v : 0 
        }
      }

      // Use the httpBackend mock service to capture the call to our API and return the data we specify in the response variable
      httpBackend.expectPOST('/api/groups/' + group._id).respond(response);
      // setup the service to use the success and error handler functions we defined in the beforeEach block. 
      service.deleteGroup().then(handler.success, handler.error);
      // execute the HTTP API call
      httpBackend.flush();

      //tests the results
      expect(handler.success).toHaveBeenCalled();
      expect(groupData).toEqual(response);
      expect(response.group.name).toEqual('testGroup');
      expect(handler.error).not.toHaveBeenCalled();
      expect(errorMessage).toBeUndefined();

    })

  });
})();