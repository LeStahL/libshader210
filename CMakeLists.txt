cmake_minimum_required(VERSION 3.15)

project(libshader210)

include(external/cmake-find-or-download/find-or-download.cmake)

# glslang-validator
find_or_download_if_not_present(GLSLANG_VALIDATOR glslangValidator.exe "https://github.com/KhronosGroup/glslang/releases/download/master-tot/glslang-master-windows-x64-Release.zip" bin/)

# shader_minifier
find_or_download_if_not_present(SHADER_MINIFIER shader_minifier.exe "https://github.com/laurentlb/Shader_Minifier/releases/download/1.2/shader_minifier.exe" ./)

# OpenGL
find_package(OpenGL REQUIRED)

# glext.h and khrplatform.h
find_or_download_if_not_present(GLEXT glext.h "https://www.khronos.org/registry/OpenGL/api/GL/glext.h" ./)
find_or_download_if_not_present(KHRPLATFORM khrplatform.h "https://www.khronos.org/registry/EGL/api/KHR/khrplatform.h" ./)
file(MAKE_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}/downloads/KHR")
file(COPY "${CMAKE_CURRENT_BINARY_DIR}/downloads/khrplatform.h" DESTINATION "${CMAKE_CURRENT_BINARY_DIR}/downloads/KHR")
include_directories("${CMAKE_CURRENT_BINARY_DIR}/downloads")

add_executable(compile
    compile.c
)
target_link_libraries(compile PUBLIC OpenGL::GL)
