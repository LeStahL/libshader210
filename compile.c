#include <assert.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char **args) {
    assert(argc == 2);

    FILE *f = fopen(args[1], "rt");
    assert(f);
    fseek(f, 0, SEEK_END);
    size_t fsize = ftell(f);
    fseek(f, 0, SEEK_SET);
    char *fdata = (char *)malloc(fsize + 1);
    fread(fdata, 1, fsize, f);
    fdata[fsize] = 0;

    
}