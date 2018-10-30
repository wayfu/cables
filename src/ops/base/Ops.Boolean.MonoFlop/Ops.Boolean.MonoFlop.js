
var trigger=op.inTriggerButton("Trigger");
var duration=op.inValue("Duration",1);
var valueTrue=op.inValue("Value True",1);
var valueFalse=op.inValue("Value False",0);

var result=op.outValue("Result",false);

var lastTimeout=-1;

trigger.onTriggered=function()
{
    result.set(valueTrue.get());
    
    clearTimeout(lastTimeout);
    lastTimeout=setTimeout(function()
    {
        result.set(valueFalse.get());
    },duration.get()*1000);

};