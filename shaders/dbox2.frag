const vec3 c = vec3(1.,0.,-1.);

// 2D box distance
float dbox2(vec2 x, vec2 b)
{
    vec2 da = abs(x)-b;
    return length(max(da,c.yy)) + min(max(da.x,da.y),0.0);
}
