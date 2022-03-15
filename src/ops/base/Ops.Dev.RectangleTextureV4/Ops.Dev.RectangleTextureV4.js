const render = op.inTrigger("render"),
    amount = op.inValueSlider("Amount", 1),
    blendMode = CGL.TextureEffect.AddBlendSelect(op),
    maskAlpha = CGL.TextureEffect.AddBlendAlphaMask(op),
    inCenterMode = op.inBool("Center", false),
    inWidth = op.inValueSlider("Width", 0.25),
    inHeight = op.inValueSlider("Height", 0.25),
    inAspect = op.inBool("Aspect Ratio", true),
    inPosX = op.inValueSlider("X", 0),
    inPosY = op.inValueSlider("Y", 0),
    inRot = op.inValue("Rotate", 0),
    inRoundness = op.inValueSlider("roundness", 0),
    r = op.inValueSlider("r", 1.0),
    g = op.inValueSlider("g", 1.0),
    b = op.inValueSlider("b", 1.0),
    a = op.inValueSlider("a", 1.0),
    trigger = op.outTrigger("trigger");

r.setUiAttribs({ "colorPick": true });

op.setPortGroup("Size", [inWidth, inHeight, inAspect]);
op.setPortGroup("Position", [inPosX, inPosY]);
op.setPortGroup("Color", [r, g, b, a]);

let cgl = op.patch.cgl;
let shader = new CGL.Shader(cgl, "textureeffect rectangle");
shader.setSource(shader.getDefaultVertexShader(), attachments.rectangle_frag || "");

let textureUniform = new CGL.Uniform(shader, "t", "tex", 0),
    uniHeight = new CGL.Uniform(shader, "f", "height", inHeight),
    unWidth = new CGL.Uniform(shader, "f", "width", inWidth),
    uniX = new CGL.Uniform(shader, "f", "x", inPosX),
    uniY = new CGL.Uniform(shader, "f", "y", inPosY),
    uniRot = new CGL.Uniform(shader, "f", "rotate", inRot),
    uniRoundness = new CGL.Uniform(shader, "f", "roundness", inRoundness),
    uniformR = new CGL.Uniform(shader, "f", "r", r),
    uniformG = new CGL.Uniform(shader, "f", "g", g),
    uniformB = new CGL.Uniform(shader, "f", "b", b),
    uniformA = new CGL.Uniform(shader, "f", "a", a),
    uniformAmount = new CGL.Uniform(shader, "f", "amount", amount),
    uniformAspect = new CGL.Uniform(shader, "f", "aspect", 1);

CGL.TextureEffect.setupBlending(op, shader, blendMode, amount, maskAlpha);

inCenterMode.onChange = function ()
{
    shader.toggleDefine("CENTER", inCenterMode.get());
};
render.onTriggered = function ()
{
    if (!CGL.TextureEffect.checkOpInEffect(op)) return;

    cgl.pushShader(shader);
    cgl.currentTextureEffect.bind();

    const texture = cgl.currentTextureEffect.getCurrentSourceTexture();
    if (inAspect.get()) uniformAspect.set(texture.height / texture.width);
    else uniformAspect.set(1);

    cgl.setTexture(0, texture.tex);

    cgl.currentTextureEffect.finish();
    cgl.popShader();

    trigger.trigger();
};