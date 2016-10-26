/**
 * Created by christophebrochard on 26/10/2016.
 */

angular.module('coffeeApp')
  .controller('MachineController', ['$scope', 'DrinkMakerService', function ($scope, DrinkMakerService) {

    /* ATTRIBUTES */
    /**
     * Current money
     * @type {number}
     */
    $scope.money  = 0;

    /**
     * Number of sugar selected by the user
     * @type {number}
     */
    $scope.sugar  = 0;

    /**
     * Drink choosed by the user
     * @type {null}
     */
    $scope.drink  = null;

    /**
     * Message provided by the DrinkMakerService
     * @type {null}
     */
    $scope.message= null;

    /**
     * DRINKS Enum provided by DrinkMakerService
     * @type {*}
     */
    $scope.DRINKS = DrinkMakerService.DRINKS;

    /**
     * List of pieces accepted by the machine
     * @type {number[]}
     */
    $scope.MONEYS = [5, 10, 20, 50, 100, 200];

    /**
     * Max number of sugar available
     * @type {number}
     */
    $scope.maxSugar = 5;


    /* METHODS */
    /**
     * ConvertPrice from DrinkMakerService
     * @type {DrinkMakerService.convertPrice}
     */
    $scope.convertPrice = DrinkMakerService.convertPrice;

    /**
     * Add money to current money
     * @param value
     */
    $scope.addMoney = function (value)
    {
      if (!value) {
        return null;
      }

      $scope.MONEYS.forEach(function (val) {
        if (val === value) {
          $scope.money += val;
        }
      });
    };

    /**
     * Set drink choosed by the user
     * @param drinkType
     * @returns {null}
     */
    $scope.setDrink = function (drinkType)
    {
      if (!DrinkMakerService.checkDrinkValue(drinkType)) {
        return null;
      }

      $scope.drink = drinkType;
      $scope.validate();
    };

    /**
     * Set the number of sugar
     * @param value
     * @returns {null}
     */
    $scope.setSugar = function (value)
    {
      if (value == null) {
        return null;
      }

      if (value < 0) {
        $scope.sugar = 0;

      } else if (value > $scope.maxSugar) {
        $scope.sugar = $scope.maxSugar;

      } else {
        $scope.sugar = value;

      }
    };

    /**
     * Validate all choice by the user
     * @returns {null}
     */
    $scope.validate = function ()
    {
      if (!$scope.drink || !$scope.money) {
        return null;
      }

      var message = DrinkMakerService.make($scope.drink, $scope.money, $scope.sugar);

      if (!message) {
        return null;
      }

      $scope.message = $scope.interpretMessage(message);
    };

    /**
     * Interpret message provided by DrinkMakerService and display it
     * @param message
     * @returns {*}
     */
    $scope.interpretMessage = function (message) {
      if (!message) {
        return null;
      }

      if (message.indexOf('M:') > -1) {
        return message.substring(2);
      }

      var splittedMessage = message.split(':'),
        drinkName = getDrinkNameByKey(splittedMessage[0]);
      message             = '';

      if (!drinkName) {
        return null;
      }

      splittedMessage.forEach(function (value, index) {
        switch (index) {
          case 0: message += drinkName;
            break;

          case 1: message += (value ? ' WITH ' + value + ' SUGARS' : ' WITHOUT SUGAR');
            break;

          case 2: message += (value === '0' ? ' AND 1 STICK' : ' AND NO STICK');
            break;
        }
      });

      return message;
    };


    /* PRIVATE METHODS */
    /**
     * Get name of the drink by its key
     * @param key
     * @returns {*}
     */
    var getDrinkNameByKey = function (key) {
      if (!key) {
        return null;
      }

      for (var drinkKey in $scope.DRINKS) {
        if ($scope.DRINKS.hasOwnProperty(drinkKey) && $scope.DRINKS[drinkKey].KEY === key) {
          return drinkKey;
        }
      }
    }
  }]);