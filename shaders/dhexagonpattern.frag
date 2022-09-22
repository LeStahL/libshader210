// Based on the distance included in https://www.shadertoy.com/view/Xd2GR3,
// Heavily adapted for size-coding.
// Distance to hexagon pattern 
vec3 dhexagonpattern(vec2 p) 
{
    vec2 q = vec2( p.x*1.2, p.y+p.x*.6 ),
        pi = floor(q),
        pf = fract(q),
        ma,
		ind;

    float v = mod(pi.x+pi.y, 3.),
        ca = step(1.,v),
        cb = step(2.,v);

    ma = step(pf.xy,pf.yx);
    ind = (pi+ca-cb*ma)*vec2(1./1.2,1.);
	return vec3(dot(ma, 1.-pf.yx+ca*(pf.x+pf.y-1.)+cb*(pf.yx-2.*pf.xy)), vec2(ind.x, ind.y-ind.x*.6));
}
