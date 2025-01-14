/* eslint-disable */ // @ts-ignore
// @ts-ignore
import { csp } from "https://deno.land/x/csp_nonce_html_transformer@v2.2.1/src/index-embedded-wasm.ts";
// @ts-ignore
import inputs from "./__csp-nonce-inputs.json" with {
    type: "json"
};
const params = inputs;
params.reportUri = params.reportUri || "/.netlify/functions/__csp-violations";
// @ts-ignore
params.distribution = Netlify.env.get("CSP_NONCE_DISTRIBUTION");
params.strictDynamic = true;
params.unsafeInline = true;
params.self = true;
params.https = true;
params.http = true;
const handler = async (_request, context) => {
    const response = await context.next();
    // for debugging which routes use this edge function
    response.headers.set("x-debug-csp-nonce", "invoked");
    return csp(response, params);
};
// Top 50 most common extensions (minus .html and .htm) according to Humio
const excludedExtensions = [
    "aspx",
    "avif",
    "babylon",
    "bak",
    "cgi",
    "com",
    "css",
    "ds",
    "env",
    "gif",
    "gz",
    "ico",
    "ini",
    "jpeg",
    "jpg",
    "js",
    "json",
    "jsp",
    "log",
    "m4a",
    "map",
    "md",
    "mjs",
    "mp3",
    "mp4",
    "ogg",
    "otf",
    "pdf",
    "php",
    "png",
    "rar",
    "sh",
    "sql",
    "svg",
    "ttf",
    "txt",
    "wasm",
    "wav",
    "webm",
    "webmanifest",
    "webp",
    "woff",
    "woff2",
    "xml",
    "xsd",
    "yaml",
    "yml",
    "zip"
];
export const config = {
    path: params.path,
    excludedPath: [
        "/.netlify*",
        `**/*.(${excludedExtensions.join("|")})`
    ].concat(params.excludedPath).filter(Boolean),
    handler,
    onError: "bypass",
    method: "GET"
};
export default handler;
