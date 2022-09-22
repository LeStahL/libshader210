// 2D line nearest parameter
float tline2(vec2 x, vec2 p1, vec2 p2)
{
    vec2 da = p2-p1;
    return clamp(dot(x-p1, da)/dot(da,da),0.,1.);
}
