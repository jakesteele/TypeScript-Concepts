class Character {
    private height: number;
    private width : number;
    constructor() {
        this.height = 100;
        this.width = 100;
    }
    public getHeight = (): number => this.height;
    public getWidth = (): number => this.width;
    public setHeight = (height: number) => this.height = height;
    public setWidth = (width: number) => this.width = width;
}

type Constructor = new (...args: any[]) => {};
function Name<T extends Constructor>(Base: T) {
    return class Naming extends Base {
        private name : string;
        public getName = (): string => this.name;
        public setName = (name: string) => this.name = name;
    }
};

const Player = Name(Character);

const john = new Player();
console.log(john.getWidth());
console.log(john.getWidth());
console.log(john.getName());


// Typing it
type GConstructor<T = {}> = new (...args: any[]) => T;
type Playable = GConstructor<Character>;

function NamedCharacter<Base extends Playable>(Input : Base) {
    return class NamedCharacter extends Input {
        private name : string;
        public getName = (): string => this.name;
        public setName = (name: string) => this.name = name;
        public increaseWeight = (amount : number) => this.setWidth(this.getWidth() + amount); // Notice we can call methods from Character class. 
        public decreaseWeight = (amount : number) => this.setWidth(this.getWidth() - amount); // Notice we can call methods from Character class.
    }
}
const Player2 = NamedCharacter(Character);
const amy = new Player2();
amy.setName("Amy");
amy.decreaseWeight(25);