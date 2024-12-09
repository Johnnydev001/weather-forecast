import { defineComponent, ref, watch, unref, useSSRContext } from 'vue';
import { n as navigateTo } from './server.mjs';
import { ssrRenderSuspense, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$1, O as Overlay } from './overlay-DTVkehbL.mjs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'fs';
import 'path';
import 'ipx';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import './vue.65b7bcda-8_knhzqr.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const locationToFind = ref("");
    const navigator = ref(void 0);
    const latitude = ref(0);
    const longitude = ref(0);
    const handleFindLocationByCoordinates = async (lat, lon) => {
      try {
        return await $fetch("/api/location", {
          method: "POST",
          body: {
            lat,
            lon
          }
        });
      } catch (error) {
        console.error("Failed to get the location data from the server due to: ", error);
      }
    };
    const handleSetCoordinates = () => {
      var _a, _b, _c;
      if (navigator == null ? void 0 : navigator.value)
        if ((_a = navigator == null ? void 0 : navigator.value) == null ? void 0 : _a.geolocation) {
          (_c = (_b = navigator == null ? void 0 : navigator.value) == null ? void 0 : _b.geolocation) == null ? void 0 : _c.getCurrentPosition(
            (position) => {
              latitude.value = position.coords.latitude;
              longitude.value = position.coords.longitude;
            },
            (error) => {
              console.error("Error fetching location due to:", error);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
    };
    handleSetCoordinates();
    watch([latitude, longitude], async ([newLatitude, newLongitude]) => {
      const locationByCoordinates = await handleFindLocationByCoordinates(newLatitude, newLongitude);
      if (locationByCoordinates) {
        locationToFind.value = (locationByCoordinates == null ? void 0 : locationByCoordinates.city) || (locationByCoordinates == null ? void 0 : locationByCoordinates.name) || "";
        navigateTo(`/${locationToFind.value}`);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          _push(ssrRenderComponent(_sfc_main$1, { locationToFind: unref(locationToFind) }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BwmNk16o.mjs.map
