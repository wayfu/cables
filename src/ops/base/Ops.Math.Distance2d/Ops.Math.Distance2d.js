
var x1=op.addInPort(new CABLES.Port(op,"x1"));
var y1=op.addInPort(new CABLES.Port(op,"y1"));

var x2=op.addInPort(new CABLES.Port(op,"x2"));
var y2=op.addInPort(new CABLES.Port(op,"y2"));

var dist=op.addOutPort(new CABLES.Port(op,"distance"));

function calc()
{
	var xd = x2.get()-x1.get();
	var yd = y2.get()-y1.get();
	dist.set(Math.sqrt(xd*xd + yd*yd));
}


x1.onChange=calc;
y1.onChange=calc;
x2.onChange=calc;
y2.onChange=calc;


