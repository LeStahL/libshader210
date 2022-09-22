// Created by David Hoskins and licensed under MIT.
// See https://www.shadertoy.com/view/4djSRW.
// vec3->float hash function
float hash13(vec3 p3)
{
	p3  = fract(p3 * .1031);
    p3 += dot(p3, p3.zyx + 31.32);
    return fract((p3.x + p3.y) * p3.z);
}
