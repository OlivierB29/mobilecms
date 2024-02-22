
import {Tokenizer} from "./tokenizer";
import {Token} from "./tokenizer";
import {TokenType} from "./tokenizer";
import {BBTag} from "./bbTag";
import {BBCodeParser} from "./bbCodeParser";

//The types of the trees
export enum TreeType { Root, Text, Tag }

//Represents a parse tree
export class BBCodeParseTree {
    public attributes: { [key: string]: string } = {};
    public subTrees: Array<BBCodeParseTree>;
    //Creates a new parse tree
    constructor(public treeType: TreeType, public content: string) {
        this.attributes = {};
        this.subTrees = new Array<BBCodeParseTree>();
    }

    //Indicates if the current tree is valid
    isValid() {
        //An tree without subtrees is valid
        if (this.subTrees.length == 0) {
            return true;
        }

        //An tree is valid if all of its subtrees are valid
        for (let i in this.subTrees) {
            let currentTree = this.subTrees[i];

            if (currentTree == null || !currentTree.isValid()) {
                return false;
            }
        }

        return true;
    }

    //string representation of the tree
    toString() {
        return TreeType[this.treeType] + " - " + this.content;
    }

    //Builds a parse tree from the given string
    public static buildTree(str: string, bbTags: { [key: string]: BBTag }, options: any
         ) {
        //Get the tokens
        let tokenizer = new Tokenizer(bbTags, options);
        let tokens = tokenizer.tokenizeString(str);

        //Build the tree
        return BBCodeParseTree.buildTreeFromTokens(
            new BBCodeParseTree(
                TreeType.Root,
                str),
            tokens.reverse());
    }

    //Builds a tree from the given tokens
    private static buildTreeFromTokens(rootTree: BBCodeParseTree , tokens: Array<Token>, currentTag = ""): BBCodeParseTree  {
        //The root root is invalid, return null
        if (rootTree == null) {
            return BBCodeParseTree.trick();
        }

        //There are no more tokens, return the root
        if (tokens.length == 0) {
            return rootTree;
        }

        //Remove the first token
        let currentToken = tokens.pop();

        //Add the text token as a text parse tree
        if (currentToken && currentToken.tokenType == TokenType.Text) {
            rootTree.subTrees.push(new BBCodeParseTree(
                TreeType.Text,
                currentToken.content));
        }

        //Create a new tag tree and find its subtrees
        if (currentToken && currentToken.tokenType == TokenType.StartTag) {
            let tagName = currentToken.content;
            let bBCodeParseTree = new BBCodeParseTree(
                TreeType.Tag,
                tagName,
                );
                bBCodeParseTree.attributes = currentToken.tagAttributes;
            rootTree.subTrees.push(
                
                BBCodeParseTree.buildTreeFromTokens(bBCodeParseTree,
                    tokens,
                    tagName));
        }

        //Check if its the correct end tag
        if (currentToken && currentToken.tokenType == TokenType.EndTag) {
            let tagName = currentToken.content;

            if (tagName == currentTag) {
                return rootTree;
            }
            else {
                return BBCodeParseTree.trick();
            }
        }

        //If we got no more tokens, and we have opened an tag but not closed it, return null
        if (tokens.length == 0) {
            if (currentTag != "") {
                return BBCodeParseTree.trick();
            }
        }

        //Proceed to the next token
        return BBCodeParseTree.buildTreeFromTokens(rootTree, tokens, currentTag);
    }

    /**
     * explicit dirty trick for TS2322
     */
    private static trick(): any {
        return null;
    }
}
