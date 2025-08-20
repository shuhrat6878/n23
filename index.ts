//  ishlatishdan oldin          npx tsx watch index.ts     terminalda






interface Users {
    id: number,
    fullName: string,
    isActive: boolean,
    role: "admin" | "user" | "guest"
}

const person1: Users = { id: 1, fullName: "SHUHRAT", isActive: true, role: "admin" }
const person2: Users = { id: 1, fullName: "OTABEK", isActive: true, role: "user" }
const person3: Users = { id: 1, fullName: "FAZLIDDIN", isActive: true, role: "guest" }
const person4: Users = { id: 1, fullName: "MIROHUN", isActive: true, role: "user" }
const person5: Users = { id: 1, fullName: "ABBOS", isActive: true, role: "guest" }


// console.log(person1);
// console.log(person2);
// console.log(person3);
// console.log(person4);
// console.log(person5);



// 2-misollll


type Product = {
    name: string,
    price: number,
    discount: number | null
}


const products: Product[] = [
    { name: "Shakar", price: 14000, discount: null },
    { name: "Kartoshka", price: 5000, discount: null },
    { name: "Guruch", price: 22000, discount: 30 },
]

// console.log(products);


// 3-masala


type Lakatsa = [uzunlik: number, kenglik: number]

const Toshkent: Lakatsa = [234.23, 42.23]
const Parkent: Lakatsa = [2232.23, 233.23]
const Zarkent: Lakatsa = [655.23, 4245.23]
const Soqoq: Lakatsa = [236564.23, 545.23]

// console.log("Toshkent",Toshkent);
// console.log("Parkent",Parkent);
// console.log("Zarkent",Zarkent);


// 4-masala//

function cankulater(a: number, b: number, operation: "+" | "-" | "*" | "/") {
    if (operation === "+") return a + b;
    if (operation === "-") return a - b;
    if (operation === "*") return a * b;
    if (operation === "/") return a / b;
}

// console.log(cankulater(2,4,"*"));
// console.log(cankulater(3,5,"+"));
// console.log(cankulater(9,4,'-'));
// console.log(cankulater(25,4,"/"));

// 5-masala



class Animal{
    public name: string
    protected age: number
    private type: string
    constructor(name: string, age: number, type: string){
        this.age = age,
        this.type=type,
        this.name=name
    }
    getInfo(){
        return `nomi:${this.name},yoshi:${this.age},turi:${this.type}`
    }
}


const Dog = new Animal("Sinba",4,"Dog")
const cat = new Animal("Mishka",3,"cat")

// console.log(Dog.getInfo());
// console.log(cat.getInfo());


// 6-masala


class BankAcount{
    readonly accountNuber: number
    private _balance: number
    static bancName: string
    constructor(accountNumber:number,_balance:number){
        this._balance =_balance
        this.accountNuber=accountNumber
    }

    get getBalance():number{
        return this._balance
    }

    set setBalance(newBalanc:number){
        if(newBalanc > 0){
           this._balance= newBalanc
        }else{
            console.log("manfiy summa");
            
        }
    }
    static setBancName(name:string){
        BankAcount.bancName=name
    }
    static getbancName(){
        return BankAcount.bancName
    }

}

BankAcount.setBancName("SHAXSIY-SH_BANK");

const banc1= new BankAcount(555,45000)

// console.log(BankAcount.getbancName());

// console.log(banc1.getBalance);

// banc1.setBalance =56000
// console.log(banc1.getBalance);



// 7-MASALA


interface User{
    id: number
    username:string
    email:string
    status:Status
    
}

enum Status{
    ACTIV="activ",
    INCTIVE="inactiv",
    BLOCED="bloced"
}

const user1:User={
    id:5,
    username: "otash",
    email: "otash@gmail.uz",
    status: Status.INCTIVE
}

const user2:User={
    id:5,
    username: "Shuhrat",
    email: "shuhrat@gmail.uz",
    status: Status.ACTIV
}
const user3:User={
    id:5,
    username: "Agtham",
    email: "atham@gmail.uz",
    status: Status.BLOCED
}


// console.log(user1);
// console.log(user2);
// console.log(user3);


// 8-masala/



function unversall<T>(valusi: T):T{
    return valusi
}


const  user = unversall<string>("Shuxrat")
const  age = unversall<number>(24)
const  isMerried = unversall<boolean>(false)


console.log(user);
console.log(age);
console.log(isMerried);
