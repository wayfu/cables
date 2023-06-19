const
    update = op.inTrigger("Update"),
    inKey = op.inString("Key", ""),
    inStr = op.inString("String", ""),
    next = op.outTrigger("Next");

op.setUiAttrib({ "extendTitlePort": inKey.name });

update.onTriggered = () =>
{
    if (op.patch.frameStore.compObject && op.patch.frameStore.compObject.length > 0)
    {
        let obj = op.patch.frameStore.compObject[op.patch.frameStore.compObject.length - 1];
        obj[inKey.get()] = inStr.get();
    }
    next.trigger();
};
