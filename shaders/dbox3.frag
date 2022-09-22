// 3D box distance
float dbox3(vec3 x, vec3 b)
{
	vec3 da = abs(x) - b;
	return length(max(da,0.0))
			+ min(max(da.x,max(da.y,da.z)),0.0);
}
