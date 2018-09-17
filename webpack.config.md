Add the following in a newly generated webpack.config.js

```JS
new CopyWebpackPlugin([
    { from: "examples/**" },
    { from: "views/**" },
    { from: "fonts/**" },
    { from: "**/*.jpg" },
    { from: "**/*.png" },
]
```