#version 300 es
precision highp float;

in vec2 vTextureCoord;

uniform sampler2D uTextureSampler;

out vec4 fragColor;

void main(void) {
    //gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    //fragColor = texture(uTextureSampler, vTextureCoord);

    // light calculation
    // float lightR1 = 100.0;
    // float lightR2 = 900.0;
    // vec4  lightPos = vec4(550.0, 400.0, 0.0, 0.0);
    // float dist = length(lightPos.xyz - gl_FragCoord.xyz);

    // float lightFactor = 1.0 - clamp((dist - lightR1)/(lightR2 - lightR1), 0.0, 1.0);

    // sepia filter
    vec4 oc = texture(uTextureSampler, vTextureCoord);
    vec3 rgb = oc.rgb;

    // sepia transformation matrix
    mat3 sepiaMatrix = mat3(
        0.393, 0.769, 0.189,
        0.349, 0.686, 0.168, 
        0.272, 0.534, 0.131
    );
    vec3 sepiaColor = clamp(rgb * sepiaMatrix, 0.0, 1.0);
    fragColor = vec4(sepiaColor, 1.0);

    // black and white filter
    //float v = (oc.r + oc.g + oc.b) / 3.0;
    //fragColor = vec4(v, v, v, 1.0);

    // light-factored texture
    //fragColor = texture(uTextureSampler, vTextureCoord) * lightFactor;

    // the original texture
    //fragColor = texture(uTextureSampler, vTextureCoord);
}
