IN vec2 texCoord;
UNI sampler2D tex;
UNI sampler2D texPos;
UNI float strength;
UNI float falloff;
UNI float size;
UNI vec3 areaPos;
UNI vec3 scale;
UNI vec3 direction;

float MOD_sdSphere( vec3 p, float s )
{
    return length(p)-s;
}

float MOD_map(float value,float min1,float max1,float min2,float max2)
{
    return max(min2,min(max2,min2 + (value - min1) * (max2 - min2) / (max1 - min1)));
}

float MOD_sdRoundBox( vec3 p, vec3 b, float r )
{
  vec3 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0) - r;
}

void main()
{
    vec4 pos=texture(texPos,texCoord);
    vec4 col=texture(tex,texCoord);

    // col.xyz=(normalize(col.xyz)*mul)*fade+col.xyz*(1.0-fade);

    // if(pos.y<2.0)
    // col.g=1.0;
    // col.b=1.0;

    // float mul=clamp(abs(length(areaPos-pos.xyz)),0.0,size)/size;

    vec3 p=pos.xyz-areaPos;

    #ifdef MOD_AREA_SPHERE
        float MOD_de=MOD_sdSphere(p,size);
    #endif

    #ifdef MOD_AREA_BOX
        float MOD_de=MOD_sdRoundBox(p,scale,0.0);
    #endif

MOD_de=1.0-MOD_map(
    MOD_de,
    0.0, falloff,
    0.0,1.0
    );

    // mul=clamp(mul,0.0,1.0);

    #ifdef METHOD_DIR
        col.xyz+=normalize(direction)*strength*MOD_de;
    #endif

    #ifdef METHOD_POINT
        col.xyz+=normalize( pos.xyz-areaPos )*strength*MOD_de;
    #endif



    outColor=col;
}
