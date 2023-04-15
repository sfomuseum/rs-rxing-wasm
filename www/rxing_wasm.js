let wasm;

const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

let cachedFloat32Memory0 = null;

function getFloat32Memory0() {
    if (cachedFloat32Memory0 === null || cachedFloat32Memory0.byteLength === 0) {
        cachedFloat32Memory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32Memory0;
}

function getArrayF32FromWasm0(ptr, len) {
    return getFloat32Memory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}
/**
* Encode a barcode with the given data, dimensions, and type
* @param {string} data
* @param {number} width
* @param {number} height
* @param {number} bc_type
* @returns {string}
*/
export function encode_barcode(data, width, height, bc_type) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(data, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.encode_barcode(retptr, ptr0, len0, width, height, bc_type);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        var r3 = getInt32Memory0()[retptr / 4 + 3];
        var ptr1 = r0;
        var len1 = r1;
        if (r3) {
            ptr1 = 0; len1 = 0;
            throw takeObject(r2);
        }
        return getStringFromWasm0(ptr1, len1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(ptr1, len1);
    }
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}
/**
* Decode a barcode from an array of 8bit luma data
* @param {Uint8Array} data
* @param {number} width
* @param {number} height
* @param {boolean | undefined} try_harder
* @returns {BarcodeResult}
*/
export function decode_barcode(data, width, height, try_harder) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.decode_barcode(retptr, ptr0, len0, width, height, isLikeNone(try_harder) ? 0xFFFFFF : try_harder ? 1 : 0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
            throw takeObject(r1);
        }
        return BarcodeResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
* Convert a javascript image context's data into luma 8.
*
* Data for this function can be found from any canvas object
* using the `data` property of an `ImageData` object.
* Such an object could be obtained using the `getImageData`
* method of a `CanvasRenderingContext2D` object.
* @param {Uint8Array} data
* @returns {Uint8Array}
*/
export function convert_js_image_to_luma(data) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.convert_js_image_to_luma(retptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var v1 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 1);
        return v1;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

let cachedUint32Memory0 = null;

function getUint32Memory0() {
    if (cachedUint32Memory0 === null || cachedUint32Memory0.byteLength === 0) {
        cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32Memory0;
}

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4);
    getUint32Memory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
* Decode a barcode from an array of rgba data.
* Pixel data is in the form of:
*     Each pixel is one u32, [r,g,b].
* @param {Uint32Array} data
* @param {number} width
* @param {number} height
* @param {boolean | undefined} try_harder
* @returns {BarcodeResult}
*/
export function decode_barcode_rgb(data, width, height, try_harder) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passArray32ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.decode_barcode_rgb(retptr, ptr0, len0, width, height, isLikeNone(try_harder) ? 0xFFFFFF : try_harder ? 1 : 0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
            throw takeObject(r1);
        }
        return BarcodeResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}
/**
* @param {Uint8Array} data
* @param {number} width
* @param {number} height
* @param {DecodeHintDictionary} hints
* @returns {BarcodeResult}
*/
export function decode_barcode_with_hints(data, width, height, hints) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(hints, DecodeHintDictionary);
        wasm.decode_barcode_with_hints(retptr, ptr0, len0, width, height, hints.ptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
            throw takeObject(r1);
        }
        return BarcodeResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
* Available barcode types
*/
export const BarcodeFormat = Object.freeze({
/**
* Aztec 2D barcode format.
*/
AZTEC:0,"0":"AZTEC",
/**
* CODABAR 1D format.
*/
CODABAR:1,"1":"CODABAR",
/**
* Code 39 1D format.
*/
Code39:2,"2":"Code39",
/**
* Code 93 1D format.
*/
Code93:3,"3":"Code93",
/**
* Code 128 1D format.
*/
Code128:4,"4":"Code128",
/**
* Data Matrix 2D barcode format.
*/
DataMatrix:5,"5":"DataMatrix",
/**
* EAN-8 1D format.
*/
Ean8:6,"6":"Ean8",
/**
* EAN-13 1D format.
*/
Ean13:7,"7":"Ean13",
/**
* ITF (Interleaved Two of Five) 1D format.
*/
ITF:8,"8":"ITF",
/**
* MaxiCode 2D barcode format.
*/
MAXICODE:9,"9":"MAXICODE",
/**
* PDF417 format.
*/
Pdf417:10,"10":"Pdf417",
/**
* QR Code 2D barcode format.
*/
QrCode:11,"11":"QrCode",
/**
* RSS 14
*/
Rss14:12,"12":"Rss14",
/**
* RSS EXPANDED
*/
RssExpanded:13,"13":"RssExpanded",
/**
* UPC-A 1D format.
*/
UpcA:14,"14":"UpcA",
/**
* UPC-E 1D format.
*/
UpcE:15,"15":"UpcE",
/**
* UPC/EAN extension format. Not a stand-alone format.
*/
UpcEanExtension:16,"16":"UpcEanExtension",UnsuportedFormat:17,"17":"UnsuportedFormat", });
/**
*/
export const DecodeHintTypes = Object.freeze({
/**
*
*     * Unspecified, application-specific hint. Maps to an unspecified {@link Object}.
*
*/
Other:0,"0":"Other",
/**
*
*     * Image is a pure monochrome image of a barcode. Doesn't matter what it maps to;
*     * use {@link Boolean#TRUE}.
*
*/
PureBarcode:1,"1":"PureBarcode",
/**
*
*     * Image is known to be of one of a few possible formats.
*     * Maps to a {@link List} of {@link BarcodeFormat}s.
*
*/
PossibleFormats:2,"2":"PossibleFormats",
/**
*
*     * Spend more time to try to find a barcode; optimize for accuracy, not speed.
*     * Doesn't matter what it maps to; use {@link Boolean#TRUE}.
*
*/
TryHarder:3,"3":"TryHarder",
/**
*
*     * Specifies what character encoding to use when decoding, where applicable (type String)
*
*/
CharacterSet:4,"4":"CharacterSet",
/**
*
*     * Allowed lengths of encoded data -- reject anything else. Maps to an {@code int[]}.
*
*/
AllowedLengths:5,"5":"AllowedLengths",
/**
*
*     * Assume Code 39 codes employ a check digit. Doesn't matter what it maps to;
*     * use {@link Boolean#TRUE}.
*
*/
AssumeCode39CheckDigit:6,"6":"AssumeCode39CheckDigit",
/**
*
*     * Assume the barcode is being processed as a GS1 barcode, and modify behavior as needed.
*     * For example this affects FNC1 handling for Code 128 (aka GS1-128). Doesn't matter what it maps to;
*     * use {@link Boolean#TRUE}.
*
*/
AssumeGs1:7,"7":"AssumeGs1",
/**
*
*     * If true, return the start and end digits in a Codabar barcode instead of stripping them. They
*     * are alpha, whereas the rest are numeric. By default, they are stripped, but this causes them
*     * to not be. Doesn't matter what it maps to; use {@link Boolean#TRUE}.
*
*/
ReturnCodabarStartEnd:8,"8":"ReturnCodabarStartEnd",
/**
*
*     * The caller needs to be notified via callback when a possible {@link RXingResultPoint}
*     * is found. Maps to a {@link RXingResultPointCallback}.
*
*/
NeedResultPointCallback:9,"9":"NeedResultPointCallback",
/**
*
*     * Allowed extension lengths for EAN or UPC barcodes. Other formats will ignore this.
*     * Maps to an {@code int[]} of the allowed extension lengths, for example [2], [5], or [2, 5].
*     * If it is optional to have an extension, do not set this hint. If this is set,
*     * and a UPC or EAN barcode is found but an extension is not, then no result will be returned
*     * at all.
*
*/
AllowedEanExtensions:10,"10":"AllowedEanExtensions",
/**
*
*     * If true, also tries to decode as inverted image. All configured decoders are simply called a
*     * second time with an inverted image. Doesn't matter what it maps to; use {@link Boolean#TRUE}.
*
*/
AlsoInverted:11,"11":"AlsoInverted", });
/**
*/
export class BarcodeResult {

    static __wrap(ptr) {
        const obj = Object.create(BarcodeResult.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_barcoderesult_free(ptr);
    }
    /**
    * @returns {number}
    */
    timestamp() {
        const ret = wasm.barcoderesult_timestamp(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    format() {
        const ret = wasm.barcoderesult_format(this.ptr);
        return ret >>> 0;
    }
    /**
    * Each pair of f32 values is an (x,y) point
    * @returns {Float32Array}
    */
    result_points() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.barcoderesult_result_points(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayF32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {number}
    */
    num_bits() {
        const ret = wasm.barcoderesult_num_bits(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {Uint8Array}
    */
    raw_bytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.barcoderesult_raw_bytes(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {string}
    */
    text() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.barcoderesult_text(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {Map<any, any>}
    */
    get_meta_data() {
        const ret = wasm.barcoderesult_get_meta_data(this.ptr);
        return takeObject(ret);
    }
}
/**
*/
export class DecodeHintDictionary {

    static __wrap(ptr) {
        const obj = Object.create(DecodeHintDictionary.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_decodehintdictionary_free(ptr);
    }
    /**
    */
    constructor() {
        const ret = wasm.decodehintdictionary_new();
        return DecodeHintDictionary.__wrap(ret);
    }
    /**
    * @param {number} hint
    * @returns {string}
    */
    get_hint(hint) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.decodehintdictionary_get_hint(retptr, this.ptr, hint);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @param {number} hint
    * @param {string} value
    * @returns {boolean}
    */
    set_hint(hint, value) {
        const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.decodehintdictionary_set_hint(this.ptr, hint, ptr0, len0);
        return ret !== 0;
    }
    /**
    * @param {number} hint
    * @returns {boolean}
    */
    remove_hint(hint) {
        const ret = wasm.decodehintdictionary_remove_hint(this.ptr, hint);
        return ret !== 0;
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function getImports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbg_new_f841cc6f2098f4b5 = function() {
        const ret = new Map();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_388c4c6422704173 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).set(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getTime_7c59072d1651a3cf = function(arg0) {
        const ret = getObject(arg0).getTime();
        return ret;
    };
    imports.wbg.__wbg_new0_25059e40b1c02766 = function() {
        const ret = new Date();
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function initMemory(imports, maybe_memory) {

}

function finalizeInit(instance, module) {
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    cachedFloat32Memory0 = null;
    cachedInt32Memory0 = null;
    cachedUint32Memory0 = null;
    cachedUint8Memory0 = null;


    return wasm;
}

function initSync(module) {
    const imports = getImports();

    initMemory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return finalizeInit(instance, module);
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('rxing_wasm_bg.wasm', import.meta.url);
    }
    const imports = getImports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    initMemory(imports);

    const { instance, module } = await load(await input, imports);

    return finalizeInit(instance, module);
}

export { initSync }
export default init;
