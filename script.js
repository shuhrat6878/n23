// 1- misoll
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Transport = /** @class */ (function () {
    function Transport() {
    }
    return Transport;
}());
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Car.prototype.move = function () {
        console.log("Car is moving on road");
    };
    return Car;
}(Transport));
var Bike = /** @class */ (function (_super) {
    __extends(Bike, _super);
    function Bike() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bike.prototype.move = function () {
        console.log("bike  is moving fast");
    };
    return Bike;
}(Transport));
var Plane = /** @class */ (function (_super) {
    __extends(Plane, _super);
    function Plane() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Plane.prototype.move = function () {
        console.log("Plaki is fliying");
    };
    return Plane;
}(Transport));
// 2-misoll
var Shape = /** @class */ (function () {
    function Shape() {
    }
    return Shape;
}());
var Cricle = /** @class */ (function (_super) {
    __extends(Cricle, _super);
    function Cricle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cricle.prototype.area = function (r, p) {
        return 2 * p * r * r;
    };
    return Cricle;
}(Shape));
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rectangle.prototype.area = function (a, b) {
        return a * b;
    };
    return Rectangle;
}(Shape));
var Triangle = /** @class */ (function (_super) {
    __extends(Triangle, _super);
    function Triangle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Triangle.prototype.area = function (a, b) {
        return 0.5 * a * b;
    };
    return Triangle;
}(Shape));
var shope = [
    new Cricle(),
    new Rectangle(),
    new Triangle()
];
console.log(shope[0].area(5));
console.log(shope[1].area(2, 4));
console.log(shope[2].area(2));
