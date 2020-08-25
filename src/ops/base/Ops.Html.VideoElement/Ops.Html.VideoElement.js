const
    // src=op.inString("URL",'https://undev.studio'),
    src = op.inUrl("File"),
    elId = op.inString("ID"),
    play = op.inBool("Play"),
    controls = op.inBool("Controls", true),
    active = op.inBool("Active", true),
    loop = op.inBool("Loop", false),
    inStyle = op.inStringEditor("Style", "position:absolute;\nz-index:9999;\nborder:0;\nwidth:50%;\nheight:50%;"),
    rewind = op.inTriggerButton("Rewind"),
    outEle = op.outObject("Element"),
    outPlaying = op.outBool("Playing"),
    outCanplaythrough = op.outBool("Can Play Through"),
    outTime = op.outNumber("Time"),
    outEnded = op.outTrigger("Ended"),
    outHasError = op.outBool("Has Error"),
    outError = op.outString("Error Message");
op.setPortGroup("Attributes", [src, elId]);

let element = document.createElement("video");
let timeOut = null;

op.onDelete = removeEle;

op.onLoaded = init;

function init()
{
    addElement();
    updateSoon();

    inStyle.onChange =
    src.onChange =
    elId.onChange = updateSoon;

    active.onChange = updateActive;
}
init();

loop.onChange =
controls.onChange = updateVideoSettings;

function updateVideoSettings()
{
    if (!element) return;
    if (controls.get()) element.controls = "true";
    else
    {
        element.controls = "true";
        element.removeAttribute("controls");
    }

    if (loop.get()) element.loop = "true";
    else element.removeAttribute("loop");

    console.log("element.controls", element.controls);
}

function updatePlay()
{
    if (!element) return;
    if (play.get())element.play();
    else element.pause();
}

play.onChange = () =>
{
    updatePlay();
};


rewind.onTriggered = function ()
{
    if (element) element.currentTime = 0;
};


function addElement()
{
    if (!active.get()) return;
    if (element) removeEle();
    element = document.createElement("video");
    element.setAttribute("playsinline", "");
    element.setAttribute("webkit-playsinline", "");
    element.preload = "true";
    updateVideoSettings();
    element.setAttribute("crossOrigin", "anonymous");
    outCanplaythrough.set(false);

    outHasError.set(false);
    outError.set("");

    element.addEventListener("canplaythrough", () =>
    {
        outCanplaythrough.set(true);
    }, true);
    element.addEventListener("play", () =>
    {
        outPlaying.set(true);
    }, true);
    element.addEventListener("ended", () =>
    {
        outEnded.trigger();
    }, true);
    element.addEventListener("pause", () =>
    {
        outPlaying.set(false);
    }, true);

    element.addEventListener("timeupdate", () =>
    {
        if (element)outTime.set(element.currentTime);
    }, true);

    element.onerror = function ()
    {
        outHasError.set(true);
        if (element)
        {
            outError.set("Error " + element.error.code + "/" + element.error.message);
            op.log("Error " + element.error.code + "; details: " + element.error.message);
        }
    };

    // element.playbackRate = speed.get();
    // if (!addedListeners)
    // {
    //     addedListeners = true;
    //     element.addEventListener("canplaythrough", initVideo, true);
    //     element.addEventListener("loadedmetadata", loadedMetaData);
    //     element.addEventListener("playing", function () { videoElementPlaying = true; }, true);
    // }

    updateAttribs();
    const parent = op.patch.cgl.canvas.parentElement;
    parent.appendChild(element);
    updateVideoSettings();

    if (play.get())updatePlay();

    outEle.set(element);
}

function updateSoon()
{
    clearTimeout(timeOut);
    timeOut = setTimeout(updateAttribs, 30);
}

function updateAttribs()
{
    if (!element) return;
    element.setAttribute("style", inStyle.get());
    element.setAttribute("src", src.get());
    element.setAttribute("id", elId.get());
}

function removeEle()
{
    if (element && element.parentNode)element.parentNode.removeChild(element);
    element = null;
    outEle.set(element);
}

function updateActive()
{
    if (!active.get())
    {
        removeEle();
        return;
    }

    addElement();
}