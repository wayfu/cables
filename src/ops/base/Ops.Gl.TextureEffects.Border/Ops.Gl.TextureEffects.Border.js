op.name='border';

var render=op.addInPort(new Port(op,"render",OP_PORT_TYPE_FUNCTION));

var trigger=op.addOutPort(new Port(op,"trigger",OP_PORT_TYPE_FUNCTION));
var smooth=op.inValueBool("Smooth",false);

var cgl=op.patch.cgl;
var shader=new CGL.Shader(cgl);


shader.setSource(shader.getDefaultVertexShader(),attachments.border_frag);
var textureUniform=new CGL.Uniform(shader,'t','tex',0);
var aspectUniform=new CGL.Uniform(shader,'f','aspect',0);
var uniSmooth=new CGL.Uniform(shader,'b','smoothed',smooth);

{
    var width=op.addInPort(new Port(op,"width",OP_PORT_TYPE_VALUE,{display:'range'}));
    width.set(0.1);

    var uniWidth=new CGL.Uniform(shader,'f','width',width.get());

    width.onValueChange(function()
    {
        uniWidth.setValue(width.get()/2 );
    });
}

{
    // diffuse color

    var r=op.addInPort(new Port(op,"diffuse r",OP_PORT_TYPE_VALUE,{ display:'range', colorPick:'true' }));
    r.onValueChanged=function()
    {
        if(!r.uniform) r.uniform=new CGL.Uniform(shader,'f','r',r.get());
            else r.uniform.setValue(r.get());
    };

    var g=op.addInPort(new Port(op,"diffuse g",OP_PORT_TYPE_VALUE,{ display:'range' }));
    g.onValueChanged=function()
    {
        if(!g.uniform) g.uniform=new CGL.Uniform(shader,'f','g',g.get());
            else g.uniform.setValue(g.get());
    };

    var b=op.addInPort(new Port(op,"diffuse b",OP_PORT_TYPE_VALUE,{ display:'range' }));
    b.onValueChanged=function()
    {
        if(!b.uniform) b.uniform=new CGL.Uniform(shader,'f','b',b.get());
            else b.uniform.setValue(b.get());
    };


    r.set(Math.random());
    g.set(Math.random());
    b.set(Math.random());

}



render.onTriggered=function()
{
    if(!CGL.TextureEffect.checkOpInEffect(op)) return;

var texture=cgl.currentTextureEffect.getCurrentSourceTexture();
aspectUniform.set(texture.height/texture.width);

    cgl.setShader(shader);
    cgl.currentTextureEffect.bind();

    cgl.gl.activeTexture(cgl.gl.TEXTURE0);
    cgl.gl.bindTexture(cgl.gl.TEXTURE_2D, texture.tex );

    cgl.currentTextureEffect.finish();
    cgl.setPreviousShader();

    trigger.trigger();
};
