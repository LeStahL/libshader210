const float pi = 3.14159;

// Distance to circle segment
float dcirclesegment2(vec2 x, float r, float p0, float p1)
{
    float p = atan(x.y, x.x),
        t = 2.*pi;
    
    vec2 philo = vec2(p0, p1);
    philo = sign(philo)*floor(abs(philo)/t)*t;
    philo = vec2(min(philo.x, philo.y), max(philo.x,philo.y));
    philo.y = mix(philo.y,philo.x,.5+.5*sign(p0-p1));
    
    p0 -= philo.y;
    p1 -= philo.y;
    
    philo = vec2(max(p0, p1), min(p0, p1));
    
    if((p < philo.x && p > philo.y) 
       || (p+t < philo.x && p+t > philo.y) 
       || (p-t < philo.x && p-t > philo.y)
      )
    	return abs(length(x)-r);
    return min(
        length(x-r*vec2(cos(p0), sin(p0))),
        length(x-r*vec2(cos(p1), sin(p1)))
        );
}
