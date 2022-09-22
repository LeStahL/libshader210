const uvec4 pcg_magic_numbers = uvec4(1664525, 1013904223, 16, 0);

uvec2 pcg2d(uvec2 v)
{
    v = v * pcg_magic_numbers.x + pcg_magic_numbers.y;
    v += v.yx * pcg_magic_numbers.x;
    v ^= v>>pcg_magic_numbers.z;
    v += v.yx * pcg_magic_numbers.x;;
    v ^= v>>pcg_magic_numbers.z;
    return v;
}
