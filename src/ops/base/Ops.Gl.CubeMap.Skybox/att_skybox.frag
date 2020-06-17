#define PI 3.14159265358 //97932384626433832795
#define PI_TWO 2. * PI
#define RECIPROCAL_PI 1./PI
#define RECIPROCAL_PI2 RECIPROCAL_PI/2.

#ifdef TEX_FORMAT_CUBEMAP
    UNI samplerCube skybox;
    #ifndef WEBGL1
        #define SAMPLETEX texture
    #endif
    #ifdef WEBGL1
        #define SAMPLETEX textureCubeLodEXT
    #endif
#endif

#ifndef TEX_FORMAT_CUBEMAP
    #define TEX_FORMAT_EQUIRECT
    UNI sampler2D skybox;
    #ifdef WEBGL1
        #ifdef GL_EXT_shader_texture_lod
            #define textureLod texture2DLodEXT
        #endif
    #endif
    #define SAMPLETEX sampleEquirect

#endif

IN vec3 worldPos;

vec4 sampleEquirect(sampler2D tex, vec3 direction) {
    vec2 sampleUV;
    vec3 newDirection = normalize(direction);

    sampleUV.x = -1. * (atan( newDirection.z, newDirection.x ) * RECIPROCAL_PI2 + 0.75);
    sampleUV.y = asin( clamp(newDirection.y, -1., 1.) ) * RECIPROCAL_PI + 0.5;

    return texture(tex, sampleUV);
}

void main() {
    {{MODULE_BEGIN_FRAG}}
    vec4 col = vec4(1.);

    {{MODULE_COLOR}}

    vec3 newPos = worldPos;
    outColor = vec4(SAMPLETEX(skybox, worldPos));
    // outColor = vec4(1.,0.,0.,1.);
}
