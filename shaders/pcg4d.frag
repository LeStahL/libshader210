const uvec4 pcg_magic_numbers = uvec4(1664525, 1013904223, 16, 0);

uvec4 pcg4d(uvec4 v)
{
    v = v * pcg_magic_numbers.x + pcg_magic_numbers.y;
    v += v.yzxy*v.wxyz;    
    v ^= v >> pcg_magic_numbers.z;
    v += v.yzxy*v.wxyz;    
    return v;
}
