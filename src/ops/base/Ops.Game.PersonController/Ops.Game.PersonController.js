const
    exe = op.inTrigger("Exe"),
    speed = op.inValue("Speed", 1),
    outX = op.outNumber("X"),
    outY = op.outNumber("Y"),
    outDir = op.outNumber("Dir"),
    goNorth = op.outBoolNum("North"),
    goEast = op.outBoolNum("East"),
    goSouth = op.outBoolNum("South"),
    goWest = op.outBoolNum("West");

let lastTime = performance.now();
let dir = 0;

exe.onTriggered = function ()
{
    let ago = (performance.now() - lastTime) / 1000;
    let x = 0;
    let y = 0;
    if (goEast.get())x += ago * speed.get();
    if (goWest.get())x -= ago * speed.get();
    if (goNorth.get())y += ago * speed.get();
    if (goSouth.get())y -= ago * speed.get();

    if (goEast.get())dir = 90;
    if (goWest.get())dir = 270;
    if (goNorth.get())dir = 0;
    if (goSouth.get())dir = 180;

    outDir.set(dir);
    outX.set(outX.get() + x);
    outY.set(outY.get() + y);
    lastTime = performance.now();
};
