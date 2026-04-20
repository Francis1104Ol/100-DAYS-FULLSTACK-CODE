//WORKING WITH CLASSES
class product{
    constructor(name, price){
        this.name = name;
        this.price = price

    }
    displayProduct(){
        console.log(`Product: ${this.name}`);
        console.log(`Price: #${this.price.toFixed(2)}`);
    }
    calculateTotal(salesTax){
        return this.price + (this.price*salesTax)
    }
}
const salesTax = 0.05

const product1 = new product('Cloth', 2500)
const product2 = new product('Short', 3000)
const product3 = new product('Wrist Watch', 13300)
const product4 = new product('Pam', 2500)

product1.displayProduct()
product2.displayProduct()
product3.displayProduct()

const total = product1.calculateTotal(salesTax)
console.log(`Total Price(with tax):#${total.toFixed(2)}`)

//STATIC KEYWORD : STATIC  KEYWORDDEFINE PROPERTIES OR METHOD THAT BELONGS TO A CLASS ITSELF RATHER THAN THE OBJECT CREATED FROM THAT CLASS

class mathUtil{
    static PI =3.142342
    static getDiameter(radius){
        return radius *2
    }
    static getCircumference(radius){
        return 2 *this.PI* radisu *radius
    }
    static getArea(radius){
        return 2 *this.PI* radisu *radius
    }
}
console.log(mathUtil.PI)
console.log(mathUtil.getDiameter(10))
console.log(mathUtil.getCircumference(10))
console.log(mathUtil.getArea(10))



class User{
    static userCount=0
    constructor(userName){
          this.userName = userName
          User.userCount++
    }
  
    sayHi(){
        console.log(`Hello, my username is ${this.userName}`)
    }
}

const user1 = new User("Nero")
const user2 = new User("Ola")

// console.log(user1.userName)
// console.log(user2.userName)
// console.log(user3.userName)
user1.sayHi()
user2.sayHi()

console.log(User.userCount)