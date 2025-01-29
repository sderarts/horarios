module.exports = {
    // other webpack configuration...
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Matches .js and .jsx files
                exclude: /node_modules/, // Don't process files in node_modules
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'] // Use the React preset for JSX
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'] // Make sure to resolve .jsx extensions
    }
};
