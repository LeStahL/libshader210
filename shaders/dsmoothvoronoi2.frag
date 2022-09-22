// Smooth 2D voronoi
vec3 dsmoothvoronoi2(vec2 x, float k)
{
    float n,
        ret = 1.,
        df = 10.,
        d;
    vec2 y = floor(x),
        pf=c.yy, 
        p;
    
    for(int i=-1; i<=1; i+=1)
        for(int j=-1; j<=1; j+=1)
        {
            p = y + vec2(float(i), float(j));
            p += hash12(p);
            
            d = length(x-p);
            
            if(d < df)
            {
                df = d;
                pf = p;
            }
        }
    for(int i=-1; i<=1; i+=1)
        for(int j=-1; j<=1; j+=1)
        {
            p = y + vec2(float(i), float(j));
            p += hash12(p);
            
            vec2 o = p - pf;
            d = length(.5*o-dot(x-pf, o)/dot(o,o)*o);
            ret = blendPolynomial1(ret, d, k);
        }
        
    return vec3(ret, pf);
}
