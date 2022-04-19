IN vec2 texCoord;
UNI sampler2D tex;

UNI float amount;
UNI float size;
UNI float inner;
UNI float fadeOut;

UNI float r;
UNI float g;
UNI float b;
UNI float a;
UNI float aspect;
UNI vec2 stretch;


UNI float x;
UNI float y;

{{CGL.BLENDMODES3}}

float dist(float x,float y,float x2,float y2)
{
	float xd = x2-x;
	float yd = y2-y;
	return abs(sqrt(xd*xd*(1.0-stretch.x) + yd*yd*(1.0-stretch.y)));
}

void main()
{
    vec4 base=texture(tex,texCoord);
    vec4 col=vec4(r,g,b,1.0);
    float dist = dist(x,y*aspect,(texCoord.x-0.5)*2.0,(texCoord.y-0.5)*2.0*aspect);

    float sz=size*0.5*aspect;
    float v=0.0;
    float fade=fadeOut+0.001;

    if(dist<sz && dist>inner*sz) v=(smoothstep(0.0,1.0,(dist-(inner*sz))/(fade)) );

    #ifdef FALLOFF_SMOOTHSTEP
        if(dist>sz && dist<sz+fade)v=1.0-(smoothstep(0.0,1.0,(dist-sz)/(fade)) );
    #endif
    #ifndef FALLOFF_SMOOTHSTEP
        if(dist>sz && dist<sz+fade)v=1.0-((dist-sz)/(fade));
    #endif

    // col=vec4( _blend(base.rgb,vec3(r,g,b)) ,1.0);
    // col=vec4( mix( col.rgb, base.rgb ,1.0-base.a*v*amount*a),1.0);
    // outColor=col;

    outColor=cgl_blendPixel(base,col,amount*v);


    #ifdef WARN_OVERFLOW
        float width=0.01;
        if( texCoord.x>(1.0-width) || texCoord.y>(1.0-width) || texCoord.y<width || texCoord.x<width )
            if(v>0.001*amount)outColor= vec4(1.0,0.0,0.0, 1.0);
    #endif
}
