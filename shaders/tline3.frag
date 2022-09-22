// 3D line nearest parameter
float tline3(vec3 x, vec3 p1, vec3 p2)
{
    vec3 da = p2-p1;
    return clamp(dot(x-p1, da)/dot(da,da),0.,1.);
}
