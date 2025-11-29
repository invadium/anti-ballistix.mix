// Interface for 2x2 Matrix Operations
//


// set 2x2 identity matrix
// ```
// | 1 0 |
// | 0 1 |
// ```
// @param {array} rm - the receiving 2x2 matrix array to mutate
// @returns {obj/lib/mat2} mat2 lib object for chaining
function identity(rm) {
    rm[0] = 1
    rm[1] = 0
    rm[2] = 0
    rm[3] = 1

    return this
}

// create a new 2x2 identity matrix
//
// @returns {Float32Array} a new 2x2 identity matrix array
function create() {
    const res = new Float32Array(4)
    res[0] = 1
    res[3] = 1
    return res
}

// fill a 2x2 matrix with zeroes
//
// @returns {obj/lib/mat2} mat2 lib object for chaining
function zero(rm) {
    rm[0] = 0
    rm[1] = 0
    rm[2] = 0
    rm[3] = 0

    return this
}

// creates a zero-filled 2x2 matrix
//
// @returns {Float32Array} a new zero-filled 2x2 matrix array
function izero() {
    return new Float32Array(4)
}

// copy a source 2x2 matrix array to the target one
//
// @param {array/mat2} rm - the receiving 2x2 matrix array
// @param {array/mat2} im - the source 2x2 matrix array
// @returns {obj/lib/mat2} - mat2 lib object for chaining
function copy(rm, im) {
    rm[0] = im[0] ?? rm[0]
    rm[1] = im[1] ?? rm[1]
    rm[2] = im[2] ?? rm[2]
    rm[3] = im[3] ?? rm[3]

    return this
}

// clone an existing 2x2 matrix array
// 
// @param {array/mat2} im - a 2x2 matrix array to copy
// @returns {Float32Array} - a new cloned 2x2 matrix array
function clone(im) {
    const nm = new Float32Array(4)
    nm[0] = im[0] ?? 1
    nm[1] = im[1] ?? 0
    nm[2] = im[2] ?? 0
    nm[3] = im[3] ?? 1
    return nm
}

// create a 2x2 matrix array from provided 4 values
//
// @param {number} v00
// @param {number} v01
// @param {number} v10
// @param {number} v11
// @returns {Float32Array} newly formed matrix array
function from(v00, v01, v10, v11) {
    const nm = new Float32Array(4)

    nm[0] = v00 ?? 1
    nm[1] = v01 ?? 0
    nm[2] = v10 ?? 0
    nm[3] = v11 ?? 1

    return nm
}

// set values for 2x2 matrix
//
// @param {array} rm - the receiving 2x2 mutable matrix array
// @param {number} v00
// @param {number} v01
// @param {number} v10
// @param {number} v11
// @returns {obj/lib/mat2} mat2 lib object for chaining
function set(rm, v00, v01, v10, v11) {
    rm[0] = v00 ?? rm[0]
    rm[1] = v01 ?? rm[1]
    rm[2] = v10 ?? rm[2]
    rm[3] = v11 ?? rm[3]

    return this
}


// calculate determinant for the source 2x2 matrix array
//
// @param {array} im
// @returns {number} determinant for the source matrix
function det(im) {
    return (im[0] * im[3] - im[2] * im[1])
}


// add two 2x2 matrices into the target 2x2 matrix array
//
// @param {array/mat2} rm - the receiving 2x2 matrix array
// @param {array} m - an immutable term 2x2 matrix array
// @param {array} n - an immutable term 2x2 matrix array
// @returns {obj/lib/mat2} mat2 lib object for chaining
function add(rm, m, n) {
    rm[0] = m[0] + n[0]
    rm[1] = m[1] + n[1]
    rm[2] = m[2] + n[2]
    rm[3] = m[3] + n[3]

    return this
}

// add two 2x2 matrices into a new 2x2 matrix array
//
// @param {array} m - an immutable term 2x2 matrix array
// @param {array} n - an immutable term 2x2 matrix array
// @returns {array/mat2} created 2x2 matrix array with addition results
function iadd(m, n) {
    const nm = new Float32Array(4)

    nm[0] = m[0] + n[0]
    nm[1] = m[1] + n[1]
    nm[2] = m[2] + n[2]
    nm[3] = m[3] + n[3]

    return nm
}

// subtract 2x2 matrix n from 2x2 matrix m into the target 2x2 matrix array
//
// @param {array/mat2} rm - the receiving 2x2 matrix array
// @param {array} m - an immutable term 2x2 matrix array
// @param {array} n - an immutable term 2x2 matrix array
// @returns {obj/lib/mat2} mat2 lib object for chaining
function sub(rm, m, n) {
    rm[0] = m[0] - n[0]
    rm[1] = m[1] - n[1]
    rm[2] = m[2] - n[2]
    rm[3] = m[3] - n[3]

    return this
}

// subtract 2x2 matrix n from 2x2 matrix m into a new target 2x2 matrix array
//
// @param {array} m - an immutable term 2x2 matrix array
// @param {array} n - an immutable term 2x2 matrix array
// @returns {array/mat2} created 2x2 matrix array with subtraction results
function isub(m, n) {
    const nm = new Float32Array(4)

    nm[0] = m[0] - n[0]
    nm[1] = m[1] - n[1]
    nm[2] = m[2] - n[2]
    nm[3] = m[3] - n[3]

    return nm
}

// multiply 2x2 matrices into the receiving matrix array
//
// @param {array} rm - the receiving 2x2 matrix array
// @param {array} m - the immutable multiplier 2x2 matrix array
// @param {array} n - the immutable multiplicand 2x2 matrix array
// @returns {obj/lib/mat2} mat2 lib object for chaining
function mul(rm, m, n) {
    const m00 = m[0], m01 = m[1], m10 = m[2], m11 = m[3]
    const n00 = n[0], n01 = n[1], n10 = n[2], n11 = n[3]
    rm[0] = m00 * n00 + m10 * n01
    rm[1] = m01 * n00 + m11 * n01
    rm[2] = m00 * n10 + m10 * n11
    rm[3] = m01 * n10 + m11 * n11

    return this
}

// multiply 2x2 matrices into a new matrix array
//
// @param {array} m - the immutable multiplier 2x2 matrix array
// @param {array} n - the immutable multiplicand 2x2 matrix array
// @returns {array/mat2} created 2x2 matrix array with multiplication results
function imul(m, n) {
    const nm = new Float32Array(4)

    const m00 = m[0], m01 = m[1], m10 = m[2], m11 = m[3]
    const n00 = n[0], n01 = n[1], n10 = n[2], n11 = n[3]
    nm[0] = m00 * n00 + m10 * n01
    nm[1] = m01 * n00 + m11 * n01
    nm[2] = m00 * n10 + m10 * n11
    nm[3] = m01 * n10 + m11 * n11

    return nm
}

// magnify - multiply each 2x2 matrix element by a scalar
//
// @param {array/mat2} rm - the receiving 2x2 matrix array
// @param {array} im - an immutable source 2x2 matrix array
// @param {number} v - scalar value
// @returns {obj/lib/mat2} mat2 lib object for chaining
function mag(rm, im, v) {
    rm[0] = im[0] * v
    rm[1] = im[1] * v
    rm[2] = im[2] * v
    rm[3] = im[3] * v

    return this
}

// magnify - multiply each 2x2 matrix element by a scalar into a new 2x3 matrix array
//
// @param {array} im - an immutable source 2x2 matrix array
// @param {number} v - a scalar multiplicator
// @returns {array/mat2} created 2x2 matrix array with magnifcation results
function imag(im, v) {
    const nm = new Float32Array(4)

    nm[0] = im[0] * v
    nm[1] = im[1] * v
    nm[2] = im[2] * v
    nm[3] = im[3] * v

    return nm
}

// invert the source 2x2 matrix to the target 2x2 matrix
//
// @param {array} rm - an mutable target 2x2 matrix array
// @param {array} im - an immutable source 2x2 matrix array
// @returns {obj/lib/mat2} mat2 lib object for chaining
function invert(rm, im) {
    const v00 = im[0], v01 = im[1], v10 = im[2], v11 = im[3]
    const detf = v00 * v11 - v10 * v01
    if (!detf) return this
    const det = 1.0 / detf

    rm[0] =  v11 * det
    rm[1] = -v01 * det
    rm[2] = -v10 * det
    rm[3] =  v00 * det

    return this
}


// rotate a given 2x2 matrix array by the given angle
//
// @param {array} rm - the receiving 2x2 matrix array
// @param {array} m - the immutable source 2x2 matrix array
// @param {number/radians} rad - the rotation angle in radians
// @returns {obj/lib/mat2} mat2 lib object for chaining
function rot(rm, m, rad) {
    const m00 = m[0], m01 = m[1], m10 = m[2], m11 = m[3]
    const s = sin(rad)
    const c = cos(rad)

    rm[0] = m00 *  c + m10 * s;
    rm[1] = m01 *  c + m11 * s;
    rm[2] = m00 * -s + m10 * c;
    rm[3] = m01 * -s + m11 * c;

    return this
}

// Set a rotated identity matrix for the provided angle
//
// @param {array/mat2} rm - the mutable target 2x2 matrix array
// @param {number/radians} rad - the rotation angle in radians
// @returns {obj/lib/mat2} mat2 lib object for chaining
function rotateIdentity(rm, rad) {
    const s = sin(rad)
    const c = cos(rad)

    rm[0] =  c
    rm[1] =  s
    rm[2] = -s
    rm[3] =  c

    return this
}

// scale a given 2x2 matrix by dimentions provided in vec2 array
// 
// @param {array/mat2} rm - the receiving 2x2 matrix array
// @param {array/mat2} m - a source 2x2 matrix array
// @param {array/vec2} vec2 - a source 2d vector array
// @returns {obj/lib/mat2} mat2 lib object for chaining
function scaleMatrix(tar, m, vec2) {
    const m00 = m[0], m01 = m[1], m10 = m[2], m11 = m[3]
    const v0 = vec2[0], v1 = vec2[1]
    rm[0] = m00 * v0
    rm[1] = m01 * v0
    rm[2] = m10 * v1
    rm[3] = m11 * v1

    return this
}

// scale 2x2 identity matrix by dimentions provided in vec2 array
//
// @param {array/mat2} rm - the receiving 2x2 matrix array
// @param {array/vec} - a 2D vector array with scale factors
// @returns {obj/lib/mat2} mat2 lib object for chaining
function scaleIdentity(rm, v) {
    rm[0] = v[0]
    rm[1] = 0
    rm[2] = 0
    rm[3] = v[1]

    return this
}

// test if two 2x2 matrices have equal components
//
// @param {array/mat2/immutable} im1 - the first 2x2 matrix array
// @param {array/mat2/immutable} im2 - the second 2x2 matrix array
// @returns {boolean} true if matrix components are equal, false otherwise
function equals(im1, im2) {
    return (
        im1[0] === im2[0]
        && im1[1] === im2[1]
        && im1[2] === im2[2]
        && im1[3] === im2[3]
    )
}

// test if two 2x2 matrices have similar components to the precision of EPSILON
//
// @param {array/mat2/immutable} im1 - the first 2x2 matrix array
// @param {array/mat2/immutable} im2 - the second 2x2 matrix array
// @param {number} epsilon - the optional precision, collider.jam global EPSILON value is used when missing
// @returns {boolean} true if matrix components are similar, false otherwise
function near(im1, im2, epsilon) {
    const E = epsilon ?? EPSILON
    const m00 = im1[0], m01 = im1[1], m10 = im1[2], m11 = im1[3]
    const n00 = im2[0], n01 = im2[1], n10 = im2[2], n11 = im2[3]

    return (
           abs(m00 - n00) <= E * max(1.0, abs(m00), abs(n00))
        && abs(m01 - n01) <= E * max(1.0, abs(m01), abs(n01))
        && abs(m10 - n10) <= E * max(1.0, abs(m10), abs(n10))
        && abs(m11 - n11) <= E * max(1.0, abs(m11), abs(n11))
    )
}

// get a 2x2 matrix array string representation
//
// @param {array/mat2/immutable} im - a source 2x2 matrix array
// @returns {string} the 2x2 matrix array string representation
function str(im) {
    return `[${im[0]}, ${im[1]}, ${im[2]}, ${im[3]}]`
}

// get a 2x2 matrix array formatted string
//
// @param {array/mat2/immutable} im - a source 2x2 matrix array
// @param {string} s - optional separator
// @param {string} d - optional line divider
// @param {string} p - optional prefix
// @param {string} x - optional suffix
// @returns {string} the 2x2 matrix array string representation
function fmt(im, s, d, p, x) {
    s = s ?? ', '
    d = d ?? '\n    '
    p = '[\n    '
    x = '\n]'
    return `${p}${im[0]}${s}${im[1]}${d}${im[2]}${s}${im[3]}${x}`
}

// get a 2x2 matrix array string dump
//
// @param {array/mat2/immutable} im - a source 2x2 matrix array
// @returns {string} the 2x2 matrix array string dump
function dump(im) {
    return `mat2[${im[0]}, ${im[1]}, ${im[2]}, ${im[3]}]`
}


function mat2(v) {
    if (v === undefined) return create()
    if (isArr(v)) return clone(v)
    if (isNum(v)) return from.apply(this, arguments)
    return null
}

extend(mat2, {
    identity,
    create,
    zero,
    izero,
    copy,
    clone,
    from,
    set,

    det,
    add,
    iadd,
    sub,
    isub,
    mul,
    imul,
    mag,
    imag,

    invert,
    rotate: rot,
    rotateIdentity,
    scale: scaleMatrix,
    scaleIdentity,

    equals,
    near,
    str,
    fmt,
    dump,
})
