
//[
float tline2(vec2 x, vec2 p1, vec2 p2);
//]

// 2D line distance
float dline2(vec2 x, vec2 p1, vec2 p2)
{
    return length(x-mix(p1, p2, tline2(x,p1,p2)));
}
