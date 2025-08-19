
// 1 misoll
function MinNumber(arr:number[]):number{
    return Math.min(...arr);
}
const mass:number[]=[1,2,3,4,5,6,5];
console.log(MinNumber(mass))


// 2- misoll

const sozlar:string[]=["salom", "qalesan","dost"]

const birlashtirish =(matn:string[]):string=>{
    return matn.join(', ')
}

console.log(birlashtirish(sozlar));


//3- misolll


type User=[username:string,sana:Date,aktiv1:boolean]

const user: User = ["Shuhrat", new Date(), true]; 
console.log(user)
const [username,sana,aktiv1]= user
console.log("Tizimga kirganmi:", aktiv? "Ha" : "Yo'q");

// 4-misoll
type Phone = {
    brend: string,
    model: string,
    price: number
};

const telefon: Phone[] = [
    { brend: 'apple', model: "pro maks", price: 1300 },
    { brend: 'samsung', model: "25 ultra", price: 1300 },
    { brend: 'mi', model: "14c", price: 180 },
    { brend: 'google', model: "picsel 9 pro", price: 1400 }
];

function maxPrice(arr: Phone[]): Phone {
    let max: Phone = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (max.price < arr[i].price) {
            max = arr[i];
        }
    }
    return max;
}

console.log(maxPrice(telefon));

//// 5-masala

type Student = {
    name: string,
    grade: number,
    is_aktiv: boolean
};

const studentlar: Student[] = [
    { name: "Ali", grade: 5, is_aktiv: true },
    { name: "Vali", grade: 4, is_aktiv: false },
    { name: "Malika", grade: 3, is_aktiv: true },
    { name: "Javohir", grade: 2, is_aktiv: true },
    { name: "Dilnoza", grade: 5, is_aktiv: false }
];

function aktiv(arr: Student[]):void {
    for (let i of arr) {
        if (i.is_aktiv===true ){
           console.log(i);
        }
    }
}
aktiv(studentlar);

//// 6-masala

function type(data: string | number): number | undefined {
    if (typeof data === 'string') {
        let tekshir: number[] = [0,1,2,3,4,5,6,7,8,9];
        for (let i of data.split('')) {
            if (!tekshir.includes(+i)) {
                return undefined;
            }
        }
        return +data;
    } 
    if (typeof data === 'number') {
        return data;
    }
    return undefined; 
}
console.log(type(12));
console.log(type("12"));
console.log(type("12a"));


//// 7- masala
function imput(data: string | boolean): boolean {
    if (typeof data === 'boolean') {
        return true;
    }
    return false; 
}
console.log(imput(true));
console.log(imput('st'));
console.log(imput(false));


//// 8-masala

function voyaga_yetgan(data:number): boolean {
    if ( data > 18) {
        return true;
    }
    return false; 
}
console.log(voyaga_yetgan(12));
console.log(voyaga_yetgan(16));
console.log(voyaga_yetgan(21));


//// 9 -masala

function defaulName(data: string | null | undefined): string {
    if (data===null || data===undefined) {
        return 'Mexmon';
    }
    return data; 
}
console.log(defaulName('Shuhrat'));
console.log(defaulName(null));
console.log(defaulName(undefined));

//// 10-masala
function welcome():void{
    console.log('Xush kelibsiz');
}

welcome();

function newer():never{
    throw new Error('hechnarsaga teng emas')
}

function infiniteLoop(): never {
    while (true) {
        console.log("tugamaydi...");
    }
}
//// 11-masala fibonachi
function fibo(n:number,i:number=0, f1:number=0,f2:number=1){
    if(n==i) return f1;
    console.log(f1);
    return fibo(n,i+1,f2,f1+f2);
}

fibo(10);


////12-masala

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}
const products: Product[] = [
  { id: 1, name: "Olma", price: 50, inStock: true },
  { id: 2, name: "Banana", price: 120, inStock: false },
  { id: 3, name: "Anor", price: 200, inStock: true },
  { id: 4, name: "Uzum", price: 90, inStock: true }
];
const qimmatMahsulotlar = products.filter(p => p.price > 100);
console.log(qimmatMahsulotlar);