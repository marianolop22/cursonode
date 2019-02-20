export class User {

    constructor (
        public _id: string,
        public name: string,
        public surname: string,
        public email: string,
        public password: string,
        public role: string,
        public image: string
    ) {}

    public set ( user:User) {
        
        this._id = user._id;
        this.name = user.name;
        this.surname = user.surname;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
        this.image = user.image;

    }

    public get ( getHash:boolean) {

        return {
            _id: this._id,
            name: this.name,
            surname: this.surname,
            email: this.email,
            password: this.password,
            role: this.role,
            image: this.image,
            gethash: getHash
        };
    }
}
