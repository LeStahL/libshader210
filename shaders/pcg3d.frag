const uvec4 pcg_magic_numbers = uvec4(1664525, 1013904223, 16, 0);

uvec3 pcg3d(uvec3 v) {
    v = v * pcg_magic_numbers.x + pcg_magic_numbers.y;
    v += v.yzx*v.zxy;
    v ^= v >> pcg_magic_numbers.z;
    v += v.yzx*v.zxy;
    return v;
}
