// Goofy file to test things about classes.

class A 
{
    [b : string] : "";
}

const a = new A();
a[0] = ""; // Ok
a[0] = 0; // Fails

class B
{
    b : string;
}
const b = new B();
b.b = ""; // Ok
b.b = 0; // Fails

const somefN = "functionName";
class C 
{
    [somefN] () { return "1"; }
}
const c = new C();
c[somefN](); // = "1" Ok

