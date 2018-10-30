
var render=op.addInPort(new CABLES.Port(op,"render",CABLES.OP_PORT_TYPE_FUNCTION));
var trigger=op.addOutPort(new CABLES.Port(op,"trigger",CABLES.OP_PORT_TYPE_FUNCTION));

var shearX=op.addInPort(new CABLES.Port(op,"shearX"));
var shearY=op.addInPort(new CABLES.Port(op,"shearY"));

var cgl=op.patch.cgl;
var shearMatrix = mat4.create();

shearY.onChange=update;
shearX.onChange=update;
shearX.set(0.0);
shearY.set(0.0);


function update()
{
    mat4.identity(shearMatrix);
    shearMatrix[1]=Math.tan(shearX.get());
    shearMatrix[4]=Math.tan(shearY.get());
}


render.onTriggered=function()
{
    cgl.pushModelMatrix();

    mat4.multiply(cgl.mvMatrix,cgl.mvMatrix,shearMatrix);
    trigger.trigger();

    cgl.popModelMatrix();
};

