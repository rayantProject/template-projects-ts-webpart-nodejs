import * as path from 'path';
import * as webpack from 'webpack';

export default ( argv: { [key: string]: string }) => { 

const config: webpack.Configuration = {
    target: "node",
    mode: argv.mode === "production" ? "production" : "development",
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.(ts|js)$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }]
    },
};

return config;
}
