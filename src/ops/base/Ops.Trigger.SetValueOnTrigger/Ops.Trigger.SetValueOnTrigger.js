op.name="SetValueOnTrigger";

// inputs
var valuePort = op.inValueString("Value");
var setValuePort = op.inFunction("Set Value");

// outputs
var outValuePort = op.outValue("Out Value");
outValuePort.changeAlways = true;

// change listeners
setValuePort.onTriggered = function() {
    outValuePort.set(valuePort.get());
};