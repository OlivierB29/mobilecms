import {BBTag} from "./bbTag";
//The type of a token
export enum TokenType { Text, StartTag, EndTag }

//Represents a token
export class Token {
    public tagAttributes: { [key: string]: string };
    public tagStr: string;

    constructor(public tokenType: TokenType, public content: string) {
        this.tagAttributes = {};
        this.tagStr = '';
    }

    //string representation of the token
    tostring() {
        return this.content + " (" + TokenType[this.tokenType] + ")";
    }

    //Check for equality
    equals(token: Token) {
        return this.tokenType == token.tokenType && this.content == token.content;
    }
}

//Creates a new text token
function textToken(content: string) {
    return new Token(TokenType.Text, content);
}

//Converts the given token to a text token
function asTextToken(token: Token) {
    if (token.tokenType == TokenType.StartTag) {
        token.content = token.tagStr;
        token.tokenType = TokenType.Text;
        //delete token.attributes;
        //delete token.tagStr;
    }

    if (token.tokenType == TokenType.EndTag) {
        token.content = "[/" + token.content + "]";
        token.tokenType = TokenType.Text;
    }
}

//Represents a tokenizer
export class Tokenizer {

    //Creates a new tokenizer with the given tags
    constructor(private bbTags: { [key: string]: BBTag }, 
        public options : any
        ) {

    }

    //Tokenizes the given string
    tokenizeString(str: string) {
        let tokens = this.getTokens(str);
        let newTokens = new Array<Token>();

        let noNesting = false;
        let noNestingTag = "";
        let noNestedTagContent = "";

        for (let i in tokens) {
            let currentToken = tokens[i];
            let bbTag: BBTag = this.bbTags[currentToken.content];
            let addTag = true;

            //Replace invalid tags with text
            if (bbTag === undefined && !noNesting) {
                asTextToken(currentToken);
            } else {
                //Check if current tag doesn't support nesting
                if (noNesting) {
                    if (currentToken.tokenType == TokenType.EndTag && currentToken.content == noNestingTag) {
                        noNesting = false;
                        newTokens.push(textToken(noNestedTagContent));
                    } else {
                        asTextToken(currentToken);
                        noNestedTagContent += currentToken.content;
                        addTag = false;
                    }
                } else {
                    if (bbTag.noNesting && currentToken.tokenType == TokenType.StartTag) {
                        noNesting = true;
                        noNestingTag = currentToken.content;
                        noNestedTagContent = "";
                    }
                }
            }

            if (addTag) {
                newTokens.push(currentToken);
            }
        }

        return newTokens;
    }

    //Gets the tokens from the given string
    getTokens(str: string) {
        let pattern = "\\[(\/\\w*)\\]|\\[(\\w*)+(=([\"])" + this.options.attrValueChars + "*\\4)?( (" + this.options.attrNameChars + "+)?=([\"])(" + this.options.attrValueChars + "+)\\7)*\\]";
        let tagPattern = new RegExp(pattern, "g");
        let tokens = new Array<Token>();

        let match;
        let lastIndex = 0;

        while (match = tagPattern.exec(str)) {
            let delta = match.index - lastIndex;

            if (delta > 0) {
                tokens.push(textToken(str.substr(lastIndex, delta)));
            }

            tokens.push(this.tagToken(match));
            lastIndex = tagPattern.lastIndex;
        }

        let delta = str.length - lastIndex;

        if (delta > 0) {
            tokens.push(textToken(str.substr(lastIndex, delta)));
        }

        return tokens;
    }


//Creates a new tag token
 tagToken(match: any) {
    if (match[1] == undefined) { //Start tag
        let tagName = match[2];
        let attributes : { [key: string]: string } = {};
        let attrPattern = new RegExp("(" + this.options.attrNameChars + "+)?=([\"])(" + this.options.attrValueChars + "+)\\2", "g");

        let attrStr = match[0].substr(1 + tagName.length, match[0].length - 2 - tagName.length);

        let attrMatch;
        while (attrMatch = attrPattern.exec(attrStr)) {
            if (attrMatch[1] == undefined) { //The tag attribute
                attributes[tagName] = attrMatch[3];
            } else { //Normal attribute
                attributes[attrMatch[1]] = attrMatch[3];
            }
        }
        let t = new Token(TokenType.StartTag, tagName);
        t.tagAttributes = attributes;
        t.tagStr = match[0];
        return t;
    } else { //End tag
        return new Token(TokenType.EndTag, match[1].substr(1, match[1].length - 1));
    }
}

}
