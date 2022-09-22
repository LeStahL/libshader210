//[
vec3 xspline3(vec3 x, float t, vec3 p0, vec3 p1, vec3 p2);
//]

// 3D Distance to a point on a spline
float dspline3(vec3 x, float t, vec3 p0, vec3 p1, vec3 p2)
{
    return length(x - xspline3(x, t, p0, p1, p2));
}
