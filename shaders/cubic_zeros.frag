const vec3 c = vec3(1.,0.,-1.);
const float pi = 3.14159;

//[
vec2 quadratic_zeros(vec3 p);
//]

// Determine zeros of k.x*x^3+k.y*x^2+k.z*x+k.w
vec3 cubic_zeros(vec4 k)
{
    if(k.x == 0.) return quadratic_zeros(k.yzw).xyy;
    
    // Depress
    vec3 ai = k.yzw/k.x;
    
    //discriminant and helpers
    float tau = ai.x/3., 
        p = ai.y-tau*ai.x, 
        q = -tau*(tau*tau+p)+ai.z, 
        dis = q*q/4.+p*p*p/27.;
        
    //triple real root
    if(dis > 0.) {
        vec2 ki = -.5*q*c.xx+sqrt(dis)*c.xz, 
            ui = sign(ki)*pow(abs(ki), c.xx/3.);
        return vec3(ui.x+ui.y-tau);
    }
    
    //three distinct real roots
    float fac = sqrt(-4./3.*p), 
        arg = acos(-.5*q*sqrt(-27./p/p/p))/3.;
    return c.zxz*fac*cos(arg*c.xxx+c*pi/3.)-tau;
}
