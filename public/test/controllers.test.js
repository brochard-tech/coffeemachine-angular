/**
 * Created by christophebrochard on 26/10/2016.
 */

describe('controllers testing', function () {
  var $scope, service;

  /* BEFORE */
  beforeEach(module('coffeeApp'));

  beforeEach(function () {
    inject(function ($rootScope, $controller, $injector) {
      $scope = $rootScope.$new();
      service = $injector.get('DrinkMakerService');

      $controller('MachineController', {
        $scope: $scope,
        DrinkMakerService: service
      });
    });
  });


  /* TEST */
  // Variables
  it('should have drinks enum provided from the DrinkMakerService', function () {
    expect($scope.DRINKS).not.toBeUndefined();
  });

  it('should have the same informations between service and controller (DRINKS)', function () {
    expect($scope.DRINKS.TEA.KEY).toBe('T');
  });

  // Money
  it('shouldnot add money if value is not a number registered', function () {
    $scope.addMoney(35);
    expect($scope.money).toBe(0);
  });

  it('shouldnot add money if number is null', function () {
    $scope.addMoney();
    expect($scope.money).toBe(0);
  });

  it('should add money with correct value', function () {
    $scope.addMoney(20);
    expect($scope.money).toBe(20);
  });

  // Sugar test
  it('shouldnot change sugar number if there is no parameters', function () {
    $scope.setSugar();
    expect($scope.sugar).toBe(0);
  });

  it('should not be larger than maxsugar', function () {
    $scope.setSugar(6);
    expect($scope.sugar).toBe(5);
  });

  it('should not be smaller than 0 sugar', function () {
    $scope.setSugar(-19);
    expect($scope.sugar).toBe(0);
  });

  it('should have correct number of sugar with correct number', function () {
    $scope.setSugar(4);
    expect($scope.sugar).toBe(4);
  });

  // Drink test
  it('shouldnot set drink if there is no parameter', function () {
    $scope.setDrink();
    expect($scope.drink).toBeNull();
  });

  it('shouldnot set drink if drinktype is invalide', function () {
    $scope.setDrink(true);
    expect($scope.drink).toBeNull();
  });

  it('shouldnot set drink if drinktype is not registered', function () {
    $scope.setDrink({ KEY: 'X', PRICE: 800 });
    expect($scope.drink).toBeNull();
  });

  it('should set correct drink with correct parameter', function () {
    $scope.setDrink($scope.DRINKS.COFFEE);
    expect($scope.drink.KEY).toBe($scope.DRINKS.COFFEE.KEY);
  });

  // Validate test
  it('should return a message with princing left if price is smaller than required', function () {
    $scope.addMoney(20);
    $scope.setDrink($scope.DRINKS.CHOCOLATE);

    expect($scope.message).toContain('LEFT');
  });

  it('shouldnot return any message with invalid parameters', function () {
    $scope.addMoney(100);
    $scope.drink = true;
    $scope.validate();

    expect($scope.message).toBeNull();
  });

  it('shouldnot interpret message if there is no parameter', function () {
    expect($scope.interpretMessage()).toBeNull();
  });


  it('shouldnot return any message if drink key doesnot exist', function () {
    expect($scope.interpretMessage('::')).toBe(null);
  });

  it('should return message validation with correct parameter', function () {
    $scope.addMoney(100);
    $scope.setDrink($scope.DRINKS.TEA);

    expect($scope.message).toContain('TEA');
  });
});