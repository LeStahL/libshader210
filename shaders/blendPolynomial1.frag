// Taken from https://www.iquilezles.org/www/articles/smin/smin.htm
// Polynomial smooth min 1 (k=0.1)
float blendPolynomial1(float a, float b, float k)
{
    float h = clamp(.5+.5*(b-a)/k, 0., 1.);
    return mix(b, a, h) - k*h*(1.-h);
}
