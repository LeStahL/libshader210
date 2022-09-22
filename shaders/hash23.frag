// Created by David Hoskins and licensed under MIT.
// See https://www.shadertoy.com/view/4djSRW.
// vec3->vec2 hash function
vec2 hash23(vec3 p3)
{
	p3 = fract(p3 * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yzx+33.33);
    return fract((p3.xx+p3.yz)*p3.zy);
}
