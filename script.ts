
// 1- misoll

abstract class Transport{
    abstract move():void
    name: string
}

class Car extends Transport{
    move(): void {
        console.log("Car is moving on road")
    }
}
class Bike extends Transport{
    move(): void {
        console.log("bike  is moving fast")
    }
}
class Plane extends Transport{
    move(): void {
        console.log("Plaki is fliying")
    }
}
const car = new Car()
const bike = new Bike()
const place = new Plane()

// car.move()
// bike.move()
// place.move()

// 2-misoll

abstract class Shape{
    abstract area(a?:number,b?:number): number
}


class Cricle extends Shape{
    area(r:number ){
        return  3.141428*r*r
    }
}

class Rectangle extends Shape{
    area(a: number, b: number): number {
        return a*b
    }
}
class Triangle extends Shape{
    area(a: number, b: number): number {
        return 0.5*a*b
    }
}

const shope:Shape[]=[
    new Cricle(),
    new Rectangle(),
    new Triangle()
]

// console.log(shope[0].area(6))
// console.log(shope[1].area(2,4))
// console.log(shope[2].area(2,2))



// 3-masala


abstract class Animal{
    abstract makeSound():void
}

class Dog extends Animal{
    makeSound(): void {
        console.log(" wow-wow");
        
    }
}

class Mushuk extends Animal{
    makeSound(): void {
        console.log("miyov-miyov");
        
    }
}
class Buqa extends Animal {
    makeSound(): void {
        console.log(" mo'o'o'o'o'");
        
    }
}

const hayvonlar:Animal[]=[
    new Dog,
    new Mushuk,
    new Buqa
]

for (const tovushlari of hayvonlar){
    // tovushlari.makeSound()
    
}

// 4-masaala
// utility types

// required

interface User{
    name?:string
    email?:string
    passwor?:string
    age?:number
}

const user1:Required<User>={
    name: "shuhrat",
    email: "shhhhshsh",
    passwor: "323232jhjh",
    age:23
}
// console.log(user1);

// 5-masala
// partial


function updatePartial(user: User, update:Partial<User>):User{
    return { ...user,...update}
}

let user:User={
    name: "Shuhrat",
    email: "shuhrat@skdm.com"
}

user= updatePartial(user,{age: 25, passwor: "121321212new"})

// console.log(user);


// 6-masala
// pick 

type pickUser= Pick<User, "name" |"age">;
type pickUser2= Pick <User, "passwor"|"email">;


const p:pickUser={
    name: "Shuhrat",
    age: 23
}
// console.log(p);

const s: pickUser2 ={
    passwor: "1212312njknkn",
    email:"shuhrat@gmail.com"
}

console.log(s);

// ommit

type omitUser =Omit<User,"paswor" | "email">

const a: omitUser={
    name: "Shuhrat",
    age:23
}
// console.log(a);

type omitUser2 = Omit<User, "age" | "name">;

const b: omitUser2 ={
    email: "shuhrat@gmail.com",
    passwor: "sdkmnasmd1321312312"
}
// console.log(b);

// 7-masala
//  excluse

type Status = 'padding' | 'success' | "failed"

type userExclude = Exclude<Status, "padding">;

const h1:userExclude= "failed"
const h3:userExclude= "success"

// extract

type userExtract = Extract<Status, "success"|"pedding">

const k1:userExtract= "success"
const k2: userExclude= 'failed'
console.log(k2);

// 8-masala

// record

type Role = "admin"| "editor"| "viwer"

const foydalanuvchi: Record<Role, string[]> = {
    admin:["oqimoq","ozgartirish","uchurish"],
    editor:[ "ozgartirish", "oqimoq"],
    viwer:["oqimoq"]
}
function can(role: Role, action: string): boolean {
  return foydalanuvchi[role].includes(action);
}

// console.log(can("admin", "uchurish")); 
// console.log(can("editor", "uchurish")); 
// console.log(can("viwer", "ozgartirish")); 

// 9-masala


type MaybeName = string | null | undefined;

type OnlyName = NonNullable<MaybeName>; 

const n1: OnlyName = "Shuhrat";

// const n2: OnlyName = null;     
// const n3: OnlyName = undefined;


// 10-masala


function calculate(a: number, b: number): number {
  return a + b;
}

type CalcReturn = ReturnType<typeof calculate>; 

type CalcParams = Parameters<typeof calculate>; 

const args: CalcParams = [3, 5];   
const result: CalcReturn = calculate(...args);

console.log("Args:", args);     
console.log("Result:", result); 
