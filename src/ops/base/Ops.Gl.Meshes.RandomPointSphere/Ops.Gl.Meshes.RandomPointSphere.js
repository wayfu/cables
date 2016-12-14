op.name="RandomPointSphere";

var exe=op.inFunction("Render");
var num=op.inValue("Num",1000);
var size=op.inValue("Size",1);
var seed=op.inValue("Seed",0);
var distRand=op.inValueSlider("Distance Random",0);

var distrib=op.inValueSelect('Distribution',["Uniform","Poles","Half"]);

var outGeom=op.outObject("Geometry");

var cgl=op.patch.cgl;
var mesh=null;

seed.onChange=reset;
num.onChange=reset;
size.onChange=reset;
distrib.onChange=reset;
distRand.onChange=reset;

exe.onTriggered=doRender;

reset();

function doRender()
{
    if(mesh) mesh.render(cgl.getShader());
}

function reset()
{
    var geom=new CGL.Geometry();
    var verts=[];
    var texCoords=[];
    var vertColors=[];
    verts.length=Math.round(num.get())*3;
    texCoords.length=Math.round(num.get())*2;
    vertColors.length=Math.round(num.get())*3;
    
    Math.randomSeed=seed.get();

    var sizeMul=size.get();
    var rndq = quat.create();
    var tempv = vec3.create();
    
    var dist=0;
    if(distrib.get()=="Poles")dist=1;
    if(distrib.get()=="Half")dist=2;
    
    var dRand=distRand.get();

    for(var i=0;i<num.get();i++)
    {
        if(dist==1 || dist==2)
        {
            rndq[0]=Math.seededRandom();
            rndq[1]=Math.seededRandom();
            rndq[2]=Math.seededRandom();
            rndq[3]=Math.seededRandom();
        }
        else
        {
            rndq[0]=Math.seededRandom()*2.0-1.0;
            rndq[1]=Math.seededRandom()*2.0-1.0;
            rndq[2]=Math.seededRandom()*2.0-1.0;
            rndq[3]=Math.seededRandom()*2.0-1.0;
        }

        quat.normalize(rndq,rndq);

        if(dist==2)
        {
            tempv[0]=size.get();
        }
        else
        {
            if(i%2===0) tempv[0]=-size.get();
                else tempv[0]=size.get();
        }

        tempv[1]=0;
        tempv[2]=0;
        
        if(dRand!==0) tempv[0]-=Math.random()*dRand;

        vec3.transformQuat(tempv, tempv, rndq) ;
        verts[i*3]=tempv[0];
        verts[i*3+1]=tempv[1];
        verts[i*3+2]=tempv[2];

        texCoords[i*2]=Math.seededRandom();
        texCoords[i*2+1]=Math.seededRandom();
    }
    
    geom.setPointVertices(verts);
    geom.vertColors=vertColors;
    geom.texCoords=texCoords;
    outGeom.set(null);
    outGeom.set(geom);

    if(mesh) mesh.setGeom(geom);
        else mesh =new CGL.Mesh(cgl,geom,cgl.gl.POINTS);

    mesh.addVertexNumbers=true;
    mesh.setGeom(geom);
}

