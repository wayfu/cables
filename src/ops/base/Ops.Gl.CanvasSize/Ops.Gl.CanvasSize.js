op.name='CanvasSize';

var exe=op.addInPort(new Port(op,"exe",OP_PORT_TYPE_FUNCTION));
var width=op.addOutPort(new Port(op,"width",OP_PORT_TYPE_VALUE));
var height=op.addOutPort(new Port(op,"height",OP_PORT_TYPE_VALUE));

var cgl=op.patch.cgl;
var w=0,h=0;

exe.onTriggered=function()
{
    height.set(cgl.canvasHeight);
    width.set(cgl.canvasWidth);
    
    console.log(cgl.canvasWidth,cgl.canvasHeight);
    // h=cgl.canvasHeight;
    // w=cgl.canvasWidth;
};