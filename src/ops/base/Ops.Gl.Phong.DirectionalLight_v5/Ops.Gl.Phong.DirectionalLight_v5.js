const cgl = op.patch.cgl;

// * OP START *
const inTrigger = op.inTrigger("Trigger In");

const inCastLight = op.inBool("Cast Light", true);
const inIntensity = op.inFloat("Intensity", 1);
const attribIns = [inCastLight, inIntensity];
op.setPortGroup("Light Attributes", attribIns);

const inPosX = op.inFloat("X", 0);
const inPosY = op.inFloat("Y", 3);
const inPosZ = op.inFloat("Z", 5);

const positionIn = [inPosX, inPosY, inPosZ];
op.setPortGroup("Direction", positionIn);

const inR = op.inFloat("R", 1);
const inG = op.inFloat("G", 1);
const inB = op.inFloat("B", 1);

inR.setUiAttribs({ "colorPick": true });
const colorIn = [inR, inG, inB];
op.setPortGroup("Color", colorIn);

const inSpecularR = op.inFloat("Specular R", 0.2);
const inSpecularG = op.inFloat("Specular G", 0.2);
const inSpecularB = op.inFloat("Specular B", 0.2);

inSpecularR.setUiAttribs({ "colorPick": true });
const colorSpecularIn = [inSpecularR, inSpecularG, inSpecularB];
op.setPortGroup("Specular Color", colorSpecularIn);


const inCastShadow = op.inBool("Cast Shadow", false);
const inRenderMapActive = op.inBool("Rendering Active", true);
const inMapSize = op.inSwitch("Map Size", [256, 512, 1024, 2048], 512);
const inShadowStrength = op.inFloatSlider("Shadow Strength", 1);
const inLRBT = op.inFloat("LR-BottomTop", 8);
const inNear = op.inFloat("Near", 0.1);
const inFar = op.inFloat("Far", 30);
const inBias = op.inFloatSlider("Bias", 0.004);
const inPolygonOffset = op.inInt("Polygon Offset", 0);
const inNormalOffset = op.inFloatSlider("Normal Offset", 0);
const inBlur = op.inFloatSlider("Blur Amount", 0);
op.setPortGroup("", [inCastShadow]);
op.setPortGroup("Shadow Map Settings", [inMapSize, inRenderMapActive, inShadowStrength, inLRBT, inNear, inFar, inBias, inPolygonOffset, inNormalOffset, inBlur]);

inMapSize.setUiAttribs({ "greyout": true });
inRenderMapActive.setUiAttribs({ "greyout": true });
inShadowStrength.setUiAttribs({ "greyout": true });
inLRBT.setUiAttribs({ "greyout": true, "hidePort": true });
inNear.setUiAttribs({ "greyout": true, "hidePort": true });
inFar.setUiAttribs({ "greyout": true, "hidePort": true });
inBias.setUiAttribs({ "greyout": true, "hidePort": true });
inNormalOffset.setUiAttribs({ "greyout": true, "hidePort": true });
inPolygonOffset.setUiAttribs({ "greyout": true, "hidePort": true });
inBlur.setUiAttribs({ "greyout": true });

const inAdvanced = op.inBool("Enable Advanced", false);
const inMSAA = op.inSwitch("MSAA", ["none", "2x", "4x", "8x"], "none");
const inFilterType = op.inSwitch("Texture Filter", ["Linear", "Nearest", "Mip Map"], "Linear");
const inAnisotropic = op.inSwitch("Anisotropic", [0, 1, 2, 4, 8, 16], "0");
inMSAA.setUiAttribs({ "greyout": true, "hidePort": true });
inFilterType.setUiAttribs({ "greyout": true, "hidePort": true });
inAnisotropic.setUiAttribs({ "greyout": true, "hidePort": true });
op.setPortGroup("Advanced Options", [inAdvanced, inMSAA, inFilterType, inAnisotropic]);

inAdvanced.onChange = function ()
{
    inMSAA.setUiAttribs({ "greyout": !inAdvanced.get() });
    inFilterType.setUiAttribs({ "greyout": !inAdvanced.get() });
    inAnisotropic.setUiAttribs({ "greyout": !inAdvanced.get() });
};

const outTrigger = op.outTrigger("Trigger Out");
const outTexture = op.outTexture("Shadow Map");


let texelSize = 1 / Number(inMapSize.get());

const newLight = new CGL.Light(cgl, {
    "type": "directional",
    "position": [0, 1, 2].map(function (i) { return positionIn[i].get(); }),
    "color": [0, 1, 2].map(function (i) { return colorIn[i].get(); }),
    "specular": [0, 1, 2].map(function (i) { return colorSpecularIn[i].get(); }),
    "intensity": inIntensity.get(),
    "castShadow": false,
    "shadowStrength": inShadowStrength.get(),
});
newLight.castLight = inCastLight.get();

newLight.createFramebuffer(Number(inMapSize.get()), Number(inMapSize.get()), {});
newLight.createShadowMapShader();
newLight.createBlurEffect({});
newLight.createBlurShader();

let updating = false;

function updateBuffers()
{
    updating = true;
    const MSAA = Number(inMSAA.get().charAt(0));

    let filterType = null;
    const anisotropyFactor = Number(inAnisotropic.get());

    if (inFilterType.get() == "Linear")
    {
        filterType = CGL.Texture.FILTER_LINEAR;
    }
    else if (inFilterType.get() == "Nearest")
    {
        filterType = CGL.Texture.FILTER_NEAREST;
    }
    else if (inFilterType.get() == "Mip Map")
    {
        filterType = CGL.Texture.FILTER_MIPMAP;
    }

    const mapSize = Number(inMapSize.get());
    const textureOptions = {
        "isFloatingPointTexture": true,
        "filter": filterType,
    };

    if (MSAA) Object.assign(textureOptions, { "multisampling": true, "multisamplingSamples": MSAA });
    Object.assign(textureOptions, { "anisotropic": anisotropyFactor });

    newLight.createFramebuffer(mapSize, mapSize, textureOptions);
    newLight.createBlurEffect(textureOptions);
    updating = false;
}

inMSAA.onChange = inAnisotropic.onChange = inFilterType.onChange = updateBuffers;

inMapSize.onChange = function ()
{
    const size = Number(inMapSize.get());
    texelSize = 1 / size;
    newLight.setFramebufferSize(Number(inMapSize.get()), Number(inMapSize.get()));
};

newLight.createProjectionMatrix(inLRBT.get(), inNear.get(), inFar.get(), null);


inR.onChange = inG.onChange = inB.onChange = inSpecularR.onChange = inSpecularG.onChange = inSpecularB.onChange
= inPosX.onChange = inPosY.onChange = inPosZ.onChange
= inBias.onChange = inIntensity.onChange = inCastLight.onChange = inShadowStrength.onChange = inNormalOffset.onChange = updateLightParameters;

let updateLight = false;
function updateLightParameters(param)
{
    updateLight = true;
}


inCastShadow.onChange = function ()
{
    updating = true;
    updateLight = true;

    const castShadow = inCastShadow.get();
    if (castShadow)
    {
        if (!newLight.hasFramebuffer())
        {
            const size = Number(inMapSize.get());
            newLight.createFramebuffer(size, size, {});
            newLight.createShadowMapShader();
            newLight.createBlurEffect({});
            newLight.createBlurShader();
        }
    }
    /* else
    {

    } */
    newLight.castShadow = castShadow;

    inMapSize.setUiAttribs({ "greyout": !castShadow });
    inRenderMapActive.setUiAttribs({ "greyout": !castShadow });
    inShadowStrength.setUiAttribs({ "greyout": !castShadow });
    inLRBT.setUiAttribs({ "greyout": !castShadow });
    inNear.setUiAttribs({ "greyout": !castShadow });
    inFar.setUiAttribs({ "greyout": !castShadow });
    inBlur.setUiAttribs({ "greyout": !castShadow });
    inBias.setUiAttribs({ "greyout": !castShadow });
    inNormalOffset.setUiAttribs({ "greyout": !castShadow });
    inPolygonOffset.setUiAttribs({ "greyout": !castShadow });

    updating = false;
};

const lightProjectionMatrix = mat4.create();
mat4.ortho(lightProjectionMatrix,
    -1 * inLRBT.get(),
    inLRBT.get(),
    -1 * inLRBT.get(),
    inLRBT.get(),
    inNear.get(),
    inFar.get()
);

inLRBT.onChange = inNear.onChange = inFar.onChange = function ()
{
    newLight.updateProjectionMatrix(inLRBT.get(), inNear.get(), inFar.get(), null);
};

function drawHelpers()
{
    if (cgl.frameStore.shadowPass) return;
    if (cgl.shouldDrawHelpers(op))
    {
        gui.setTransformGizmo({
            "posX": inPosX,
            "posY": inPosY,
            "posZ": inPosZ,
        });
        CABLES.GL_MARKER.drawLineSourceDest({
            "op": op,
            "sourceX": -200 * newLight.position[0],
            "sourceY": -200 * newLight.position[1],
            "sourceZ": -200 * newLight.position[2],
            "destX": 200 * newLight.position[0],
            "destY": 200 * newLight.position[1],
            "destZ": 200 * newLight.position[2],
        });
    }
}

let errorActive = false;
inTrigger.onTriggered = function ()
{
    if (updating) return;

    if (!cgl.frameStore.shadowPass)
    {
        if (!newLight.isUsed && !errorActive)
        {
            op.setUiError("lightUsed", "No operator is using this light. Make sure this op is positioned before an operator that uses lights. Also make sure there is an operator that uses lights after this.", 1); // newLight.isUsed = false;
            errorActive = true;
        }
        else if (!newLight.isUsed && errorActive) {}
        else if (newLight.isUsed && errorActive)
        {
            op.setUiError("lightUsed", null);
            errorActive = false;
        }
        else if (newLight.isUsed && !errorActive) {}
        newLight.isUsed = false;
    }

    if (updateLight)
    {
        newLight.color = [inR.get(), inG.get(), inB.get()];
        newLight.specular = [inSpecularR.get(), inSpecularG.get(), inSpecularB.get()];
        newLight.intensity = inIntensity.get();
        newLight.castLight = inCastLight.get();
        newLight.position = [inPosX.get(), inPosY.get(), inPosZ.get()];
        newLight.updateProjectionMatrix(inLRBT.get(), inNear.get(), inFar.get(), null);
        newLight.castShadow = inCastShadow.get();

        newLight.normalOffset = inNormalOffset.get();
        newLight.shadowBias = inBias.get();
        newLight.shadowStrength = inShadowStrength.get();
        updateLight = false;
    }


    if (!cgl.frameStore.lightStack) cgl.frameStore.lightStack = [];

    drawHelpers();


    cgl.frameStore.lightStack.push(newLight);


    if (inCastShadow.get())
    {
        const blurAmount = 1.5 * inBlur.get() * texelSize;
        if (inRenderMapActive.get()) newLight.renderPasses(inPolygonOffset.get(), blurAmount, function () { outTrigger.trigger(); });
        newLight.blurAmount = inBlur.get();
        outTexture.set(null);
        outTexture.set(newLight.getShadowMapDepth());
        // remove light from stack and readd it with shadow map & mvp matrix
        cgl.frameStore.lightStack.pop();

        cgl.frameStore.lightStack.push(newLight);
    }

    outTrigger.trigger();

    cgl.frameStore.lightStack.pop();
};