vec2 quadratic_zeros(vec3 k)
{
    if(k.x == 0.) return -k.z/k.y*c.xx;
    float d = k.y*k.y-4.*k.x*k.z;
    if(d<0.) return vec2(1.e4);
    return (c.xz*sqrt(d)-k.y)/(2.*k.x);
}
