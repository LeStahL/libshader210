#include <assert.h>
#include <stdio.h>
#include <stdlib.h>

#define WIDTH 1920
#define HEIGHT 1080

#define WIN32_LEAN_AND_MEAN
#define WIN32_EXTRA_LEAN
#include <Windows.h>

#include <gl/GL.h>
#include "glext.h"

int _fltused = 1;

typedef GLuint (APIENTRYP PFNGLCREATESHADERPROGRAMVPROC) (GLenum type, GLsizei count, const GLchar *const*strings);

typedef struct {
	BYTE dmDeviceName[CCHDEVICENAME];
	WORD dmSpecVersion;
	WORD dmDriverVersion;
	WORD dmSize;
	WORD dmDriverExtra;
	DWORD dmFields;
	union {
		struct {
			short dmOrientation;
			short dmPaperSize;
			short dmPaperLength;
			short dmPaperWidth;
			short dmScale;
			short dmCopies;
			short dmDefaultSource;
			short dmPrintQuality;
		};
	
		struct {
			POINTL dmPosition;
			DWORD dmDisplayOrientation;
			DWORD dmDisplayFixedOutput;
		};
	};

	short dmColor;
	short dmDuplex;
	short dmYResolution;
	short dmTTOption;
	short dmCollate;
	BYTE dmFormName[CCHFORMNAME];
	WORD dmLogPixels;
	DWORD dmBitsPerPel;
	DWORD dmPelsWidth;
	DWORD dmPelsHeight;
	union {
		DWORD dmDisplayFlags;
		DWORD dmNup;
	};

	DWORD dmDisplayFrequency;
} HGDEVMODE;

static HGDEVMODE devmode = {
	{0}, 0, 0, sizeof(HGDEVMODE), 0, DM_PELSWIDTH | DM_PELSHEIGHT,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, {0}, 0, 0, WIDTH, HEIGHT, 0, 0
};

static const PIXELFORMATDESCRIPTOR pfd = {
	sizeof(PIXELFORMATDESCRIPTOR), 1,
	PFD_DRAW_TO_WINDOW|PFD_SUPPORT_OPENGL|PFD_DOUBLEBUFFER,
	PFD_TYPE_RGBA, 32, 0, 0, 0, 0, 0, 0, 8, 0,
	0, 0, 0, 0, 0, 32, 0, 0, PFD_MAIN_PLANE, 0, 0, 0, 0
};

int main(int argc, char **args) {
    assert(argc == 2);

    FILE *f = fopen(args[1], "rb");
    assert(f);
    fseek(f, 0, SEEK_END);
    size_t fsize = ftell(f);
    fseek(f, 0, SEEK_SET);
    char *fdata = (char *)malloc(fsize + 1);
    fread(fdata, 1, fsize, f);
    fdata[fsize] = '\0';
    fclose(f);

    HWND hWnd = CreateWindowExA(0, (char*)0xc019, 0, WS_POPUP|WS_VISIBLE|WS_MAXIMIZE, 0, 0, 0, 0, 0, 0, 0, 0);
    HDC hDC = GetDC(hWnd);
	SetPixelFormat(hDC, ChoosePixelFormat(hDC, &pfd), &pfd);
	wglMakeCurrent(hDC, wglCreateContext(hDC));

    GLint program = ((PFNGLCREATESHADERPROGRAMVPROC)wglGetProcAddress("glCreateShaderProgramv"))(GL_FRAGMENT_SHADER, 1, &fdata);

    GLint success = 0;
	((PFNGLGETPROGRAMIVPROC)wglGetProcAddress("glGetProgramiv"))(program, GL_LINK_STATUS, &success);

	if (!success)
	{
		GLsizei infoLogLength = 0;
    	((PFNGLGETSHADERIVPROC)wglGetProcAddress("glGetProgramiv"))(program, GL_INFO_LOG_LENGTH, &infoLogLength);
		char *infoLog = (char *) malloc(infoLogLength + 2);
		((PFNGLGETPROGRAMINFOLOGPROC)wglGetProcAddress("glGetProgramInfoLog"))(program, infoLogLength, 0, infoLog);
        fprintf(stderr, "Error in %s:\n%s\n", args[1], infoLog);
        free(infoLog);
		return 1;
	}

    free(fdata);

    return 0;
}