module.exports = {
    entry: './src/index.jsx',
    output: {
        path: __dirname,
        filename: 'build.js'
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'jsx-loader!babel-loader' },
            { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' }
        ]
    }
}