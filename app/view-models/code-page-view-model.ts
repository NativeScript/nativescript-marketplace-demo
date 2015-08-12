/// <reference path="../typings/highlightjs.d.ts" />
import observable = require("data/observable");
import fs = require("file-system");
import examplesVM = require("./examples-model");
import hljs = require("highlight.js/lib/index");
hljs.configure({
    tabReplace: "  ",
    useBR: true
});

var extensionToLanguage = {
    ".js": "javascript",
    ".ts": "typescript",
    ".css": "css",
    ".xml": "xml"
}

var cssPath = "styles/code-highlight.css"
var style: string;

function loadStyles() {
    var path = fs.path.join(fs.knownFolders.currentApp().path, cssPath);

    if (!fs.File.exists(path)) {
        throw new Error("Could not find code-highlight.css. Lookup path: " + path);
    }

    style = fs.File.fromPath(path).readTextSync((error) => {
        console.log("Error loading style file: " + error);
    });
};
loadStyles();

export class CodePageViewModel extends observable.Observable {
    public files: Array<fs.FileSystemEntity>;

    constructor(example: examplesVM.Example) {
        super();

        var path = example.path.substring(0, example.path.lastIndexOf("/"));
        path = fs.path.join(fs.knownFolders.currentApp().path, path.replace("~/", ""));
        console.log("Showing code for " + path);

        var folder = fs.Folder.fromPath(path);
        folder.getEntities().then((entities) => {
            this.set("files", entities);
        });
    }

    public selectFile(entity: fs.FileSystemEntity) {
        var codeFile = fs.File.fromPath(entity.path);
        var lang = extensionToLanguage[codeFile.extension];

        codeFile.readText().then((codeString) => {
            var formattedCode = hljs.highlight("javascript", codeString).value;
            formattedCode = hljs.fixMarkup(formattedCode);
            formattedCode = "<style>" + style + "</style><pre><code>" + formattedCode + "</pre></code>"

            console.log("FORMATTED CODE:");
            console.log(formattedCode);

            this.set("formattedCode", formattedCode);
        }, (error) => {
            console.log("readText() error: " + error);
        })
    }
}

