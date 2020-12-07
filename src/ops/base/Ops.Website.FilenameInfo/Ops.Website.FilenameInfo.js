const
    inUrl=op.inString("URL",""),
    outProtocol=op.outString("Protocol"),
    outHost=op.outString("Host"),
    outFullPath=op.outString("Full Path"),
    outFilename=op.outString("Filename"),
    outIsURL=op.outString("Is URL"),
    outExt=op.outString("Suffix");

function isValidUrl(string)
{
    try { new URL(string); }
    catch (_) { return false; }

    return true;
}

inUrl.onChange=()=>
{
    const url=inUrl.get();
    const isUrl=isValidUrl(url);
    outIsURL.set(isUrl);

    if(url.indexOf(":")>-1)
    {
        const pathArray = url.split( ':' );
        outProtocol.set(pathArray[0]);
    }

    if(url.indexOf("/")>-1)
    {
        const hostArr = url.split( '/' );
        outHost.set(hostArr[2]);
    }

    if(url.indexOf(".")>-1)
    {
        const fnArray=url.split(".");
        outExt.set(fnArray[fnArray.length-1]);
    }
    else outExt.set("");

    if(url.indexOf("/")>-1 )
    {
        const hostArr = url.split( '/' );
        outFilename.set(hostArr[hostArr.length-1]);

        hostArr.length=hostArr.length-1;
        const fullPath=hostArr.join("/");
        outFullPath.set(fullPath);
    }
    else
    {
        if(!isUrl)outFilename.set(url);
    }
};