// Taken from https://www.iquilezles.org/www/articles/smin/smin.htm
// Power smooth min (k=8)
float blendPower(float a, float b, float k)
{
    a = pow(a, k);
    b = pow(b, k);
    return pow((a*b)/(a+b), 1./k);
}
