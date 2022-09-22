// Taken from https://www.iquilezles.org/www/articles/smin/smin.htm
// Generalized polynomial blending function
float blendPolynomial(float a, float b, float k, float n)
{
    float h = max(k-abs(a-b), 0.)/k;
    float m = pow(h, n)*.5;
    float s = m*k/n; 
    return (a<b)?a-s:b-s;
}
