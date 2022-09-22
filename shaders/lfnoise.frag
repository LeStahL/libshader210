const vec3 c = vec3(1.,0.,-1.);

//[
float hash12(vec2 p);
//]

// Low-Frequency noise (value-type)
float lfnoise(vec2 t)
{
    vec2 i = floor(t);
    t = fract(t);
    t = smoothstep(c.yy, c.xx, t);
    vec2 v1 = vec2(hash12(i), hash12(i+c.xy)), 
        v2 = vec2(hash12(i+c.yx), hash12(i+c.xx));
    v1 = c.zz+2.*mix(v1, v2, t.y);
    return mix(v1.x, v1.y, t.x);
}
