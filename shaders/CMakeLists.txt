set(GLSL_VERSIONS
    # "110"
    # "120"
    # "130"
    # "140"
    # "150"
    "300 es"
    # "310 es"
    # "320 es"
    # "330"
    # "400"
    # "410"
    # "420"
    # "430"
    # "440"
    "450"
    # "460"
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
    blendExp.frag
    blendPolynomial.frag
    blendPolynomial1.frag
    blendPolynomial2.frag
    blendPower.frag
    dsmoothvoronoi2.frag
    dvoronoi2.frag
    dvoronoi3.frag
    lfnoise.frag
    mfnoise.frag
    rgb2hsv.frag
    hsv2rgb.frag
    ortho.frag
    rot3.frag
    inverseSF.frag
    asphere.frag
    abox3.frag
    dbox2.frag
    dbox3.frag
    dcirclesegment2.frag
    dspiral.frag
    dhexagonpattern.frag
    tline2.frag
    dline2.frag
    tline3.frag
    dline3.frag
    dregularpolygon.frag
    dstar.frag
    xspline3.frag
    dspline3.frag
    nspline3.frag
    dtspline3.frag
    xspline2.frag
    dspline2.frag
    nspline2.frag
    dtspline2.frag
    zextrude.frag
)

foreach(SHADER ${SHADERS})
    get_filename_component(SHADER_BASENAME ${SHADER} NAME_WE)
    foreach(VERSION ${GLSL_VERSIONS})
        set(VERSIONED_SHADER_FILENAME "${SHADER_BASENAME}-${VERSION}.frag")
        set(MINIFIED_VERSIONED_SHADER_FILENAME "${SHADER_BASENAME}-${VERSION}-minified.frag")
        string(REPLACE " " "-" VERSIONED_SHADER_FILENAME ${VERSIONED_SHADER_FILENAME})
        string(REPLACE " " "-" MINIFIED_VERSIONED_SHADER_FILENAME ${MINIFIED_VERSIONED_SHADER_FILENAME})
        file(READ ${SHADER} SHADER_SOURCE)
        if(${VERSION} MATCHES "300 es")
            set(PRECISION_QUALIFIER "precision highp float;\n")
        else()
            set(PRECISION_QUALIFIER)
        endif()

        configure_file(shader.frag.in ${CMAKE_CURRENT_BINARY_DIR}/${VERSIONED_SHADER_FILENAME})
        add_test(NAME glslang-validate-${VERSIONED_SHADER_FILENAME} COMMAND ${GLSLANG_VALIDATOR} ${CMAKE_CURRENT_BINARY_DIR}/${VERSIONED_SHADER_FILENAME})
        add_test(NAME c-validate-${VERSIONED_SHADER_FILENAME} COMMAND compile ${CMAKE_CURRENT_BINARY_DIR}/${VERSIONED_SHADER_FILENAME})

        if(${VERSION} MATCHES "es")
        else()
            message(STATUS "Minifying ${VERSIONED_SHADER_FILENAME}...")
            execute_process(COMMAND ${SHADER_MINIFIER} --preserve-all-globals --format text ${CMAKE_CURRENT_BINARY_DIR}/${VERSIONED_SHADER_FILENAME} -o ${CMAKE_CURRENT_BINARY_DIR}/${MINIFIED_VERSIONED_SHADER_FILENAME})
            add_test(NAME glslang-validate-${MINIFIED_VERSIONED_SHADER_FILENAME} COMMAND ${GLSLANG_VALIDATOR} ${CMAKE_CURRENT_BINARY_DIR}/${MINIFIED_VERSIONED_SHADER_FILENAME})
            add_test(NAME c-validate-${MINIFIED_VERSIONED_SHADER_FILENAME} COMMAND compile ${CMAKE_CURRENT_BINARY_DIR}/${MINIFIED_VERSIONED_SHADER_FILENAME})
        endif()
        endforeach(VERSION)
    
    
endforeach(SHADER)
