// Taken from https://www.iquilezles.org/www/articles/smin/smin.htm
// Polynomial smooth min 2 (k=0.1)
float blendPolynomial2(float a, float b, float k)
{
    float h = max(k-abs(a-b), 0.)/k;
    return min(a, b) - h*h*k*.25;
}
