const float pi = 3.14159;
const vec3 c = vec3(1.,0.,-1.);

// Regular polygon distance
float dregularpolygon(in vec2 x, in float R, in float N)
{
    float p = atan(x.y,x.x),
        k = pi/N,
    	dp = mod(p+pi, 2.*k);
    
    vec2 p1 = R*c.xy,
        p2 = R*vec2(cos(2.*k),sin(2.*k)),
        dpp = p2-p1,
        n = normalize(p2-p1).yx*c.xz, 
        xp = length(x)*vec2(cos(dp), sin(dp));
    float t = dot(xp-p1,dpp)/dot(dpp,dpp);
    float r = dot(xp-p1,n);
    if(t < 0.)
        return sign(r)*length(xp-p1);
    else if(t > 1.)
        return sign(r)*length(xp-p2);
    else
	    return r;
}
