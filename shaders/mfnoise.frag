
//[
float lfnoise(vec2 o);
//]

// Multi-frequency fractal noise stack
float mfnoise(vec2 x, float d, float b, float e)
{
    float n = 0.;
    float a = 1., nf = 0., buf;
    for(float f = d; f<b; f *= 2.)
    {
        n += a*lfnoise(f*x);
        a *= e;
        nf += 1.;
    }
    return n * (1.-e)/(1.-pow(e, nf));
}
