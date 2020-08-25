const
    render = op.inTrigger("Render"),
    inWidth = op.inFloat("Width", 0.2),
    inPerspective = op.inBool("Width Perspective", true),
    inTexture = op.inTexture("Texture"),
    inTextureMask = op.inTexture("Texture Mask"),
    inTexMap = op.inSwitch("Mapping", ["Full", "Face"], "Full"),
    inTexColorize = op.inBool("Colorize Texture", false),
    inTexOffset = op.inFloat("Offset", 0),
    r = op.inValueSlider("r", Math.random()),
    g = op.inValueSlider("g", Math.random()),
    b = op.inValueSlider("b", Math.random()),
    a = op.inValueSlider("a", 1),
    trigger = op.outTrigger("Trigger"),
    shaderOut = op.outObject("Shader");

r.setUiAttribs({ "colorPick": true });
shaderOut.ignoreValueSerialize = true;

const cgl = op.patch.cgl;

op.toWorkPortsNeedToBeLinked(render);
op.setPortGroup("Color", [r, g, b, a]);
op.setPortGroup("Texture", [inTexture, inTexMap, inTexColorize]);

const shader = new CGL.Shader(cgl, "splinemesh_material");
shader.setModules(["MODULE_VERTEX_POSITION", "MODULE_COLOR", "MODULE_BEGIN_FRAG"]);
shader.setSource(attachments.splinemat_vert, attachments.splinemat_frag);
shaderOut.set(shader);

const uniTex = shader.addUniformFrag("t", "tex", inTexture);
const uniTexMask = shader.addUniformFrag("t", "texMask", inTextureMask);

shader.addUniformFrag("4f", "color", r, g, b, a);
shader.addUniformFrag("f", "width", inWidth);
shader.addUniformFrag("f", "texOffset", inTexOffset);
shader.toggleDefine("PERSPWIDTH", inPerspective);
shader.toggleDefine("USE_TEXTURE", inTexture);
shader.toggleDefine("TEX_COLORIZE", inTexColorize);

inTexMap.on("change", updateMapping);

render.onTriggered = doRender;
updateMapping();

inTextureMask.onChange = function ()
{
    shader.toggleDefine("USE_TEXMASK", inTextureMask.get());
};

function doRender()
{
    if (!shader) return;

    cgl.pushShader(shader);
    shader.popTextures();

    if (uniTex && inTexture.get()) shader.pushTexture(uniTex, inTexture.get());
    if (uniTexMask && inTextureMask.get()) shader.pushTexture(uniTexMask, inTextureMask.get());

    trigger.trigger();

    cgl.popShader();
}

function updateMapping()
{
    shader.toggleDefine("TEX_MAP_FULL", inTexMap.get() === "Full");
}