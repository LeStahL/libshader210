
//[
vec3 cubic_zeros(vec4 k);
vec2 quadratic_zeros(vec3 k);
//]

// Determine zeros of a*x^4+b*x^3+c*x^2+d*x+e
vec4 quartic_zeros(float a, float b, float cc, float d, float e) {
    if(a == 0.) return cubic_zeros(vec4(b, cc, d, e)).xyzz;
    
    // Depress
    float _b = b/a,
        _c = cc/a,
        _d = d/a,
        _e = e/a;
        
    // Helpers
    float p = (8.*_c-3.*_b*_b)/8.,
        q = (_b*_b*_b-4.*_b*_c+8.*_d)/8.,
        r = (-3.*_b*_b*_b*_b+256.*_e-64.*_b*_d+16.*_b*_b*_c)/256.;
        
    // Determine available resolvent zeros
    vec3 res = cubic_zeros(vec4(8.,8.*p,2.*p*p-8.*r,-q*q));
    
    // Find nonzero resolvent zero
    float m = res.x;
    if(m == 0.) m = res.y;
    if(m == 0.) m = res.z;
    
    // Apply Ferrari method
    return vec4(
        quadratic_zeros(vec3(1.,sqrt(2.*m),p/2.+m-q/(2.*sqrt(2.*m)))),
        quadratic_zeros(vec3(1.,-sqrt(2.*m),p/2.+m+q/(2.*sqrt(2.*m))))
    )-_b/4.;
}