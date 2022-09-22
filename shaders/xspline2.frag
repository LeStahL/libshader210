// 2D Point on a spline
vec2 xspline2(vec2 x, float t, vec2 p0, vec2 p1, vec2 p2)
{
    return mix(mix(p0,p1,t),mix(p1,p2,t),t);
}
