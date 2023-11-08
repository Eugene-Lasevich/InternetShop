// Базовый класс Product
function Product(name, price) {
    this.name = name;
    this.price = price;
}

// Функция для получения цены продукта
Product.prototype.getPrice = function () {
    return this.price;
};

// Функция для установки цены продукта
Product.prototype.setPrice = function (newPrice) {
    this.price = newPrice;
};

// Класс-наследник DeliverableProduct
function DeliverableProduct(name, price, deliveryTime) {
    Product.call(this, name, price);
    this.deliveryTime = deliveryTime;
}

// Наследование прототипа
DeliverableProduct.prototype = Object.create(Product.prototype);
DeliverableProduct.prototype.constructor = DeliverableProduct;

// Добавим декоратор для функции getPrice
// function withLoggingGetPrice(target, key, descriptor) {
//     const originalMethod = descriptor.value;
//     descriptor.value = function () {
//         console.log(`Getting price for product: ${this.name}`);
//         return originalMethod.apply(this);
//     };
//     return descriptor;
// }

// Применяем декоратор к методу getPrice
// DeliverableProduct.prototype.getPrice = withLoggingGetPrice(DeliverableProduct.prototype, 'getPrice');

// Создание экземпляра DeliverableProduct
const product = new DeliverableProduct("Laptop", 1000, "2 days");

console.log(`Product: ${product.name}`);
console.log(`Price: $${product.getPrice()}`);
console.log(`Delivery Time: ${product.deliveryTime}`);



// Базовый класс Product
class Product1 {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    // Геттер для цены продукта
    get getPrice() {
        return this.price;
    }

    // Сеттер для цены продукта
    set setPrice(newPrice) {
        this.price = newPrice;
    }
}

// Класс-наследник DeliverableProduct
class DeliverableProduct1 extends Product1 {
    constructor(name, price, deliveryTime) {
        super(name, price);
        this.deliveryTime = deliveryTime;
    }

    // Декоратор для метода getPrice
    // @withLoggingGetPrice1
    // getPrice() {
    //     return super.getPrice;
    // }
}

// Декоратор для метода getPrice
function withLoggingGetPrice1(target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function () {
        console.log(`Getting price for product: ${this.name}`);
        return originalMethod.apply(this);
    };
    return descriptor;
}

// Создание экземпляра DeliverableProduct
const product1 = new DeliverableProduct1("Laptop", 1000, "2 days");

console.log(`Product: ${product1.name}`);
console.log(`Price: $${product1.getPrice()}`);
console.log(`Delivery Time: ${product1.deliveryTime}`);
