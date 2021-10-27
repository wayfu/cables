const
    inUpdate = op.inTrigger("Update"),
    inLimit = op.inInt("Limit", 30),
    outArr = op.outArray("Array");

const inPorts = [];
for (let i = 0; i < 30; i++)
{
    const inp = op.inFloat("Index " + i, 0);
    inPorts.push(inp);
}

const arr = [];

inUpdate.onTriggered = update;

function update()
{
    const l = Math.max(0, Math.ceil(Math.min(inLimit.get(), inPorts.length)));
    arr.length = l;
    for (let i = 0; i < l; i++)
    {
        arr[i] = inPorts[i].get();
    }

    outArr.set(null);
    outArr.set(arr);
}