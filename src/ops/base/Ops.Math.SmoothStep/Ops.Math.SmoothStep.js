const result=op.outValue("result");
var number=op.addInPort(new CABLES.Port(op,"number"));
var min=op.addInPort(new CABLES.Port(op,"min"));
var max=op.addInPort(new CABLES.Port(op,"max"));

var subAdd=0;

function exec()
{
    // todo negative min ?

    var x = Math.max(0, Math.min(1, (number.get()-min.get())/(max.get()-min.get())));
    result.set( x*x*(3 - 2*x) ); // smoothstep
}

min.set(0);
max.set(1);
number.set(0);

number.onChange=exec;
max.onChange=exec;
min.onChange=exec;

exec();
