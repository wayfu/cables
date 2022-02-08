
// float tx=mod(attrVertIndex,(MOD_texSize))/(MOD_texSize);
// float ty=float(int((attrVertIndex/(MOD_texSize))))/(MOD_texSize);

highp vec4 col=texture(MOD_tex,texCoord);//vec2(tx,ty));

// vec4 col=texture(MOD_tex,texCoord);

#ifdef MOD_HAS_PS_TEX
    psMul*=texture(MOD_texPointSize,texCoord).r;
    // psMul*=attrVertIndex/21000.0;
#endif

vec3 MOD_pos=col.xyz+pos.xyz;

#ifdef MOD_NORMALIZE
    MOD_pos=(MOD_pos.xyz-0.5)*2.0;
#endif

#ifdef MOD_AXIS_XYZ
    pos.xyz=MOD_pos.xyz+pos.xyz;
#endif

#ifdef MOD_AXIS_XY
    pos.xy=MOD_pos.xy+pos.xy;
    pos.z=0.0+pos.z;
    pos.w=1.0;
#endif
