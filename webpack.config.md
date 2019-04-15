Add the following in a newly generated webpack.config.js

```JS
new CopyWebpackPlugin([
                { from: { glob: "examples/**" } },
                { from: { glob: "views/**" } },
                { from: { glob: "fonts/**" } },
                { from: { glob: "**/*.jpg" } },
                { from: { glob: "**/*.png" } },
            ]
```