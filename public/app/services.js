/**
 * Created by christophebrochard on 26/10/2016.
 */

angular.module('coffeeApp')
  .factory('DrinkMakerService', function () {
    return {

      /**
       * Enum drinks
       * N.B. : Price are in centimes to prevent float calculation
       */
      DRINKS: {
        TEA: {
          KEY: 'T',
          PRICE: 40
        },

        COFFEE: {
          KEY: 'C',
          PRICE: 60
        },

        CHOCOLATE: {
          KEY: 'H',
          PRICE: 50
        }
      },

      /**
       * Make a drink with drink type and sugar number
       * @param drinkType: object
       * @param price: number
       * @param sugar: number
       */
      make: function (drinkType, price, sugar)
      {
        if (!this.checkDrinkValue(drinkType)) {
          return null;
        }

        var errorPrice = this.checkPriceRemaining(drinkType, price);

        if (errorPrice) {
          return errorPrice;
        }

        return drinkType.KEY + ':' + (sugar || '') + ':' + (sugar ? '0' : '');
      },

      /**
       * Check if the value is listed into DRINKS enumeration
       * @param drinkType
       * @returns {boolean}
       */
      checkDrinkValue: function (drinkType)
      {
        if (!drinkType || (drinkType && !drinkType.KEY)) {
          return false;
        }

        for (var key in this.DRINKS) {
          if (this.DRINKS.hasOwnProperty(key) && this.DRINKS[key].KEY == drinkType.KEY) {
            return true;
          }
        }

        return false;
      },

      /**
       * Display a message if price is smaller than required
       * @param drinkType
       * @param price
       * @returns {*}
       */
      checkPriceRemaining: function (drinkType, price)
      {
        if (!this.checkDrinkValue(drinkType)) {
          return null;
        }

        price     = price || 0;
        var diff  = drinkType.PRICE - price;

        return diff > 0 ? 'M:' + this.convertPrice(diff) + ' EUROS LEFT.' : null;
      },

      /**
       * Convert price (cts) into real price
       * @param price
       * @returns {string}
       */
      convertPrice: function (price)
      {
        return (price / 100).toFixed(2);
      }
    }
  });