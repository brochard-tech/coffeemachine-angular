/**
 * Created by christophebrochard on 26/10/2016.
 */

describe('services testing', function () {
  var service;

  /* BEFORE */
  beforeEach(module('coffeeApp'));

  beforeEach(function () {
    inject(function ($injector) {
      service = $injector.get('DrinkMakerService');
    });
  });


  /* TESTS */
  // Drinktype tests
  it('should have the drinkmaker service', function () {
    expect(service).not.toBeNull();
  });

  it('souldnot make drink if there is no parameters', function () {
    expect(service.make()).toBeNull();
  });

  it('shouldnot make drink if drink is not recognize', function () {
    expect(service.make('tomatoe')).toBeNull();
  });

  it('shouldnot make drink if drinktype is customized', function () {
    expect(service.make({ KEY: 'S', PRICE: 1 })).toBeNull();
  });

  // Sugar & stick tests
  it('should make drink with no sugar and no stick', function () {
    expect(service.make(service.DRINKS.TEA, 50)).toBe('T::');
  });

  it('should make drink with correct sugar number and one stick', function () {
    expect(service.make(service.DRINKS.CHOCOLATE, 50, 1)).toBe('H:1:0');
  });

  it('should convert drink price into a more conveniant value', function () {
    expect(service.convertPrice(service.DRINKS.CHOCOLATE.PRICE)).toBe('0.50');
  });

  // Price tests
  it('shouldnot make drink if no price provided', function () {
    expect(service.make(service.DRINKS.TEA)).toContain('M:');
  });

  it('shouldnot make drink if price is smaller than required', function () {
    expect(service.make(service.DRINKS.COFFEE, 59)).toContain('M:0.01');
  });

  it('should return null if drinkType is invalid for checking price remaining', function () {
    expect(service.checkPriceRemaining()).toBeNull();
  });
});