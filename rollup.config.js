import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import obfuscator from "rollup-plugin-obfuscator";
import copy from "rollup-plugin-copy";

const isProduction = process.env.NODE_ENV === "production";

const config = {
	input: "src/main.ts",
	output: {
		dir: "dist/lib",
		format: "es",
		sourcemap: !isProduction, // Only include sourcemaps in development
	},
	plugins: [
		nodeResolve({
			browser: true,
			preferBuiltins: false,
		}),
		typescript({
			tsconfig: "./tsconfig.json",
		}),
		copy({
			targets: [
				{ src: "module.json", dest: "dist" },
				{ src: "README.md", dest: "dist" },
				{ src: "LICENSE", dest: "dist" },
				{ src: "templates", dest: "dist" },
			],
		}),
		// Apply minification and obfuscation only in production
		...(isProduction
			? [
					terser({
						compress: {
							drop_console: true, // Remove console.log statements
							drop_debugger: true, // Remove debugger statements
							passes: 2, // Number of compression passes
						},
						mangle: {
							toplevel: true, // Mangle top-level variable names
							properties: false, // Don't mangle object properties (important for FoundryVTT)
						},
						format: {
							comments: false, // Remove all comments
						},
					}),
					obfuscator({
						compact: true,
						controlFlowFlattening: true,
						controlFlowFlatteningThreshold: 0.5,
						deadCodeInjection: true,
						deadCodeInjectionThreshold: 0.3,
						debugProtection: false, // Keep false to avoid breaking FoundryVTT
						debugProtectionInterval: false,
						disableConsoleOutput: false, // Keep console output for FoundryVTT compatibility
						identifierNamesGenerator: "hexadecimal",
						log: false,
						renameGlobals: false, // CRITICAL: Don't rename globals for FoundryVTT compatibility
						renameProperties: false, // CRITICAL: Don't rename properties for FoundryVTT compatibility
						rotateStringArray: true,
						selfDefending: false, // Keep false to avoid issues with FoundryVTT
						shuffleStringArray: true,
						splitStrings: true,
						splitStringsChunkLength: 8,
						stringArray: true,
						stringArrayCallsTransform: true,
						stringArrayEncoding: ["base64"],
						stringArrayThreshold: 0.5,
						transformObjectKeys: false, // CRITICAL: Keep false for FoundryVTT API compatibility
						unicodeEscapeSequence: false,
					}),
			  ]
			: []),
	],
	external: [], // Add any external dependencies here if needed
};

export default config;
