const float PHI = 1.618,
    pi = 3.14159;

// Originally from https://www.shadertoy.com/view/lllXz4
// Modified by fizzer to put out the vector q.
// Modified by NR4 to reduce size.
// Inverse spherical fibonacci mapping tech by las/mercury
vec2 inverseSF( vec3 p, float n, out vec3 outq ) 
{
    float m = 1. - 1./n,
        phi = min(atan(p.y, p.x), pi), cosTheta = p.z,
        k  = max(2., floor( log(n * pi * sqrt(5.) * (1.0 - cosTheta*cosTheta))/ log(PHI+1.))),
        Fk = pow(PHI, k)/sqrt(5.0),
        d,j;
    vec2  F  = vec2( round(Fk), round(Fk * PHI) ),
        ka = 2.*F/n,
        kb = 2.*pi*( fract((F+1.0)*PHI) - (PHI-1.) ),
        c;    
    mat2 iB = mat2( ka.y, -ka.x, kb.y, -kb.x ) / (ka.y*kb.x - ka.x*kb.y);
    
    c = floor( iB * vec2(phi, cosTheta - m));
    d = 8.;
    j = 0.;
    for( int s=0; s<4; s++ ) 
    {
        vec2 uv = vec2( float(s-2*(s/2)), float(s/2) );
        
        float i = round(dot(F, uv + c)),
            phi = 2.0*pi*fract(i*PHI),
            cosTheta = m - 2.0*i/n,
            sinTheta = sqrt(1.0 - cosTheta*cosTheta);
        vec3 q = vec3( cos(phi)*sinTheta, sin(phi)*sinTheta, cosTheta );
        float squaredDistance = dot(q-p, q-p);
        
        if (squaredDistance < d) 
        {
            outq = q;
            d = squaredDistance;
            j = i;
        }
    }
    return vec2( j, sqrt(d) );
}
