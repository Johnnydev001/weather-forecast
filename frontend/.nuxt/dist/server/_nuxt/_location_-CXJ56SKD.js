import { u as useRoute } from "../server.mjs";
import { defineComponent, computed, unref, useSSRContext } from "vue";
import { ssrRenderSuspense, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1, O as Overlay } from "./overlay-BOqJpdhM.js";
import "node:http";
import "node:https";
import "node:zlib";
import "node:stream";
import "node:buffer";
import "node:util";
import "node:url";
import "node:net";
import "node:fs";
import "node:path";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "radix3";
import "devalue";
import "./vue.65b7bcda-8_knhzqr.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[location]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const routeLocation = computed(() => {
      var _a;
      return (_a = route == null ? void 0 : route.params) == null ? void 0 : _a.location;
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          _push(ssrRenderComponent(_sfc_main$1, { locationToFind: unref(routeLocation) }, null, _parent));
        },
        fallback: () => {
          _push(ssrRenderComponent(Overlay, null, null, _parent));
        },
        pending: () => {
          _push(ssrRenderComponent(Overlay, null, null, _parent));
        },
        _: 1
      });
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[location].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_location_-CXJ56SKD.js.map
