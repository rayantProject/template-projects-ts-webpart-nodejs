import * as path from "path";
import * as webpack from "webpack";
import nodeExternals from "webpack-node-externals";
import WebpackShellPluginNext from "webpack-shell-plugin-next";

export default (argv: { [key: string]: string }) => {
    const config: webpack.Configuration = {
        target: "node",
        externals: [nodeExternals()],
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
            alias: {
                src: path.resolve(__dirname, "src"),
            },
        },
        module: {
            rules: [
                {
                    loader: "ts-loader",
                    exclude: /node_modules/,
                    test: /\.ts$/,
                },
            ],
        },
        plugins: [
            new WebpackShellPluginNext({
                onBuildStart: {
                    scripts: [
                        'echo "your project is building..."',
                        "rimraf build",
                        "rimraf dist",
                    ],
                    blocking: true,
                    parallel: false,
                },
                onBuildEnd: {
                    scripts: [
                        'echo "your project is built"',
                        "nodemon ./build/index.js --watch ./build",
                    ],
                    blocking: false,
                    parallel: true,
                },
            }),
        ],
    };

    return config;
};
