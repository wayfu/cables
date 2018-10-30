op.name='Lines';

var render=op.addInPort(new CABLES.Port(op,"render",CABLES.OP_PORT_TYPE_FUNCTION));
var pointSize=op.addInPort(new CABLES.Port(op,"pointSize"));
var mode=op.addInPort(new CABLES.Port(op,"Draw Mode",CABLES.OP_PORT_TYPE_VALUE ,{
    display:'dropdown',values:['Line Strip','Line Loop','Lines']} ));

var trigger=op.addOutPort(new CABLES.Port(op,"trigger",CABLES.OP_PORT_TYPE_FUNCTION));

pointSize.set(2);

var cgl=op.patch.cgl;
var shader=null;
var mod=null;
var uniPointSize=null;
var drawMode=cgl.gl.LINE_STRIP;

mode.onChange=function()
{
    drawMode=cgl.gl.LINES;
    if(mode.get()=='Line Loop')drawMode=cgl.gl.LINE_LOOP;
        else if(mode.get()=='Lines')drawMode=cgl.gl.LINES;
        else drawMode=cgl.gl.LINE_STRIP;
};

pointSize.onChange=function()
{
    if(uniPointSize)uniPointSize.setValue(pointSize.get());
};

render.onTriggered=function()
{
    var oldPrim=0;
    // if(cgl.getShader()!=shader)
    // {
    //     if(shader && mod)
    //     {
    //         shader.removeModule(mod);
    //         shader=null;
    //     }

    //     shader=cgl.getShader();

    //     var srcHeadVert=''
    //         .endl()+'uniform float {{mod}}_size;'
    //         .endl();

    //     mod=shader.addModule(
    //         {
    //             name:'MODULE_VERTEX_POSITION',
    //             srcHeadVert:srcHeadVert,
    //         });

    //     uniPointSize=new CGL.Uniform(shader,'f',mod.prefix+'_size',pointSize.get());

    // }

    shader=cgl.getShader();
    if(shader)
    {
        oldPrim=shader.glPrimitive;
        
        shader.glPrimitive=drawMode;
    
        cgl.gl.lineWidth(pointSize.get());
        trigger.trigger();
    
        shader.glPrimitive=oldPrim;
    }
};

function updateResolution()
{
}

op.onResize=updateResolution;
pointSize.set(2);
