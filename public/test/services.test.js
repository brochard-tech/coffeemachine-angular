/**
 * Created by christophebrochard on 26/10/2016.
 */

describe('services testing', function () {
  var mock, service;


  /* BEFORE */
  beforeEach(module('coffeeApp'));

  beforeEach(function () {
    mock = { alert: jasmine.createSpy() };

    inject(function ($rootScope, $compile, $injector) {
      scope = $rootScope.$new();
      compile = $compile;
      service = $injector.get('drinkMaker');
    });
  });


  /* TESTS */
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
    expect(service.make({ key: 'S', price: 1 })).toBeNull();
  });

  it('shouldnot make drink if no price provided', function () {
    expect(service.make(service.DRINKS.TEA)).toBeNull();
  });

  it('shouldnot make drink if price is smaller than required', function () {
    expect(service.make(service.DRINKS.COFFEE, 59)).toBeNull();
  });

  it('should make drink with no sugar and no stick', function () {
    expect(service.make(service.DRINKS.TEA, 50)).toBe('T::');
  });

  it('should make drink with correct sugar number and one stick', function () {
    expect(service.make(service.DRINKS.CHOCOLATE, 50, 1)).toBe('H:1:0');
  });
});