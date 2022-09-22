
//[
vec2 xspline2(vec2 x, float t, vec2 p0, vec2 p1, vec2 p2);
//]

// 2D Distance to a point on a spline
float dspline2(vec2 x, float t, vec2 p0, vec2 p1, vec2 p2)
{
    return length(x - xspline2(x, t, p0, p1, p2));
}
