
/*
* My buddy got this test and gave me a high level of the first two levels, threw it together as practice. 
*/

type BaseRecord =
{
    id : string,
    createdAt : Date
}

type Records<T extends BaseRecord> = {
    [K in keyof T] : T[K]
}

type Table<T> = 
{
    key : string,
    records? : Map<string, T> | undefined
}

class database {
    memory : Map<string, Table<any>>;
    
    constructor() {
        this.memory = new Map<string, Table<any>>();
    }

    addTable<T>(name : string, table : Table<T>) {
        if (!name || !table) throw new Error("Invalid table properties");
        if (this.memory.has(name)) throw new Error("Sorry, this table already exists.");
        if (!table.records) {
            table.records = new Map<string, T>();
        }
        this.memory.set(name, table);
    }

    removeTable(name : string) {
        if (!name) throw new Error("Invalid table name.");
        if (!this.memory.has(name)) throw new Error("Sorry, this table does not exist.");
        this.memory.delete(name);
    }

    insertRecord<T extends BaseRecord>(tableName : string, record : T) {
        if (!tableName || !record) throw new Error("Invalid table name or record.");
        if (!this.memory.has(tableName)) throw new Error("Sorry, this table does not exist.");
        const table = this.memory.get(tableName);
        table?.records?.set(record.id, record);
    }

    updateRecord<T extends BaseRecord>(tableName : string, record : T) {
        if (!tableName || !record) throw new Error("Invalid table name or record.");
        if (!this.memory.has(tableName)) throw new Error("Sorry, this table does not exist.");
        const table = this.memory.get(tableName);
        if (!table?.records?.has(record.id)) throw new Error("Sorry, this record does not exist. Please use insert record instead.");
        table?.records?.set(record.id, record);
    }

    removeRecord(tableName : string, id : string) : boolean {
        if (!tableName || !id) throw new Error("Invalid table name or record.");
        if (!this.memory.has(tableName)) throw new Error("Sorry, this table does not exist.");
        const table = this.memory.get(tableName);
        return table?.records?.delete(id) ?? false;
    }

    getRecordById<T>(tableName : string, id : string) : T | undefined {
        if (!tableName || !id) throw new Error("Invalid table name or record.");
        if (!this.memory.has(tableName)) throw new Error("Sorry, this table does not exist.");
        const table = this.memory.get(tableName);
        return table?.records?.get(id) as T;
    }
}

const db = new database();
type Users =
{
    id : string,
    name: string,
    age: number,
    createdAt : Date
}
const UserTable: Table<Users> = { key : 'Users' }
db.addTable<Users>("users", UserTable);
db.insertRecord("users", { id: 'john', name: "John", age: 20, createdAt : new Date() });
db.insertRecord("users", { id: 'jane', name: "Jane", age: 25, createdAt : new Date() });
db.removeRecord("users", 'john');
console.log(db.getRecordById("users", 'jane'));
console.log(db.getRecordById("users", 'john'));