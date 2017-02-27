op.name="ValueTrigger";

var exe=op.addInPort(new Port(op,"exe",OP_PORT_TYPE_FUNCTION));
var v=op.addInPort(new Port(op,"value",OP_PORT_TYPE_VALUE));

var result=op.addOutPort(new Port(op,"result"));


var exec=function()
{
    result.set(v.get());
};

exe.onTriggered=exec;
