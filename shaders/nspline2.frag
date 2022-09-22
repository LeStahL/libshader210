// 2D Normal in a point on a spline
vec2 nspline2(vec2 x, float t, vec2 p0, vec2 p1, vec2 p2)
{
    return normalize(mix(p1-p0, p2-p1, t));
}
