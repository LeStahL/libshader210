
//[
vec2 quadratic_zeros(vec3 k);
//]

// Use this by plugging o-x0 into x.
// Analytical sphere distance.
vec2 asphere(vec3 x, vec3 dir, float R)
{
    vec2 dd = quadratic_zeros(vec3(dot(dir,dir),2.*dot(x,dir),dot(x,x)-R*R));
    return vec2(min(dd.x, dd.y), max(dd.x, dd.y));
}
