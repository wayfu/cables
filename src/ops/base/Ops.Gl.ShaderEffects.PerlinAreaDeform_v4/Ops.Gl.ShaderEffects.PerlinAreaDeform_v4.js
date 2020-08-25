const
    render = op.inTrigger("render"),
    next = op.outTrigger("trigger"),
    inScale = op.inValueFloat("Scale", 1),
    inSize = op.inValueFloat("Size", 1),
    inStrength = op.inValueFloat("Strength", 1),
    inCalcNormals = op.inValueBool("Calc Normals", false),
    inFalloff = op.inValueSlider("Falloff", 0.5),
    output = op.inValueSelect("Output", ["Mul Normal", "Add XYZ", "Add X", "Add Y", "Add Z"], "Add XYZ"),
    x = op.inValueFloat("x"),
    y = op.inValueFloat("y"),
    z = op.inValueFloat("z"),
    scrollx = op.inValueFloat("Scroll X"),
    scrolly = op.inValueFloat("Scroll Y"),
    scrollz = op.inValueFloat("Scroll Z");

const cgl = op.patch.cgl;
inCalcNormals.onChange = updateCalcNormals;
const inWorldSpace = op.inValueBool("WorldSpace");

const moduleVert = null;
output.onChange = updateOutput;

const mscaleUni = null;
inWorldSpace.onChange = updateWorldspace;

const mod = new CGL.ShaderModifier(cgl, op.name);
mod.addModule({
    "title": op.objName,
    "name": "MODULE_VERTEX_POSITION",
    "srcHeadVert": attachments.perlindeform_vert,
    "srcBodyVert": attachments.perlindeform_body_vert
});


mod.addUniformVert("f", "MOD_size", inSize);
mod.addUniformVert("f", "MOD_strength", inStrength);
mod.addUniformVert("f", "MOD_scale", inScale);

mod.addUniformVert("f", "MOD_scrollx", scrollx);
mod.addUniformVert("f", "MOD_scrolly", scrolly);
mod.addUniformVert("f", "MOD_scrollz", scrollz);

mod.addUniformVert("f", "MOD_x", x);
mod.addUniformVert("f", "MOD_y", y);
mod.addUniformVert("f", "MOD_z", z);
mod.addUniformVert("f", "MOD_fallOff", inFalloff);

mod.addUniformVert("f", "MOD_mScale", 1);


updateOutput();
updateWorldspace();
updateCalcNormals();

function updateCalcNormals()
{
    mod.toggleDefine("MOD_CALC_NORMALS", inCalcNormals.get());
}


function updateWorldspace()
{
    mod.toggleDefine("MOD_WORLDSPACE", inWorldSpace.get());
}

function updateOutput()
{
    mod.toggleDefine("MOD_METH_ADD_XYZ", output.get() == "Add XYZ");
    mod.toggleDefine("MOD_METH_ADD_Z", output.get() == "Add Z");
    mod.toggleDefine("MOD_METH_ADD_Y", output.get() == "Add Y");
    mod.toggleDefine("MOD_METH_ADD_X", output.get() == "Add X");
    mod.toggleDefine("MOD_METH_MULNORM", output.get() == "Mul Normal");
}


function getScaling(mat)
{
    const m31 = mat[8];
    const m32 = mat[9];
    const m33 = mat[10];
    return Math.hypot(m31, m32, m33);
}

render.onTriggered = function ()
{
    if (!cgl.getShader())
    {
        next.trigger();
        return;
    }

    const modelScale = getScaling(cgl.mMatrix);
    if (mscaleUni)mscaleUni.setValue(modelScale);

    if (CABLES.UI)
    {
        cgl.pushModelMatrix();

        if (cgl.shouldDrawHelpers(op))
        {
            cgl.pushModelMatrix();
            mat4.translate(cgl.mMatrix, cgl.mMatrix, [x.get(), y.get(), z.get()]);
            CABLES.GL_MARKER.drawSphere(op, inSize.get());
            cgl.popModelMatrix();
        }

        if (op.isCurrentUiOp())
            gui.setTransformGizmo(
                {
                    "posX": x,
                    "posY": y,
                    "posZ": z
                });

        cgl.popModelMatrix();
    }


    mod.bind();
    next.trigger();
    mod.unbind();
};