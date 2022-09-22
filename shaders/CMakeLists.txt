set(GLSL_VERSIONS
    "110"
    "120"
    "130"
    "140"
    "150"
    "300 es"
    "310 es"
    "320 es"
    "330"
    "400"
    "410"
    "420"
    "430"
    "440"
    "450"
    "460"
)

set(SHADERS
    quadratic_zeros.frag
    cubic_zeros.frag
    quartic_zeros.frag
    hash11.frag
    hash12.frag
    hash13.frag
    hash21.frag
    hash22.frag
    hash23.frag
    hash31.frag
    hash32.frag
    hash33.frag
    hash41.frag
    hash42.frag
    hash43.frag
    hash44.frag
)

foreach(SHADER ${SHADERS})
    get_filename_component(SHADER_BASENAME ${SHADER} NAME_WE)
    foreach(VERSION ${GLSL_VERSIONS})
        set(VERSIONED_SHADER_FILENAME "${SHADER_BASENAME}-${VERSION}.frag")
        string(REPLACE " " "-" VERSIONED_SHADER_FILENAME ${VERSIONED_SHADER_FILENAME})
        configure_file(shader.frag.in ${VERSIONED_SHADER_FILENAME})
        add_test(NAME glslang-validate-${VERSIONED_SHADER_FILENAME} COMMAND ${GLSLANG_VALIDATOR} ${CMAKE_CURRENT_BINARY_DIR}/${VERSIONED_SHADER_FILENAME})
        add_test(NAME c-validate-${VERSIONED_SHADER_FILENAME} COMMAND compile ${CMAKE_CURRENT_BINARY_DIR}/${VERSIONED_SHADER_FILENAME})
    endforeach(VERSION)
    
    
endforeach(SHADER)
