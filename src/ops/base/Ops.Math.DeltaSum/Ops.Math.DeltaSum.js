var inVal=op.inValue("Delta Value");

var inReset=op.inFunctionButton("Reset");

var inLimit=op.inValueBool("Limit",false);
var inMin=op.inValue("Min",0);
var inMax=op.inValue("Max",100);
var inMul=op.inValue("Multiply",1);

inVal.changeAlways=true;

var value=0;
var outVal=op.outValue("Absolute Value");
inLimit.onChange=updateLimit;
updateLimit();

inReset.onTriggered=function()
{
    value=0;
};

function updateLimit()
{
    if(!inLimit.get())
    {
        inMin.setUiAttribs({hidePort:true,greyout:true});
        inMax.setUiAttribs({hidePort:true,greyout:true});
    }
    else
    {
        inMin.setUiAttribs({hidePort:false,greyout:false});
        inMax.setUiAttribs({hidePort:false,greyout:false});
    }
}


inVal.onChange=function()
{
    value+=inVal.get()*inMul.get();
    
    if(inLimit.get())
    {
        if(value<inMin.get())value=inMin.get();
        if(value>inMax.get())value=inMax.get();
    }
    
    outVal.set(value);
};
