#ifdef HAS_TEXTURES
  IN vec2 texCoord;
  UNI sampler2D tex;
#endif
UNI float axis;
UNI float width;
UNI float flip;
UNI float offset;

void main()
{
   vec4 col=vec4(1.0,0.0,0.0,1.0);
   #ifdef HAS_TEXTURES

       float tc=texCoord.x;
       if(axis==1.0) tc=(texCoord.y);

       float x=(tc);
       if(tc>=0.5)x=1.0-tc;

       x*=width*2.0;
       if(flip==1.0)x=1.0-x;
       x*=1.0-offset;

       if(axis==1.0) col=texture2D(tex,vec2(texCoord.x,x) );
           else col=texture2D(tex,vec2(x,texCoord.y) );
   #endif
   gl_FragColor = col;
}