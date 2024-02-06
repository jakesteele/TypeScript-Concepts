/*
* Test was purposely changed to avoid giving away any answers.
* -- I failed this one, but I wanted to remember the solution I came up with.
* In my actual test, I had a lot more validation and error checking / static messages.
*/

interface Account 
{
    name : string,
    timestamp : string,
    balance : number,
    transferred : number;
}

interface CashBack 
{
    amount : number,
    timestamp : Date,
    accountId : string
}

class Bank {
    private accounts : Account[] = [];
    private cashBacks : CashBack[] = [];

    public createAccount = (account : Account) => {
        account.balance = 0;
        this.accounts.push(account);
    }

    public deposit = (accountId : string, amount : number) => {
        if (amount > 0) {
            const account = this.accounts.find(x => x.name === accountId);
            if (account) account.balance += amount;
        }
    }

    public transfer = (fromAccountId : string, toAccountId : string, amount : number) => {
        if (amount > 0) {
            const fromAccount = this.accounts.find(x => x.name === fromAccountId);
            const toAccount = this.accounts.find(x => x.name === toAccountId);
            if (fromAccount && toAccount && fromAccount.balance > amount) {
                fromAccount.balance -= amount;
                fromAccount.transferred += amount;
                toAccount.balance += amount;
            }
        }
    }

    public getTopSpenders = (numberToReturn : number) => {
        if (numberToReturn > 0) {
            return this.accounts.sort((a, b) => b.transferred - a.transferred).slice(0, numberToReturn).map(x => `${x.name}(${x.transferred})`);
        }
    }

    public pay = (accountId : string, amount : number) => { 
        if (amount > 0) {
            const account = this.accounts.find(x => x.name === accountId);
            if (account) account.balance -= amount;
            this.cashBacks.push({ amount: Math.floor(amount * 0.02), timestamp: new Date(), accountId }); 
        }
    }

    public payCashback = (i : number) => {
        if (this.cashBacks.length > i) {
            const cashBack = this.cashBacks[i];
            const account = this.accounts.find(x => x.name === cashBack.accountId);
            if (account) account.balance += cashBack.amount;
            this.cashBacks.slice(i, 1);
            this.payCashback(i + 1);
        }
    }

}

enum TransactionType
{
    CreateAccount = "create_account",
    Deposit = "deposit",
    Transfer = "transfer",
    PrintSpenders = "print_spenders",
    Pay  = "pay"
}

/* Provided by the test */
function solution(input: string[][]) {
    const bank = new Bank();

    for (let i = 0, l = input.length; i < l; i++) 
    {
        const assertedTuple = input[i];
        const transactionType = (assertedTuple[0] as TransactionType);
        switch(transactionType) {
            case TransactionType.CreateAccount:
                bank.createAccount({ name: assertedTuple[2], timestamp: assertedTuple[1], balance: 0, transferred: 0 });
                break;
            case TransactionType.Deposit:
                bank.deposit(assertedTuple[2], parseFloat(assertedTuple[3]));
                break;
            case TransactionType.Transfer:
                bank.transfer(assertedTuple[2], assertedTuple[3], parseFloat(assertedTuple[4]));
                break;
            case TransactionType.PrintSpenders:
                bank.getTopSpenders(parseInt(assertedTuple[2]))?.join(', ');
                break;
            case TransactionType.Pay:
                bank.pay(assertedTuple[2], parseFloat(assertedTuple[3]));
                break;
        }
    }
}

solution(
    [
        ["create_account", "1", "account1"],
        ["create_account", "2", "account2"],
        ["deposit", "3", "account1", "12"],
        ["deposit", "4", "account2", "30"],
        ["transfer", "5", "account1", "account2", "10"],
        ["transfer", "6", "account2", "account1", "10"],
        ["print_spenders", "7", "2"],
        ["pay", "8", "account1", "6"],
    ]
)