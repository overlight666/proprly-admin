"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vite_1 = require("vite");
var plugin_react_1 = require("@vitejs/plugin-react");
var vite_plugin_svgr_1 = require("vite-plugin-svgr");
// https://vite.dev/config/
exports.default = (0, vite_1.defineConfig)({
    optimizeDeps: {
        exclude: ["@szhsin/react-accordion"],
    },
    plugins: [
        (0, plugin_react_1.default)(),
        (0, vite_plugin_svgr_1.default)({
            svgrOptions: {
                icon: true,
                // This will transform your SVG to a React component
                exportType: "named",
                namedExport: "ReactComponent",
            },
        }),
    ],
    preview: {
        allowedHosts: ["admin-dev.proprly.tech", "admin-staging.proprly.tech"], //added this
    },
    server: {
        cors: {
            origin: [
                "admin-dev.proprly.tech",
                "admin-staging.proprly.tech",
                "http://localhost:5173",
            ],
            methods: ["GET", "POST"],
            allowedHeaders: ["Content-Type"],
        },
        allowedHosts: ["admin-dev.proprly.tech", "admin-staging.proprly.tech"], //added this
    },
});
