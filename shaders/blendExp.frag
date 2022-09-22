// Taken from https://www.iquilezles.org/www/articles/smin/smin.htm
// Exponential smooth min (k=32)
float blendExp(float a, float b, float k)
{
    float res = exp2(-k*a) + exp2(-k*b);
    return -log2(res)/k;
}
