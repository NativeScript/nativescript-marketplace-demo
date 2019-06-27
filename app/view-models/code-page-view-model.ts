/// <reference path="../typings/highlightjs.d.ts" />
import { Observable } from "tns-core-modules/data/observable";
import * as fs from "tns-core-modules/file-system";
import { Example, ExampleGroup } from "./examples-model";
import * as hljs from "highlight.js/lib/index";

hljs.configure({
    tabReplace: "  ",
    useBR: true
});

const style: string = require("./code-highlight.css");

const extensionToLanguage = {
    ".js": "javascript",
    ".ts": "typescript",
    ".css": "css",
    ".xml": "xml",
    ".json": "json"
};

export class CodePageViewModel extends Observable {
    public files: Array<fs.FileSystemEntity>;
    public group: ExampleGroup;

    constructor(example: Example) {
        super();

        const lastSlashIndex = example.path.lastIndexOf("/");
        const initialSelectedFile = example.path.substr(lastSlashIndex + 1) + ".xml";
        let path = example.path.substring(0, lastSlashIndex);
        path = fs.path.join(fs.knownFolders.currentApp().path, path.replace("~/", ""));
        console.log("Showing code for " + path);

        const folder = fs.Folder.fromPath(path);
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
            var formattedCode = hljs.highlight(lang, codeString).value;
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

