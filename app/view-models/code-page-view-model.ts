/// <reference path="../typings/highlightjs.d.ts" />
import * as observable from "data/observable";
import * as fs from "file-system";
import * as examplesVM from "./examples-model";
import * as hljs from "highlight.js/lib/index";
hljs.configure({
    tabReplace: "  ",
    useBR: true
});

var cssPath = "styles/code-highlight.css"
var style: string;
var extensionToLanguage = {
    ".js": "javascript",
    ".ts": "typescript",
    ".css": "css",
    ".xml": "xml",
    ".json": "json"
};

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
    public group: examplesVM.ExampleGroup;

    constructor(example: examplesVM.Example) {
        super();

        var lastSlashIndex = example.path.lastIndexOf("/");
        var initialSelectedFile = example.path.substr(lastSlashIndex + 1) + ".xml";
        var path = example.path.substring(0, lastSlashIndex);
        path = fs.path.join(fs.knownFolders.currentApp().path, path.replace("~/", ""));
        console.log("Showing code for " + path);

        var folder = fs.Folder.fromPath(path);
        folder.getEntities().then((entities) => {
            entities = entities.filter((e) => (e instanceof fs.File));
            this.set("files", entities);
            this.selectFile(initialSelectedFile);
        });
        
        this.set("group", example.group);
    }

    public selectFile(fileName: string) {
        for (var i = 0; i < this.files.length; i++) {
            if (this.files[i].name === fileName) {
                this.selectFileEntity(this.files[i]);
                break;
            }
        }
    }

    private selectFileEntity(entity: fs.FileSystemEntity) {
        this.set("isLoading", true);
        this.set("selectedFileName", entity.name);

        var codeFile = fs.File.fromPath(entity.path);
        var lang = extensionToLanguage[codeFile.extension];

        codeFile.readText().then((codeString) => {
            var formattedCode = hljs.highlight("javascript", codeString).value;
            formattedCode = hljs.fixMarkup(formattedCode);
            formattedCode = "<style>" + style + "</style><pre><code>" + formattedCode + "</pre></code>"

            this.set("isLoading", false);
            this.set("formattedCode", formattedCode);
        }, (error) => {
            this.set("isLoading", false);
            console.log("readText() error: " + error);
        })
    }
}

