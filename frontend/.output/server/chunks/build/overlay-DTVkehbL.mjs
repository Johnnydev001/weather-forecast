import { defineComponent, ref, provide, createElementBlock, useSSRContext, watch, mergeProps, unref, useAttrs, computed, withAsyncContext, toRef, isRef, shallowRef, getCurrentInstance, onServerPrefetch } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useHead } from './vue.65b7bcda-8_knhzqr.mjs';
import { _ as _export_sfc, e as encodeParam$1, a as useNuxtApp, u as useRoute$1, h as hasProtocol, w as withLeadingSlash, j as joinURL, p as parseURL$1, d as defu, c as useRuntimeConfig, f as asyncDataDefaults, g as createError, b as encodePath$1 } from './server.mjs';

async function imageMeta(_ctx, url) {
  const meta = await _imageMeta(url).catch((err) => {
    console.error("Failed to get image meta for " + url, err + "");
    return {
      width: 0,
      height: 0,
      ratio: 0
    };
  });
  return meta;
}
async function _imageMeta(url) {
  {
    const imageMeta2 = await import('./index-CLRNvoHr.mjs').then((r) => r.imageMeta);
    const data = await fetch(url).then((res) => res.buffer());
    const metadata = imageMeta2(data);
    if (!metadata) {
      throw new Error(`No metadata could be extracted from the image \`${url}\`.`);
    }
    const { width, height } = metadata;
    const meta = {
      width,
      height,
      ratio: width && height ? width / height : void 0
    };
    return meta;
  }
}
function createMapper(map) {
  return (key) => {
    return key ? map[key] || key : map.missingValue;
  };
}
function createOperationsGenerator({ formatter, keyMap, joinWith = "/", valueMap } = {}) {
  if (!formatter) {
    formatter = (key, value) => `${key}=${value}`;
  }
  if (keyMap && typeof keyMap !== "function") {
    keyMap = createMapper(keyMap);
  }
  const map = valueMap || {};
  Object.keys(map).forEach((valueKey) => {
    if (typeof map[valueKey] !== "function") {
      map[valueKey] = createMapper(map[valueKey]);
    }
  });
  return (modifiers = {}) => {
    const operations = Object.entries(modifiers).filter(([_, value]) => typeof value !== "undefined").map(([key, value]) => {
      const mapper = map[key];
      if (typeof mapper === "function") {
        value = mapper(modifiers[key]);
      }
      key = typeof keyMap === "function" ? keyMap(key) : key;
      return formatter(key, value);
    });
    return operations.join(joinWith);
  };
}
function parseSize(input = "") {
  if (typeof input === "number") {
    return input;
  }
  if (typeof input === "string") {
    if (input.replace("px", "").match(/^\d+$/g)) {
      return Number.parseInt(input, 10);
    }
  }
}
function parseDensities(input = "") {
  if (input === void 0 || !input.length) {
    return [];
  }
  const densities = /* @__PURE__ */ new Set();
  for (const density of input.split(" ")) {
    const d = Number.parseInt(density.replace("x", ""));
    if (d) {
      densities.add(d);
    }
  }
  return Array.from(densities);
}
function checkDensities(densities) {
  if (densities.length === 0) {
    throw new Error("`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)");
  }
}
function parseSizes(input) {
  const sizes = {};
  if (typeof input === "string") {
    for (const entry of input.split(/[\s,]+/).filter((e) => e)) {
      const s = entry.split(":");
      if (s.length !== 2) {
        sizes["1px"] = s[0].trim();
      } else {
        sizes[s[0].trim()] = s[1].trim();
      }
    }
  } else {
    Object.assign(sizes, input);
  }
  return sizes;
}
function createImage(globalOptions) {
  const ctx = {
    options: globalOptions
  };
  const getImage2 = (input, options = {}) => {
    const image = resolveImage(ctx, input, options);
    return image;
  };
  const $img = (input, modifiers = {}, options = {}) => {
    return getImage2(input, {
      ...options,
      modifiers: defu(modifiers, options.modifiers || {})
    }).url;
  };
  for (const presetName in globalOptions.presets) {
    $img[presetName] = (source, modifiers, options) => $img(source, modifiers, { ...globalOptions.presets[presetName], ...options });
  }
  $img.options = globalOptions;
  $img.getImage = getImage2;
  $img.getMeta = (input, options) => getMeta(ctx, input, options);
  $img.getSizes = (input, options) => getSizes(ctx, input, options);
  ctx.$img = $img;
  return $img;
}
async function getMeta(ctx, input, options) {
  const image = resolveImage(ctx, input, { ...options });
  if (typeof image.getMeta === "function") {
    return await image.getMeta();
  } else {
    return await imageMeta(ctx, image.url);
  }
}
function resolveImage(ctx, input, options) {
  var _a, _b;
  if (input && typeof input !== "string") {
    throw new TypeError(`input must be a string (received ${typeof input}: ${JSON.stringify(input)})`);
  }
  if (!input || input.startsWith("data:")) {
    return {
      url: input
    };
  }
  const { provider, defaults } = getProvider(ctx, options.provider || ctx.options.provider);
  const preset = getPreset(ctx, options.preset);
  input = hasProtocol(input) ? input : withLeadingSlash(input);
  if (!provider.supportsAlias) {
    for (const base in ctx.options.alias) {
      if (input.startsWith(base)) {
        const alias = ctx.options.alias[base];
        if (alias) {
          input = joinURL(alias, input.slice(base.length));
        }
      }
    }
  }
  if (provider.validateDomains && hasProtocol(input)) {
    const inputHost = parseURL$1(input).host;
    if (!ctx.options.domains.find((d) => d === inputHost)) {
      return {
        url: input
      };
    }
  }
  const _options = defu(options, preset, defaults);
  _options.modifiers = { ..._options.modifiers };
  const expectedFormat = _options.modifiers.format;
  if ((_a = _options.modifiers) == null ? void 0 : _a.width) {
    _options.modifiers.width = parseSize(_options.modifiers.width);
  }
  if ((_b = _options.modifiers) == null ? void 0 : _b.height) {
    _options.modifiers.height = parseSize(_options.modifiers.height);
  }
  const image = provider.getImage(input, _options, ctx);
  image.format = image.format || expectedFormat || "";
  return image;
}
function getProvider(ctx, name) {
  const provider = ctx.options.providers[name];
  if (!provider) {
    throw new Error("Unknown provider: " + name);
  }
  return provider;
}
function getPreset(ctx, name) {
  if (!name) {
    return {};
  }
  if (!ctx.options.presets[name]) {
    throw new Error("Unknown preset: " + name);
  }
  return ctx.options.presets[name];
}
function getSizes(ctx, input, opts) {
  var _a, _b, _c, _d, _e;
  const width = parseSize((_a = opts.modifiers) == null ? void 0 : _a.width);
  const height = parseSize((_b = opts.modifiers) == null ? void 0 : _b.height);
  const sizes = parseSizes(opts.sizes);
  const densities = ((_c = opts.densities) == null ? void 0 : _c.trim()) ? parseDensities(opts.densities.trim()) : ctx.options.densities;
  checkDensities(densities);
  const hwRatio = width && height ? height / width : 0;
  const sizeVariants = [];
  const srcsetVariants = [];
  if (Object.keys(sizes).length >= 1) {
    for (const key in sizes) {
      const variant = getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx);
      if (variant === void 0) {
        continue;
      }
      sizeVariants.push({
        size: variant.size,
        screenMaxWidth: variant.screenMaxWidth,
        media: `(max-width: ${variant.screenMaxWidth}px)`
      });
      for (const density of densities) {
        srcsetVariants.push({
          width: variant._cWidth * density,
          src: getVariantSrc(ctx, input, opts, variant, density)
        });
      }
    }
    finaliseSizeVariants(sizeVariants);
  } else {
    for (const density of densities) {
      const key = Object.keys(sizes)[0];
      let variant = key ? getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx) : void 0;
      if (variant === void 0) {
        variant = {
          size: "",
          screenMaxWidth: 0,
          _cWidth: (_d = opts.modifiers) == null ? void 0 : _d.width,
          _cHeight: (_e = opts.modifiers) == null ? void 0 : _e.height
        };
      }
      srcsetVariants.push({
        width: density,
        src: getVariantSrc(ctx, input, opts, variant, density)
      });
    }
  }
  finaliseSrcsetVariants(srcsetVariants);
  const defaultVariant = srcsetVariants[srcsetVariants.length - 1];
  const sizesVal = sizeVariants.length ? sizeVariants.map((v) => `${v.media ? v.media + " " : ""}${v.size}`).join(", ") : void 0;
  const suffix = sizesVal ? "w" : "x";
  const srcsetVal = srcsetVariants.map((v) => `${v.src} ${v.width}${suffix}`).join(", ");
  return {
    sizes: sizesVal,
    srcset: srcsetVal,
    src: defaultVariant == null ? void 0 : defaultVariant.src
  };
}
function getSizesVariant(key, size, height, hwRatio, ctx) {
  const screenMaxWidth = ctx.options.screens && ctx.options.screens[key] || Number.parseInt(key);
  const isFluid = size.endsWith("vw");
  if (!isFluid && /^\d+$/.test(size)) {
    size = size + "px";
  }
  if (!isFluid && !size.endsWith("px")) {
    return void 0;
  }
  let _cWidth = Number.parseInt(size);
  if (!screenMaxWidth || !_cWidth) {
    return void 0;
  }
  if (isFluid) {
    _cWidth = Math.round(_cWidth / 100 * screenMaxWidth);
  }
  const _cHeight = hwRatio ? Math.round(_cWidth * hwRatio) : height;
  return {
    size,
    screenMaxWidth,
    _cWidth,
    _cHeight
  };
}
function getVariantSrc(ctx, input, opts, variant, density) {
  return ctx.$img(
    input,
    {
      ...opts.modifiers,
      width: variant._cWidth ? variant._cWidth * density : void 0,
      height: variant._cHeight ? variant._cHeight * density : void 0
    },
    opts
  );
}
function finaliseSizeVariants(sizeVariants) {
  var _a;
  sizeVariants.sort((v1, v2) => v1.screenMaxWidth - v2.screenMaxWidth);
  let previousMedia = null;
  for (let i = sizeVariants.length - 1; i >= 0; i--) {
    const sizeVariant = sizeVariants[i];
    if (sizeVariant.media === previousMedia) {
      sizeVariants.splice(i, 1);
    }
    previousMedia = sizeVariant.media;
  }
  for (let i = 0; i < sizeVariants.length; i++) {
    sizeVariants[i].media = ((_a = sizeVariants[i + 1]) == null ? void 0 : _a.media) || "";
  }
}
function finaliseSrcsetVariants(srcsetVariants) {
  srcsetVariants.sort((v1, v2) => v1.width - v2.width);
  let previousWidth = null;
  for (let i = srcsetVariants.length - 1; i >= 0; i--) {
    const sizeVariant = srcsetVariants[i];
    if (sizeVariant.width === previousWidth) {
      srcsetVariants.splice(i, 1);
    }
    previousWidth = sizeVariant.width;
  }
}
const operationsGenerator = createOperationsGenerator({
  keyMap: {
    format: "f",
    fit: "fit",
    width: "w",
    height: "h",
    resize: "s",
    quality: "q",
    background: "b"
  },
  joinWith: "&",
  formatter: (key, val) => encodeParam$1(key) + "_" + encodeParam$1(val)
});
const getImage = (src, { modifiers = {}, baseURL } = {}, ctx) => {
  if (modifiers.width && modifiers.height) {
    modifiers.resize = `${modifiers.width}x${modifiers.height}`;
    delete modifiers.width;
    delete modifiers.height;
  }
  const params = operationsGenerator(modifiers) || "_";
  if (!baseURL) {
    baseURL = joinURL(ctx.options.nuxt.baseURL, "/_ipx");
  }
  return {
    url: joinURL(baseURL, params, encodePath$1(src))
  };
};
const validateDomains = true;
const supportsAlias = true;
const ipxRuntime$8GRQexQ3Kb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getImage,
  supportsAlias,
  validateDomains
}, Symbol.toStringTag, { value: "Module" }));
const imageOptions = {
  "screens": {
    "xs": 320,
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "xxl": 1536,
    "2xl": 1536
  },
  "presets": {},
  "provider": "ipx",
  "domains": [],
  "alias": {},
  "densities": [
    1,
    2
  ],
  "format": [
    "webp"
  ]
};
imageOptions.providers = {
  ["ipx"]: { provider: ipxRuntime$8GRQexQ3Kb, defaults: {} }
};
const useImage = () => {
  const config = useRuntimeConfig();
  const nuxtApp = useNuxtApp();
  return nuxtApp.$img || nuxtApp._img || (nuxtApp._img = createImage({
    ...imageOptions,
    nuxt: {
      baseURL: config.app.baseURL
    },
    runtimeConfig: config
  }));
};
const baseImageProps = {
  // input source
  src: { type: String, required: false },
  // modifiers
  format: { type: String, required: false },
  quality: { type: [Number, String], required: false },
  background: { type: String, required: false },
  fit: { type: String, required: false },
  modifiers: { type: Object, required: false },
  // options
  preset: { type: String, required: false },
  provider: { type: String, required: false },
  sizes: { type: [Object, String], required: false },
  densities: { type: String, required: false },
  preload: {
    type: [Boolean, Object],
    required: false
  },
  // <img> attributes
  width: { type: [String, Number], required: false },
  height: { type: [String, Number], required: false },
  alt: { type: String, required: false },
  referrerpolicy: { type: String, required: false },
  usemap: { type: String, required: false },
  longdesc: { type: String, required: false },
  ismap: { type: Boolean, required: false },
  loading: {
    type: String,
    required: false,
    validator: (val) => ["lazy", "eager"].includes(val)
  },
  crossorigin: {
    type: [Boolean, String],
    required: false,
    validator: (val) => ["anonymous", "use-credentials", "", true, false].includes(val)
  },
  decoding: {
    type: String,
    required: false,
    validator: (val) => ["async", "auto", "sync"].includes(val)
  },
  // csp
  nonce: { type: [String], required: false }
};
const useBaseImage = (props) => {
  const options = computed(() => {
    return {
      provider: props.provider,
      preset: props.preset
    };
  });
  const attrs = computed(() => {
    return {
      width: parseSize(props.width),
      height: parseSize(props.height),
      alt: props.alt,
      referrerpolicy: props.referrerpolicy,
      usemap: props.usemap,
      longdesc: props.longdesc,
      ismap: props.ismap,
      crossorigin: props.crossorigin === true ? "anonymous" : props.crossorigin || void 0,
      loading: props.loading,
      decoding: props.decoding,
      nonce: props.nonce
    };
  });
  const $img = useImage();
  const modifiers = computed(() => {
    return {
      ...props.modifiers,
      width: parseSize(props.width),
      height: parseSize(props.height),
      format: props.format,
      quality: props.quality || $img.options.quality,
      background: props.background,
      fit: props.fit
    };
  });
  return {
    options,
    attrs,
    modifiers
  };
};
const imgProps = {
  ...baseImageProps,
  placeholder: { type: [Boolean, String, Number, Array], required: false },
  placeholderClass: { type: String, required: false }
};
const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
  var _a2, _b2, _c, _d, _e, _f, _g, _h;
  var _b;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, _handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  const handler = _handler ;
  const getDefault = () => asyncDataDefaults.value;
  const getDefaultCachedData = () => nuxtApp.isHydrating ? nuxtApp.payload.data[key] : nuxtApp.static.data[key];
  options.server = (_a2 = options.server) != null ? _a2 : true;
  options.default = (_b2 = options.default) != null ? _b2 : getDefault;
  options.getCachedData = (_c = options.getCachedData) != null ? _c : getDefaultCachedData;
  options.lazy = (_d = options.lazy) != null ? _d : false;
  options.immediate = (_e = options.immediate) != null ? _e : true;
  options.deep = (_f = options.deep) != null ? _f : asyncDataDefaults.deep;
  options.dedupe = (_g = options.dedupe) != null ? _g : "cancel";
  const initialCachedData = options.getCachedData(key, nuxtApp);
  const hasCachedData = initialCachedData != null;
  if (!nuxtApp._asyncData[key] || !options.immediate) {
    (_h = (_b = nuxtApp.payload._errors)[key]) != null ? _h : _b[key] = asyncDataDefaults.errorValue;
    const _ref = options.deep ? ref : shallowRef;
    nuxtApp._asyncData[key] = {
      data: _ref(hasCachedData ? initialCachedData : options.default()),
      pending: ref(!hasCachedData),
      error: toRef(nuxtApp.payload._errors, key),
      status: ref("idle"),
      _default: options.default
    };
  }
  const asyncData = { ...nuxtApp._asyncData[key] };
  delete asyncData._default;
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    var _a3;
    if (nuxtApp._asyncDataPromises[key]) {
      if (isDefer((_a3 = opts.dedupe) != null ? _a3 : options.dedupe)) {
        return nuxtApp._asyncDataPromises[key];
      }
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    if (opts._initial || nuxtApp.isHydrating && opts._initial !== false) {
      const cachedData = opts._initial ? initialCachedData : options.getCachedData(key, nuxtApp);
      if (cachedData != null) {
        return Promise.resolve(cachedData);
      }
    }
    asyncData.pending.value = true;
    asyncData.status.value = "pending";
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxtApp));
        } catch (err) {
          reject(err);
        }
      }
    ).then(async (_result) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = await options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      nuxtApp.payload.data[key] = result;
      asyncData.data.value = result;
      asyncData.error.value = asyncDataDefaults.errorValue;
      asyncData.status.value = "success";
    }).catch((error) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      asyncData.error.value = createError(error);
      asyncData.data.value = unref(options.default());
      asyncData.status.value = "error";
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      delete nuxtApp._asyncDataPromises[key];
    });
    nuxtApp._asyncDataPromises[key] = promise;
    return nuxtApp._asyncDataPromises[key];
  };
  asyncData.clear = () => clearNuxtDataByKey(nuxtApp, key);
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = asyncDataDefaults.errorValue;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = void 0;
    nuxtApp._asyncData[key].error.value = asyncDataDefaults.errorValue;
    nuxtApp._asyncData[key].pending.value = false;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    if (nuxtApp._asyncDataPromises[key]) {
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const clientOnlySymbol = Symbol.for("nuxt:client-only");
defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    provide(clientOnlySymbol, true);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "NuxtImg",
  __ssrInlineRender: true,
  props: imgProps,
  emits: ["load", "error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const attrs = useAttrs();
    const isServer = true;
    const $img = useImage();
    const _base = useBaseImage(props);
    const placeholderLoaded = ref(false);
    const imgEl = ref();
    const sizes = computed(() => $img.getSizes(props.src, {
      ..._base.options.value,
      sizes: props.sizes,
      densities: props.densities,
      modifiers: {
        ..._base.modifiers.value,
        width: parseSize(props.width),
        height: parseSize(props.height)
      }
    }));
    const imgAttrs = computed(() => {
      const attrs2 = { ..._base.attrs.value, "data-nuxt-img": "" };
      if (!props.placeholder || placeholderLoaded.value) {
        attrs2.sizes = sizes.value.sizes;
        attrs2.srcset = sizes.value.srcset;
      }
      return attrs2;
    });
    const placeholder = computed(() => {
      let placeholder2 = props.placeholder;
      if (placeholder2 === "") {
        placeholder2 = true;
      }
      if (!placeholder2 || placeholderLoaded.value) {
        return false;
      }
      if (typeof placeholder2 === "string") {
        return placeholder2;
      }
      const size = Array.isArray(placeholder2) ? placeholder2 : typeof placeholder2 === "number" ? [placeholder2, placeholder2] : [10, 10];
      return $img(props.src, {
        ..._base.modifiers.value,
        width: size[0],
        height: size[1],
        quality: size[2] || 50,
        blur: size[3] || 3
      }, _base.options.value);
    });
    const mainSrc = computed(
      () => props.sizes ? sizes.value.src : $img(props.src, _base.modifiers.value, _base.options.value)
    );
    const src = computed(() => placeholder.value ? placeholder.value : mainSrc.value);
    if (props.preload) {
      const isResponsive = Object.values(sizes.value).every((v) => v);
      useHead({
        link: [{
          rel: "preload",
          as: "image",
          nonce: props.nonce,
          ...!isResponsive ? { href: src.value } : {
            href: sizes.value.src,
            imagesizes: sizes.value.sizes,
            imagesrcset: sizes.value.srcset
          },
          ...typeof props.preload !== "boolean" && props.preload.fetchPriority ? { fetchpriority: props.preload.fetchPriority } : {}
        }]
      });
    }
    const nuxtApp = useNuxtApp();
    nuxtApp.isHydrating;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<img${ssrRenderAttrs(mergeProps({
        ref_key: "imgEl",
        ref: imgEl,
        class: props.placeholder && !placeholderLoaded.value ? props.placeholderClass : void 0
      }, {
        ...unref(isServer) ? { onerror: "this.setAttribute('data-error', 1)" } : {},
        ...imgAttrs.value,
        ...unref(attrs)
      }, { src: src.value }, _attrs))}>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/@nuxt+image@1.8.1_ioredis@5.4.1_magicast@0.3.5_rollup@4.21.2_webpack-sources@3.2.3/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    width: "36",
    height: "36",
    viewBox: "0 0 24 24",
    fill: "rgb(100, 177, 255)",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "ai ai-Air"
  }, _attrs))}><path d="M3 8h7a3 3 0 1 0-3-3"></path><path d="M4 16h11a3 3 0 1 1-3 3"></path><path d="M2 12h17a3 3 0 1 0-3-3"></path></svg>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("public/assets/icons/wind.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const WindIcon = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$4]]);
const _sfc_main$7 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    viewBox: "0 0 24 24",
    fill: "#ffffff",
    stroke: "",
    xmlns: "http://www.w3.org/2000/svg"
  }, _attrs))}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M13 13L16 8M8 8H8.01M12 6H12.01M18 12H18.01M6 12H6.01M14 15C14 16.1046 13.1046 17 12 17C10.8954 17 10 16.1046 10 15C10 13.8954 10.8954 13 12 13C13.1046 13 14 13.8954 14 15ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="orangered" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("public/assets/icons/pressure.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const PressureIcon = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$6 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    width: "36",
    height: "36",
    viewBox: "0 0 24 24",
    fill: "orange",
    stroke: "red",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "ai ai-Sun"
  }, _attrs))}><path d="M12 3V2m0 20v-1m9-9h1M2 12h1m15.5-6.5L20 4M4 20l1.5-1.5M4 4l1.5 1.5m13 13L20 20"></path><circle cx="12" cy="12" r="4" stroke="orange"></circle></svg>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("public/assets/icons/sun.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const UVIndexIcon = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$5 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    viewBox: "0 0 24 24",
    fill: "rgb(50, 150, 255)",
    stroke: "rgb(100, 177, 255)",
    xmlns: "http://www.w3.org/2000/svg"
  }, _attrs))}><g id="SVGRepo_bgCarrier" stroke-width="1rem"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 21.5C16.1012 21.5 19.5 18.4372 19.5 14.5714C19.5 12.1555 18.2672 9.71249 16.8732 7.70906C15.4698 5.69214 13.8515 4.04821 12.9778 3.21778C12.4263 2.69364 11.5737 2.69364 11.0222 3.21779C10.1485 4.04821 8.53016 5.69214 7.1268 7.70906C5.73282 9.71249 4.5 12.1555 4.5 14.5714C4.5 18.4372 7.8988 21.5 12 21.5Z" stroke="rgb(100, 177, 255)"></path><path d="M12 18C11.4747 18 10.9546 17.8965 10.4693 17.6955C9.98396 17.4945 9.54301 17.1999 9.17157 16.8284C8.80014 16.457 8.5055 16.016 8.30448 15.5307C8.10346 15.0454 8 14.5253 8 14" stroke="" stroke-linecap="round"></path></g></svg>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("public/assets/icons/humidity.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const HumidityIcon = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$1]]);
const getImageUrlByWeatherStatus = (weatherMainStatus, isIcon) => {
  switch (weatherMainStatus == null ? void 0 : weatherMainStatus.toLowerCase()) {
    case "clouds":
      return isIcon ? "/assets/imgs/cloudy.svg" : "/assets/imgs/background-cloudy.jpg";
    case "windy":
      return isIcon ? "/assets/imgs/wind.svg" : "/assets/imgs/background-windy.jpg";
    case "sunny":
      return isIcon ? "/assets/imgs/sun.svg" : "/assets/imgs/background-sunny.jpg";
    case "rain":
      return isIcon ? "/assets/imgs/cloud-rain.svg" : "/assets/imgs/background-rainy.jpg";
    case "snow":
      return isIcon ? "/assets/imgs/snowflake.svg" : "/assets/imgs/background-snowy.jpg";
    case "thunderstorm":
      return isIcon ? "/assets/imgs/cloud-lightning.svg" : "/assets/imgs/background-thunder.jpg";
    case "clear":
      return isIcon ? "/assets/imgs/sun.svg" : "/assets/imgs/background-sunny.jpg";
    case "drizzle":
      return isIcon ? "/assets/imgs/cloud-rain.svg" : "/assets/imgs/background-drizzle.jpg";
    default:
      return isIcon ? "/assets/imgs/sun.svg" : "/assets/imgs/background-sunny.jpg";
  }
};
const capitalizeWord = (word) => {
  var _a;
  return ((_a = word.charAt(0)) == null ? void 0 : _a.toUpperCase()) + word.slice(1);
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "weather-forecast-item",
  __ssrInlineRender: true,
  props: ["item"],
  setup(__props) {
    const props = __props;
    const iconByWeatherStatus = computed(() => {
      var _a, _b;
      return getImageUrlByWeatherStatus((_b = (_a = props == null ? void 0 : props.item) == null ? void 0 : _a.weather[0]) == null ? void 0 : _b.main, true);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
      const _component_NuxtImg = _sfc_main$9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "forecast-item" }, _attrs))} data-v-ade013f2><div class="summary" data-v-ade013f2>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "weather-illustration",
        src: unref(iconByWeatherStatus),
        alt: (_b = (_a = props == null ? void 0 : props.item) == null ? void 0 : _a.weather[0]) == null ? void 0 : _b.description,
        title: (_d = (_c = props == null ? void 0 : props.item) == null ? void 0 : _c.weather[0]) == null ? void 0 : _d.description
      }, null, _parent));
      _push(`<div style="${ssrRenderStyle({ display: "flex", columnGap: "0.5rem", alignItems: "center" })}" data-v-ade013f2><span data-v-ade013f2>Day:</span><time${ssrRenderAttr("datetime", new Date(((_e = props == null ? void 0 : props.item) == null ? void 0 : _e.dt) * 1e3).toDateString())} data-v-ade013f2>${ssrInterpolate(new Date(((_f = props == null ? void 0 : props.item) == null ? void 0 : _f.dt) * 1e3).getDate())}</time></div><span data-v-ade013f2>${ssrInterpolate(("capitalizeWord" in _ctx ? _ctx.capitalizeWord : unref(capitalizeWord))((_h = (_g = props == null ? void 0 : props.item) == null ? void 0 : _g.weather[0]) == null ? void 0 : _h.description))}</span></div><div class="condition-container" data-v-ade013f2><div class="condition" data-v-ade013f2><span data-v-ade013f2>Min:</span><div class="value" data-v-ade013f2><span style="${ssrRenderStyle({ color: ((_j = (_i = props == null ? void 0 : props.item) == null ? void 0 : _i.temp) == null ? void 0 : _j.min) > 18 ? "orange" : "#ffffff", display: "flex", columnGap: "0.25rem", fontWeight: 800 })}" data-v-ade013f2><span data-v-ade013f2>${ssrInterpolate((_l = (_k = props == null ? void 0 : props.item) == null ? void 0 : _k.temp) == null ? void 0 : _l.min)}</span><span data-v-ade013f2>\xBAC</span></span></div></div><div class="condition" data-v-ade013f2><span data-v-ade013f2>Max:</span><div class="value" data-v-ade013f2><span style="${ssrRenderStyle({ color: ((_n = (_m = props == null ? void 0 : props.item) == null ? void 0 : _m.temp) == null ? void 0 : _n.max) > 18 ? "orange" : "#ffffff", display: "flex", columnGap: "0.25rem", fontWeight: 800 })}" data-v-ade013f2><span data-v-ade013f2>${ssrInterpolate((_p = (_o = props == null ? void 0 : props.item) == null ? void 0 : _o.temp) == null ? void 0 : _p.max)}</span><span data-v-ade013f2>\xBAC</span></span></div></div></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/weather-forecast/weather-forecast-item.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-ade013f2"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "weather-forecast",
  __ssrInlineRender: true,
  props: ["weatherForecast"],
  setup(__props) {
    const props = __props;
    const weatherForecast = computed(() => props == null ? void 0 : props.weatherForecast);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_WeatherForecastItem = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "forecast-container" }, _attrs))} data-v-4e5fa264><h4 class="title" data-v-4e5fa264> Next 5 days forecast: </h4><ul class="list" data-v-4e5fa264><!--[-->`);
      ssrRenderList(unref(weatherForecast), (item) => {
        _push(`<li data-v-4e5fa264>`);
        _push(ssrRenderComponent(_component_WeatherForecastItem, { item }, null, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></section>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/weather-forecast/weather-forecast.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const WeatherForecast = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-4e5fa264"]]);
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthsMappedToNumbers = months.map((elem, index) => {
  return {
    index,
    elem
  };
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "weather-status",
  __ssrInlineRender: true,
  props: ["locationToFind"],
  async setup(__props) {
    var _a;
    let __temp, __restore;
    const handleFindLocationByName = async (locationToFind) => {
      var _a2, _b, _c, _d, _e, _f, _g, _h;
      try {
        const { data: locationResponse } = await useAsyncData(
          "location",
          () => $fetch("/api/location", {
            method: "GET",
            params: {
              query: locationToFind
            }
          })
        );
        if ((locationResponse == null ? void 0 : locationResponse.value) && "address" in locationResponse.value) {
          country.value = (_b = (_a2 = locationResponse == null ? void 0 : locationResponse.value) == null ? void 0 : _a2.address) == null ? void 0 : _b.country;
          city.value = ((_d = (_c = locationResponse == null ? void 0 : locationResponse.value) == null ? void 0 : _c.address) == null ? void 0 : _d.city) || ((_f = (_e = locationResponse == null ? void 0 : locationResponse.value) == null ? void 0 : _e.address) == null ? void 0 : _f.name);
          latitude.value = (_g = locationResponse == null ? void 0 : locationResponse.value) == null ? void 0 : _g.lat;
          longitude.value = (_h = locationResponse == null ? void 0 : locationResponse.value) == null ? void 0 : _h.lon;
        }
      } catch (error) {
        console.error("Failed to get the location data from the server due to: ", error);
      }
    };
    const handleWeatherRequest = async () => {
      var _a3;
      var _a2, _b, _c, _d;
      try {
        const { data: weatherResponse, error } = await useAsyncData(
          "current",
          async () => await $fetch("/api/weather", {
            method: "POST",
            params: {
              weatherType: "current"
            },
            body: {
              lat: latitude.value,
              lon: longitude.value,
              lang: "en",
              units: "metric"
            }
          }),
          {
            watch: [latitude, longitude]
          }
        );
        if (error == null ? void 0 : error.value) {
          weatherForecastErrorMessage.value = (_a3 = (_a2 = error == null ? void 0 : error.value) == null ? void 0 : _a2.statusMessage) != null ? _a3 : "Failed to get the weather forecast data";
        } else if ((weatherResponse == null ? void 0 : weatherResponse.value) && "temperature" in weatherResponse.value) {
          temperature.value = weatherResponse.value.temperature;
          feelsLikeTemperature.value = weatherResponse.value.feelsLikeTemperature;
          windSpeed.value = weatherResponse.value.windSpeed;
          humidity.value = weatherResponse.value.humidity;
          pressure.value = weatherResponse.value.pressure;
          cloudsPercentage.value = weatherResponse.value.cloudsPercentage;
          weatherMainStatus.value = (_b = weatherResponse.value.weatherMainStatus) == null ? void 0 : _b.toLowerCase();
          weatherDescription.value = (_c = weatherResponse.value.weatherDescription) == null ? void 0 : _c.toUpperCase();
          weatherForecast.value = (_d = weatherResponse.value.daily) == null ? void 0 : _d.splice(1, 5);
        }
      } catch (error) {
        console.error("Failed to get the current weather data from the service due to: ", error);
      }
    };
    const props = __props;
    const latitude = ref(0);
    const longitude = ref(0);
    const todayDate = /* @__PURE__ */ new Date();
    const monthFromTodayDate = (_a = monthsMappedToNumbers.find((elem) => (elem == null ? void 0 : elem.index) === todayDate.getMonth())) == null ? void 0 : _a.elem;
    const formatedTodayDate = ref(`Today, ${todayDate.getDay()}, ${monthFromTodayDate}`);
    const temperature = ref(0);
    const feelsLikeTemperature = ref(0);
    const windSpeed = ref(0);
    const humidity = ref(0);
    const pressure = ref(0);
    const uvIndex = ref(0);
    const cloudsPercentage = ref(0);
    const weatherMainStatus = ref("");
    const weatherDescription = ref("");
    const weatherForecast = useState("weatherForecast", () => []);
    const weatherForecastErrorMessage = ref("");
    const city = ref("");
    const country = ref("");
    const iconByWeatherStatus = computed(() => getImageUrlByWeatherStatus(weatherMainStatus.value, true));
    const containerStyle = computed(() => ({
      backgroundImage: `url(${getImageUrlByWeatherStatus(weatherMainStatus.value, false)})`
    }));
    const router = useRoute$1();
    watch(() => props == null ? void 0 : props.locationToFind, (newLocation) => {
      if (newLocation) {
        city.value = newLocation;
      }
    });
    if (!router.redirectedFrom) {
      [__temp, __restore] = withAsyncContext(() => handleFindLocationByName(props == null ? void 0 : props.locationToFind)), await __temp, __restore();
    }
    [__temp, __restore] = withAsyncContext(() => handleWeatherRequest()), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      const _component_NuxtImg = _sfc_main$9;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "container",
        style: unref(containerStyle)
      }, _attrs))} data-v-5d74e088><section class="sub-container" data-v-5d74e088>`);
      if (weatherForecastErrorMessage.value) {
        _push(`<aside role="alert" class="error-msg" data-v-5d74e088>${ssrInterpolate(weatherForecastErrorMessage.value)}</aside>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="location-container" data-v-5d74e088><div data-v-5d74e088><span class="location-city" data-v-5d74e088>${ssrInterpolate(city.value ? city.value + ", " : "")}</span><span class="location-country" data-v-5d74e088>${ssrInterpolate(country.value)}</span></div><span class="date" data-v-5d74e088>${ssrInterpolate(formatedTodayDate.value)}</span></div>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "weather-illustration",
        src: unref(iconByWeatherStatus),
        alt: weatherDescription.value,
        title: weatherDescription.value
      }, null, _parent));
      _push(`<section class="summary-container" data-v-5d74e088><h3 title="Temperature. Units - metric: Celsius" class="temperature" style="${ssrRenderStyle({ color: temperature.value && temperature.value > 18 ? "orange" : "rgb(100, 177, 255)" })}" data-v-5d74e088>${ssrInterpolate(temperature.value)}\xBA </h3><div class="feels-like-temperature-container" data-v-5d74e088><span data-v-5d74e088>Feels like:</span><h4 title="Feels like temperature. Units - metric: Celsius" class="feels-like-temperature" style="${ssrRenderStyle({ color: feelsLikeTemperature.value && feelsLikeTemperature.value > 18 ? "orange" : "rgb(100, 177, 255)" })}" data-v-5d74e088>${ssrInterpolate(feelsLikeTemperature.value ? feelsLikeTemperature.value + "\xBA" : "0\xBA")}</h4></div></section><article class="weather-container" data-v-5d74e088><div class="condition-container" data-v-5d74e088><div class="condition" title="The current wind speed in km/h" data-v-5d74e088>`);
      _push(ssrRenderComponent(WindIcon, null, null, _parent));
      _push(`<div class="value" data-v-5d74e088><span class="title" data-v-5d74e088>Wind speed</span><span data-v-5d74e088>${ssrInterpolate(windSpeed.value)} KM/H</span></div></div><div class="condition" title="The current humidity of the air in %" data-v-5d74e088>`);
      _push(ssrRenderComponent(HumidityIcon, null, null, _parent));
      _push(`<div class="value" data-v-5d74e088><span class="title" data-v-5d74e088>Humidity</span><span data-v-5d74e088>${ssrInterpolate(humidity.value)} %</span></div></div><div class="condition" title="Atmospheric pressure on the sea level, hPa" data-v-5d74e088>`);
      _push(ssrRenderComponent(PressureIcon, null, null, _parent));
      _push(`<div class="value" data-v-5d74e088><span class="title" data-v-5d74e088>Pressure</span><span data-v-5d74e088>${ssrInterpolate(pressure.value)} hPa</span></div></div><div class="condition" title="The current UV index" data-v-5d74e088>`);
      _push(ssrRenderComponent(UVIndexIcon, null, null, _parent));
      _push(`<div class="value" data-v-5d74e088><span class="title" data-v-5d74e088>UV index</span><span data-v-5d74e088>${ssrInterpolate(uvIndex.value)}</span></div></div></div>`);
      if ((_a2 = unref(weatherForecast)) == null ? void 0 : _a2.length) {
        _push(`<div data-v-5d74e088>`);
        _push(ssrRenderComponent(WeatherForecast, { weatherForecast: unref(weatherForecast) }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</article></section></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/weather-status/weather-status.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-5d74e088"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "hero",
  __ssrInlineRender: true,
  props: ["locationToFind"],
  setup(__props) {
    const props = __props;
    const locationToFind = ref(props == null ? void 0 : props.locationToFind);
    watch(() => props == null ? void 0 : props.locationToFind, (newLocation) => {
      locationToFind.value = newLocation;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_WeatherStatus = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "hero-container" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_WeatherStatus, { locationToFind: unref(locationToFind) }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/hero/hero.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<dialog${ssrRenderAttrs(mergeProps({
    open: "true",
    class: "overlay"
  }, _attrs))}><h1 class="title">Loading content...</h1><a href="/" class="retry-btn"> Retry </a></dialog>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/overlay/overlay.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Overlay = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { Overlay as O, _sfc_main$1 as _ };
//# sourceMappingURL=overlay-DTVkehbL.mjs.map
