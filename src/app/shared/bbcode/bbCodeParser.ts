
import {TreeType}  from "./bbCodeParseTree";
import {BBTag} from "./bbTag";
import {BBCodeParseTree} from "./bbCodeParseTree";

//Indicates if the first string ends with the second str
function endsWith(str: string, endStr: string) {
    if (str.length == 0) {
        return false;
    }

    if (endStr.length > str.length) {
        return false;
    }

    let inStrEnd = str.substr(str.length - endStr.length, endStr.length);
    return endStr == inStrEnd;
}

//Indicates if the first string starts with the second string
function startsWith(str: string, startStr: string) {
    if (str.length == 0) {
        return false;
    }

    if (startStr.length > str.length) {
        return false;
    }

    let inStrStart = str.substr(0, startStr.length);
    return startStr == inStrStart;
}

let tagsToReplace: {[index: string]:string} = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};

//Escapes the given html
function escapeHTML(html: any) : any | any[] {
    return html.replace(/[&<>]/g, function (tag: any) {
        return tagsToReplace[tag] || tag;
    });
}

//Represents a BB code parser
export class BBCodeParser {
    //Creates a new parser with the given tags
    constructor(private bbTags: { [key: string]: BBTag }, private options = BBCodeParser.defaultOptions()) {

    }

    //Parses the given string
    public parseString(content: string, stripTags = false, insertLineBreak = true, escapingHtml = true) {
        //Create the parse tree
        let parseTree = BBCodeParseTree.buildTree(content, this.bbTags, this.options);

        //If the tree is invalid, return the input as text
        if (parseTree == null || !parseTree.isValid()) {
            return content;
        }

        //Convert it to HTML
        return this.treeToHtml(parseTree.subTrees, insertLineBreak, escapingHtml, stripTags);
    }

    //Converts the given subtrees into html
    private treeToHtml(subTrees: Array<BBCodeParseTree>, insertLineBreak: boolean, escapingHtml: boolean, stripTags = false) {
        let htmlstring = "";
        let suppressLineBreak = false;

        subTrees.forEach(currentTree => {
            if (currentTree.treeType == TreeType.Text) {
                let textContent = currentTree.content;

                if(escapingHtml){
                    textContent = (this.options.escapeHTML) ? escapeHTML(textContent) : textContent;
                }

                if (insertLineBreak && !suppressLineBreak) {
                    textContent = textContent.replace(/(\r\n|\n|\r)/gm, "<br>");
                    suppressLineBreak = false;
                }

                htmlstring += textContent;
            } else {
                //Get the tag
                let contextIndex = currentTree.content as string;
                let bbTag: BBTag = this.bbTags[contextIndex];
                
                let content = this.treeToHtml(currentTree.subTrees, bbTag.insertLineBreaks, escapingHtml, stripTags);

                //Check if to strip the tags
                if (bbTag && !stripTags && currentTree && currentTree.attributes ) {
    
                    htmlstring += bbTag.markupGenerator(bbTag, content, currentTree.attributes);
                    
                    
                } else {
                    htmlstring += content;
                }

                suppressLineBreak = bbTag.suppressLineBreaks;
            }
        });

        return htmlstring;
    }

    //Returns the default tags
    public static defaultTags(): { [key: string]: BBTag } {
        let bbTags : { [key: string]: BBTag } = {};
        
        //Simple tags
        bbTags["b"] = BBTag.createBasicTag("b", true, false, false);
        bbTags["i"] = BBTag.createBasicTag("i", true, false, false);
        bbTags["u"] = BBTag.createBasicTag("u", true, false, false);

        bbTags["text"] = BBTag.create("text", true, false, true, (tag, content, attr) => {
            return content;
        });

        bbTags["img"] = BBTag.create("img", true, false, false, (tag, content, attr) => {
            return "<img src=\"" + content + "\" />";
        });

        bbTags["url"] = BBTag.create("url", true, false, false, (tag, content, attr) => {
            let link = content;

            if (attr["url"]) {
                link = escapeHTML(attr["url"]);
            }

            if (!startsWith(link, "http://") && !startsWith(link, "https://")) {
                link = "http://" + link;
            }

            return "<a href=\"" + link + "\" target=\"_blank\">" + content + "</a>";
        });

        bbTags["code"] = BBTag.create("code", true, false, true, (tag, content, attr) => {
            let lang = attr["lang"];

            if (lang !== undefined) {
                return "<code class=\"" + escapeHTML(lang) + "\">" + content + "</code>";
            } else {
                return "<code>" + content + "</code>";
            }
        });

        return bbTags;
    }

    public static defaultOptions() {
            //let attrNameChars = "[a-zA-Z0-9\\.\\-_:;/]";
//let attrNameChars = "\\w";

// original pattern of https://github.com/svenslaggare/BBCodeParser
//let attrValueChars = "[a-zA-Z0-9\\.\\-_:;#/\\s]";

// allow all characters
//let attrValueChars = "[^\'\"]";


// url tag : allow ? , = , & for query parameters

        return {
            escapeHTML: false,
            attrNameChars : "[a-zA-Z0-9\\.\\-_:;/]",
            attrValueChars : "[\?\=\&a-zA-Z0-9\\.\\-_:;#/\\s]"        
     };
    }

    public static escapeHTML(content: string) {
        return escapeHTML(content);
    }

    public static startsWith(str:
        string, startStr: string) {
        return startsWith(str, startStr);
    }

    public static endsWith(str: string, endStr: string) {
        return endsWith(str, endStr);
    }
}
