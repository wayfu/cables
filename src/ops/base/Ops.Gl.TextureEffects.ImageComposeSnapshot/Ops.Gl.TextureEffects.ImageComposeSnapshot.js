const
    render = op.inTrigger("Update"),
    trigger = op.outTrigger("trigger"),
    outTex = op.outTexture("Texture");

const cgl = op.patch.cgl;
let tc = new CGL.CopyTexture(cgl, "textureThief", {});
let fp = false;

render.onTriggered = () =>
{
    if (!CGL.TextureEffect.checkOpInEffect(op)) return;

    const effect = cgl.currentTextureEffect;
    effect.endEffect();

    const shouldFp = cgl.currentTextureEffect.getCurrentSourceTexture().isFloatingPoint();

    if (fp != shouldFp)
    {
        tc = new CGL.CopyTexture(cgl, "textureThief",
            {
                "isFloatingPointTexture": shouldFp
            });
        fp = shouldFp;
    }

    const vp = cgl.getViewPort();
    outTex.set(CGL.Texture.getEmptyTexture(cgl));
    outTex.set(tc.copy(cgl.currentTextureEffect.getCurrentSourceTexture()));

    effect.startEffect(cgl.currentTextureEffect.getCurrentSourceTexture());

    trigger.trigger();
};