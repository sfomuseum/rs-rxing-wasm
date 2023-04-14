/* tslint:disable */
/* eslint-disable */
/**
* Encode a barcode with the given data, dimensions, and type
* @param {string} data
* @param {number} width
* @param {number} height
* @param {number} bc_type
* @returns {string}
*/
export function encode_barcode(data: string, width: number, height: number, bc_type: number): string;
/**
* Decode a barcode from an array of 8bit luma data
* @param {Uint8Array} data
* @param {number} width
* @param {number} height
* @param {boolean | undefined} try_harder
* @returns {BarcodeResult}
*/
export function decode_barcode(data: Uint8Array, width: number, height: number, try_harder?: boolean): BarcodeResult;
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
export function convert_js_image_to_luma(data: Uint8Array): Uint8Array;
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
export function decode_barcode_rgb(data: Uint32Array, width: number, height: number, try_harder?: boolean): BarcodeResult;
/**
* @param {Uint8Array} data
* @param {number} width
* @param {number} height
* @param {DecodeHintDictionary} hints
* @returns {BarcodeResult}
*/
export function decode_barcode_with_hints(data: Uint8Array, width: number, height: number, hints: DecodeHintDictionary): BarcodeResult;
/**
* Available barcode types
*/
export enum BarcodeFormat {
/**
* Aztec 2D barcode format. 
*/
  AZTEC = 0,
/**
* CODABAR 1D format. 
*/
  CODABAR = 1,
/**
* Code 39 1D format. 
*/
  Code39 = 2,
/**
* Code 93 1D format. 
*/
  Code93 = 3,
/**
* Code 128 1D format. 
*/
  Code128 = 4,
/**
* Data Matrix 2D barcode format. 
*/
  DataMatrix = 5,
/**
* EAN-8 1D format. 
*/
  Ean8 = 6,
/**
* EAN-13 1D format. 
*/
  Ean13 = 7,
/**
* ITF (Interleaved Two of Five) 1D format. 
*/
  ITF = 8,
/**
* MaxiCode 2D barcode format. 
*/
  MAXICODE = 9,
/**
* PDF417 format. 
*/
  Pdf417 = 10,
/**
* QR Code 2D barcode format. 
*/
  QrCode = 11,
/**
* RSS 14 
*/
  Rss14 = 12,
/**
* RSS EXPANDED 
*/
  RssExpanded = 13,
/**
* UPC-A 1D format. 
*/
  UpcA = 14,
/**
* UPC-E 1D format. 
*/
  UpcE = 15,
/**
* UPC/EAN extension format. Not a stand-alone format. 
*/
  UpcEanExtension = 16,
  UnsuportedFormat = 17,
}
/**
*/
export enum DecodeHintTypes {
/**
*
*     * Unspecified, application-specific hint. Maps to an unspecified {@link Object}.
*     
*/
  Other = 0,
/**
*
*     * Image is a pure monochrome image of a barcode. Doesn't matter what it maps to;
*     * use {@link Boolean#TRUE}.
*     
*/
  PureBarcode = 1,
/**
*
*     * Image is known to be of one of a few possible formats.
*     * Maps to a {@link List} of {@link BarcodeFormat}s.
*     
*/
  PossibleFormats = 2,
/**
*
*     * Spend more time to try to find a barcode; optimize for accuracy, not speed.
*     * Doesn't matter what it maps to; use {@link Boolean#TRUE}.
*     
*/
  TryHarder = 3,
/**
*
*     * Specifies what character encoding to use when decoding, where applicable (type String)
*     
*/
  CharacterSet = 4,
/**
*
*     * Allowed lengths of encoded data -- reject anything else. Maps to an {@code int[]}.
*     
*/
  AllowedLengths = 5,
/**
*
*     * Assume Code 39 codes employ a check digit. Doesn't matter what it maps to;
*     * use {@link Boolean#TRUE}.
*     
*/
  AssumeCode39CheckDigit = 6,
/**
*
*     * Assume the barcode is being processed as a GS1 barcode, and modify behavior as needed.
*     * For example this affects FNC1 handling for Code 128 (aka GS1-128). Doesn't matter what it maps to;
*     * use {@link Boolean#TRUE}.
*     
*/
  AssumeGs1 = 7,
/**
*
*     * If true, return the start and end digits in a Codabar barcode instead of stripping them. They
*     * are alpha, whereas the rest are numeric. By default, they are stripped, but this causes them
*     * to not be. Doesn't matter what it maps to; use {@link Boolean#TRUE}.
*     
*/
  ReturnCodabarStartEnd = 8,
/**
*
*     * The caller needs to be notified via callback when a possible {@link RXingResultPoint}
*     * is found. Maps to a {@link RXingResultPointCallback}.
*     
*/
  NeedResultPointCallback = 9,
/**
*
*     * Allowed extension lengths for EAN or UPC barcodes. Other formats will ignore this.
*     * Maps to an {@code int[]} of the allowed extension lengths, for example [2], [5], or [2, 5].
*     * If it is optional to have an extension, do not set this hint. If this is set,
*     * and a UPC or EAN barcode is found but an extension is not, then no result will be returned
*     * at all.
*     
*/
  AllowedEanExtensions = 10,
/**
*
*     * If true, also tries to decode as inverted image. All configured decoders are simply called a
*     * second time with an inverted image. Doesn't matter what it maps to; use {@link Boolean#TRUE}.
*     
*/
  AlsoInverted = 11,
}
/**
*/
export class BarcodeResult {
  free(): void;
/**
* @returns {number}
*/
  timestamp(): number;
/**
* @returns {number}
*/
  format(): number;
/**
* Each pair of f32 values is an (x,y) point
* @returns {Float32Array}
*/
  result_points(): Float32Array;
/**
* @returns {number}
*/
  num_bits(): number;
/**
* @returns {Uint8Array}
*/
  raw_bytes(): Uint8Array;
/**
* @returns {string}
*/
  text(): string;
/**
* @returns {Map<any, any>}
*/
  get_meta_data(): Map<any, any>;
}
/**
*/
export class DecodeHintDictionary {
  free(): void;
/**
*/
  constructor();
/**
* @param {number} hint
* @returns {string}
*/
  get_hint(hint: number): string;
/**
* @param {number} hint
* @param {string} value
* @returns {boolean}
*/
  set_hint(hint: number, value: string): boolean;
/**
* @param {number} hint
* @returns {boolean}
*/
  remove_hint(hint: number): boolean;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_barcoderesult_free: (a: number) => void;
  readonly barcoderesult_timestamp: (a: number) => number;
  readonly barcoderesult_format: (a: number) => number;
  readonly barcoderesult_result_points: (a: number, b: number) => void;
  readonly barcoderesult_num_bits: (a: number) => number;
  readonly barcoderesult_raw_bytes: (a: number, b: number) => void;
  readonly barcoderesult_text: (a: number, b: number) => void;
  readonly barcoderesult_get_meta_data: (a: number) => number;
  readonly encode_barcode: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly decode_barcode: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly convert_js_image_to_luma: (a: number, b: number, c: number) => void;
  readonly decode_barcode_rgb: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly decode_barcode_with_hints: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly __wbg_decodehintdictionary_free: (a: number) => void;
  readonly decodehintdictionary_new: () => number;
  readonly decodehintdictionary_get_hint: (a: number, b: number, c: number) => void;
  readonly decodehintdictionary_set_hint: (a: number, b: number, c: number, d: number) => number;
  readonly decodehintdictionary_remove_hint: (a: number, b: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
