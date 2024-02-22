//Represents a BB tag
export class BBTag {

    public tagName: string; //The name of the tag
    public insertLineBreaks: boolean; //Indicates if line breaks are inserted inside the tag content
    public suppressLineBreaks: boolean; //Suppresses any line breaks for nested tags
    public noNesting: boolean; //Indicates if the tag supports nested tags
    public markupGenerator: (tag: BBTag, content: string, attr: { [key: string]: string }) => string ;
    //Creates a new BB tag
    constructor() {
        this.tagName = "";
        this.insertLineBreaks = true;
        this.suppressLineBreaks = false;
        this.noNesting = false;
        this.markupGenerator = (tag, content, attr) => {
            return "<" + tag.tagName + ">" + content + "</" + tag.tagName + ">";
        };

    }


public static create(name: string, insertLineBrks: boolean, suppressLineBreaks: boolean, noNesting: boolean, markupGenerator: (tag: BBTag, content: string, attr: { [key: string]: string }) => string, insertLineBreaks: boolean = true) {
    let bbtag = new BBTag();
    bbtag.tagName = name;
    bbtag.insertLineBreaks = insertLineBrks;
    bbtag.suppressLineBreaks = suppressLineBreaks;
    bbtag.noNesting = noNesting;
    if (markupGenerator) {
        bbtag.markupGenerator = markupGenerator;
    } 

    return bbtag;
}

        //Creates a new simple tag
    public static createBasicTag(tagName: string, insertLineBreaks: boolean , suppressLineBreaks: boolean, noNesting: boolean) {
        let bbtag = new BBTag();
        bbtag.tagName = tagName;
        bbtag.insertLineBreaks = insertLineBreaks;
        bbtag.suppressLineBreaks = suppressLineBreaks;
        bbtag.noNesting = noNesting;

        return bbtag;

    }

    //Creates a new simple tag
    public static createSimpleTag(tagName: string, insertLineBreaks: boolean = true) {
        return BBTag.createBasicTag(tagName, insertLineBreaks, false, false);
    }

    //Creates a tag with the given generator
    public static createTag(tagName: string, markupGenerator: (tag: BBTag, content: string, attr: { [key: string]: string }) => string, insertLineBreaks: boolean = true) {
        let bbtag = new BBTag();
        bbtag.tagName = tagName;
        bbtag.insertLineBreaks = insertLineBreaks;
        bbtag.suppressLineBreaks = false;
        bbtag.noNesting = false;
        if (markupGenerator) {
            bbtag.markupGenerator = markupGenerator;
        }
    
        return bbtag;
    }
}