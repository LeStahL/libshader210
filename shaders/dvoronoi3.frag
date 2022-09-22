const vec3 c = vec3(1.,0.,-1.);

//[
vec3 hash33(vec3 p);
//]

// 3D voronoi
vec4 dvoronoi3(vec3 x)
{
    float n,
        ret = 1.,
        df = 10.,
        d;
    vec3 y = floor(x),
        pf=c.yyy, 
        p;
    
    for(int i=-1; i<=1; i+=1)
        for(int j=-1; j<=1; j+=1)
            for(int k=-1; k<=1; k+=1)
            {
                p = y + vec3(float(i), float(j), float(k));
                p += hash33(p);

                d = length(x-p);

                if(d < df)
                {
                    df = d;
                    pf = p;
                }
            }
    for(int i=-1; i<=1; i+=1)
        for(int j=-1; j<=1; j+=1)
            for(int k=-1; k<=1; k+=1)
            {
                p = y + vec3(float(i), float(j), float(k));
                p += hash33(p);

                vec3 o = p - pf;
                d = length(.5*o-dot(x-pf, o)/dot(o,o)*o);
                ret = min(ret, d);
            }
        
    return vec4(ret, pf);
}