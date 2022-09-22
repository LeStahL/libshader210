//[
float tline3(vec3 x, vec3 p1, vec3 p2);
//]

// 3D line distance
float dline3(vec3 x, vec3 p1, vec3 p2)
{
    return length(x-mix(p1, p2, tline3(x,p1,p2)));
}
