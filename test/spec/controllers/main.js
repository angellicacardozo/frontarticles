'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('frontarticlesApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should have no items to start', function () {
    expect(scope.articles.length).toBe(0);
  });

  it('should add items to the list', function () {
    scope.article = 'Test 1';
    scope.addArticle();
    expect(scope.articles.length).toBe(1);
  });

  it('should add then remove an item from the list', function () {
    scope.article = 'Test 1';
    scope.addArticle();
    scope.removeArticle(0);
    expect(scope.articles.length).toBe(0);
  });


});
