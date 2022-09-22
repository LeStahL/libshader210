// Use this by plugging o-x0 into x.
// Analytical box distance.
vec2 abox3(vec3 x, vec3 dir, vec3 s)
{
    vec3 a = (s-x)/dir, 
        b = -(s+x)/dir,
        dn = min(a,b),
        df = max(a,b);
    return vec2(
        all(lessThan(abs(x + dn.y * dir).zx,s.zx)) 
            ? dn.y 
            : all(lessThan(abs(x + dn.x * dir).yz,s.yz)) 
                ? dn.x 
                : all(lessThan(abs(x + dn.z * dir).xy,s.xy)) 
                    ? dn.z
                    : -1.,
        all(lessThan(abs(x + df.y * dir).zx,s.zx)) 
            ? df.y 
            : all(lessThan(abs(x + df.x * dir).yz,s.yz)) 
                ? df.x 
                : all(lessThan(abs(x + df.z * dir).xy,s.xy)) 
                    ? df.z 
                    : -1.
    );
}
