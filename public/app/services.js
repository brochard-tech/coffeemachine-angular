/**
 * Created by christophebrochard on 26/10/2016.
 */

angular.module('coffeeApp', [])
  .factory('drinkMaker', function () {
    return {

      /**
       * Enum drinks
       * N.B. : Price are in centimes to prevent float calculation
       */
      DRINKS: {
        TEA: {
          key: 'T',
          price: 40
        },

        COFFEE: {
          key: 'C',
          price: 60
        },

        CHOCOLATE: {
          key: 'H',
          price: 50
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

        if (drinkType.price > (price || 0)) {
          return null;
        }

        return drinkType.key + ':' + (sugar || '') + ':' + (sugar ? '0' : '');
      },

      /**
       * Check if the value is listed into DRINKS enumeration
       * @param drinkType
       * @returns {boolean}
       */
      checkDrinkValue: function (drinkType)
      {
        if (!drinkType || (drinkType && !drinkType.key)) {
          return false;
        }

        for (var key in this.DRINKS) {
          if (this.DRINKS.hasOwnProperty(key) && this.DRINKS[key].key == drinkType.key) {
            return true;
          }
        }

        return false;
      }
    }
  });