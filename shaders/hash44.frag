// Created by David Hoskins and licensed under MIT.
// See https://www.shadertoy.com/view/4djSRW.
// vec4->vec4 hash function
vec4 hash44(vec4 p4)
{
	p4 = fract(p4  * vec4(.1031, .1030, .0973, .1099));
    p4 += dot(p4, p4.wzxy+33.33);
    return fract((p4.xxyz+p4.yzzw)*p4.zywx);
}
