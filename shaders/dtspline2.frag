
//[
vec3 cubic_zeros(vec4 k);
float dspline2(vec2 x, float t, vec2 p0, vec2 p1, vec2 p2);
//]

// Returns vec2(dmin, tmin).
// 2D spline parameter of the point with minimum distance on the spline and sdf
vec2 dtspline2(vec2 x, vec2 p0, vec2 p1, vec2 p2)
{
    vec2 E0 = x-p0, F0 = p2-2.*p1+p0, G0 = p1-p0;
    vec3 E = clamp(cubic_zeros(vec4(dot(F0,F0), 3.*dot(G0,F0), 2.*dot(G0,G0)-dot(E0,F0), -dot(E0,G0))),0.,1.),
        F = vec3(dspline2(x,E.x,p0,p1,p2),dspline2(x,E.y,p0,p1,p2),dspline2(x,E.z,p0,p1,p2));
    return F.x < F.y && F.x < F.z
        ? vec2(F.x, E.x)
        : F.y < F.x && F.y < F.z
            ? vec2(F.y, E.y)
            : vec2(F.z, E.z);
}
