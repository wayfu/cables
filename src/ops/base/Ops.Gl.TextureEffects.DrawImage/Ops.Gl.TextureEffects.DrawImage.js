var render=op.addInPort(new Port(op,"render",OP_PORT_TYPE_FUNCTION));
var amount=op.addInPort(new Port(op,"amount",OP_PORT_TYPE_VALUE,{ display:'range' }));

var image=op.addInPort(new Port(op,"image",OP_PORT_TYPE_TEXTURE,{preview:true }));
var blendMode=CGL.TextureEffect.AddBlendSelect(op,"blendMode");

var imageAlpha=op.addInPort(new Port(op,"imageAlpha",OP_PORT_TYPE_TEXTURE,{preview:true }));
var alphaSrc=op.inValueSelect("alphaSrc",['alpha channel','luminance']);
var removeAlphaSrc=op.addInPort(new Port(op,"removeAlphaSrc",OP_PORT_TYPE_VALUE,{ display:'bool' }));

var invAlphaChannel=op.addInPort(new Port(op,"invert alpha channel",OP_PORT_TYPE_VALUE,{ display:'bool' }));


var trigger=op.addOutPort(new Port(op,"trigger",OP_PORT_TYPE_FUNCTION));

blendMode.set('normal');
var cgl=op.patch.cgl;
var shader=new CGL.Shader(cgl,'drawimage');

amount.set(1.0);




var srcFrag=attachments.drawimage_frag.replace('{{BLENDCODE}}',CGL.TextureEffect.getBlendCode());


shader.setSource(attachments.drawimage_vert,srcFrag);
var textureUniform=new CGL.Uniform(shader,'t','tex',0);
var textureDisplaceUniform=new CGL.Uniform(shader,'t','image',1);
var textureAlpha=new CGL.Uniform(shader,'t','imageAlpha',2);

invAlphaChannel.onValueChanged=function()
{
    if(invAlphaChannel.get()) shader.define('INVERT_ALPHA');
        else shader.removeDefine('INVERT_ALPHA');
};

removeAlphaSrc.onValueChanged=function()
{
    if(removeAlphaSrc.get()) shader.define('REMOVE_ALPHA_SRC');
        else shader.removeDefine('REMOVE_ALPHA_SRC');
};
removeAlphaSrc.set(true);

alphaSrc.onValueChanged=function()
{
    if(alphaSrc.get()=='luminance') shader.define('ALPHA_FROM_LUMINANCE');
        else shader.removeDefine('ALPHA_FROM_LUMINANCE');
};

alphaSrc.set("alpha channel");


{
    //
    // texture flip
    //
    var flipX=op.addInPort(new Port(op,"flip x",OP_PORT_TYPE_VALUE,{ display:'bool' }));
    var flipY=op.addInPort(new Port(op,"flip y",OP_PORT_TYPE_VALUE,{ display:'bool' }));

    flipX.onValueChanged=function()
    {
        if(flipX.get()) shader.define('TEX_FLIP_X');
            else shader.removeDefine('TEX_FLIP_X');
    };

    flipY.onValueChanged=function()
    {
        if(flipY.get()) shader.define('TEX_FLIP_Y');
            else shader.removeDefine('TEX_FLIP_Y');
    };
}

{
    //
    // texture transform
    //
    var scale=op.addInPort(new Port(op,"scale",OP_PORT_TYPE_VALUE,{ display:'range' }));
    var posX=op.addInPort(new Port(op,"pos x",OP_PORT_TYPE_VALUE, {}));
    var posY=op.addInPort(new Port(op,"pos y",OP_PORT_TYPE_VALUE, {}));
    var rotate=op.addInPort(new Port(op,"rotate",OP_PORT_TYPE_VALUE, {}));

    scale.set(1.0);

    var uniScale=new CGL.Uniform(shader,'f','scale',scale.get());
    var uniPosX=new CGL.Uniform(shader,'f','posX',posX.get());
    var uniPosY=new CGL.Uniform(shader,'f','posY',posY.get());
    var uniRotate=new CGL.Uniform(shader,'f','rotate',rotate.get());

    function updateTransform()
    {
        if(scale.get()!=1.0 || posX.get()!=0.0 || posY.get()!=0.0 || rotate.get()!=0.0 )
        {
            if(!shader.hasDefine('TEX_TRANSFORM')) shader.define('TEX_TRANSFORM');
            uniScale.setValue( parseFloat(scale.get()) );
            uniPosX.setValue( posX.get() );
            uniPosY.setValue( posY.get() );
            uniRotate.setValue( rotate.get() );
        }
        else
        {
            // shader.removeDefine('TEX_TRANSFORM');
        }
    }

    scale.onChange=updateTransform;
    posX.onChange=updateTransform;
    posY.onChange=updateTransform;
    rotate.onChange=updateTransform;
}

blendMode.onValueChanged=function()
{
    CGL.TextureEffect.onChangeBlendSelect(shader,blendMode.get());
};


var amountUniform=new CGL.Uniform(shader,'f','amount',amount);

var oldHadImageAlpha=false;


function doRender()
{
    if(!CGL.TextureEffect.checkOpInEffect(op)) return;


    if(imageAlpha.get() && !oldHadImageAlpha || !imageAlpha.get() && oldHadImageAlpha)
    {
        if(imageAlpha.get() && imageAlpha.get().tex)
        {
            shader.define('HAS_TEXTUREALPHA');
            oldHadImageAlpha=true;
        }
        else
        {
            shader.removeDefine('HAS_TEXTUREALPHA');
            oldHadImageAlpha=false;
        }
        
    }



    if(image.get() && image.get().tex && amount.get()>0.0)
    {
        cgl.setShader(shader);
        cgl.currentTextureEffect.bind();

        cgl.gl.activeTexture(cgl.gl.TEXTURE0);
        cgl.gl.bindTexture(cgl.gl.TEXTURE_2D, cgl.currentTextureEffect.getCurrentSourceTexture().tex );

        cgl.gl.activeTexture(cgl.gl.TEXTURE1);
        if(image.get() && image.get().tex) cgl.gl.bindTexture(cgl.gl.TEXTURE_2D, image.get().tex );
            else cgl.gl.bindTexture(cgl.gl.TEXTURE_2D, null);

        cgl.gl.activeTexture(cgl.gl.TEXTURE2);
        if(imageAlpha.get() && imageAlpha.get().tex) cgl.gl.bindTexture(cgl.gl.TEXTURE_2D, imageAlpha.get().tex );
            else cgl.gl.bindTexture(cgl.gl.TEXTURE_2D, null);

        cgl.currentTextureEffect.finish();
        cgl.setPreviousShader();
    }

    trigger.trigger();
}

render.onTriggered=doRender;
