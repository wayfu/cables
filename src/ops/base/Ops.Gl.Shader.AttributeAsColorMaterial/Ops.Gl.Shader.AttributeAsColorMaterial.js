const
    render = op.inTrigger("render"),
    inAttr = op.inSwitch("Attribute", ["TexCoords", "Normals", "Tangents", "BiTangents"], "Normals"),
    inAbs = op.inBool("Absolute", false),
    inMulModel = op.inBool("World Space", false),
    trigger = op.outTrigger("trigger"),
    outShader = op.outObject("Shader");

const cgl = op.patch.cgl;
const shader = new CGL.Shader(cgl, op.name);

shader.setSource(attachments.normalsmaterial_vert, attachments.normalsmaterial_frag);
outShader.set(shader);
render.onTriggered = doRender;
updateAttr();
inMulModel.onChange = inAbs.onChange = inAttr.onChange = updateAttr;

function updateAttr()
{
    shader.toggleDefine("SHOW_NORMALS", inAttr.get() == "Normals");
    shader.toggleDefine("SHOW_TANGENTS", inAttr.get() == "Tangents");
    shader.toggleDefine("SHOW_BITANGENTS", inAttr.get() == "BiTangents");
    shader.toggleDefine("SHOW_TEXCOORDS", inAttr.get() == "TexCoords");

    shader.toggleDefine("ABS", inAbs.get());
    shader.toggleDefine("MULMODEL", inMulModel.get());
}

function doRender()
{
    cgl.pushShader(shader);
    trigger.trigger();
    cgl.popShader();
}