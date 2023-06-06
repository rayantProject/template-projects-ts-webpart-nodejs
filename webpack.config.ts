import * as path from "path";
import * as webpack from "webpack";
import WebpackShellPluginNext from "webpack-shell-plugin-next";

export default (argv: { [key: string]: string }) => {
	const config: webpack.Configuration = {
		target: "node",
		mode: argv.mode === "production" ? "production" : "development",
		entry: "./src/main.ts",
		optimization: {
			moduleIds: "deterministic",
			splitChunks: {
				chunks: "all",
			},
		},
		output: {
			path: path.resolve(__dirname, "build"),
			filename: "index.js",
		},
		resolve: {
			extensions: [".ts", ".js"],
		},
		module: {
			rules: [
				{
					use: "ts-loader",
					exclude: /node_modules/,
				},
			],
		},
		plugins: [
			new WebpackShellPluginNext({
				onBuildStart: {
					scripts: [
						"echo \"your project is building...\"",
						"rimraf build",
						"rimraf dist",
					],
					blocking: true,
					parallel: false,
				},
				onBuildEnd: {
					scripts: ["echo \"your project is built\"", "node ./build/index.js"],
					blocking: false,
					parallel: true,
				},
			}),
		],
	};

	return config;
};
