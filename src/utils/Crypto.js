import { hash,compare } from "bcrypt";


class Crypto {
    async encrypt(data){
        return hash(data,7);

    }

    async decrypt(data,encrypteData){
        return compare(data,encrypteData);
    }
}

export default new Crypto();
