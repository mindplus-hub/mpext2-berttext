import ArgumentType from "../utils/argument-type";
import BlockType from "../utils/block-type";
import blockIconURI from "./icon/blockIcon.svg";
import menuIconURI from "./icon/menuIcon.svg";
import func from "./func";
import { setLocaleData, formatMessage, setLocale } from "../utils/translation";
import LocaleData from "./locales";

setLocaleData(LocaleData);

class berttext {
    constructor(runtime, extensionId) {
        this.runtime = runtime;
        // Python模式的执行方法
        this.funcs = new func(runtime, extensionId);
    }

    // 切换翻译的钩子
    setLocale(locale) {
        setLocale(locale);
    }

    // 返回积木的生成代码方法
    getCodePrimitives() {
        return this.funcs;
    }

    // 返回积木信息（必须实现）
    getInfo() {
        return {
            name: formatMessage({
                id: 'gui.blocklyText.berttext.extensionName',
                default: 'Word Embedding'
            }),
            blockIconURI: blockIconURI,
            menuIconURI: menuIconURI,
            color1: "#FF8C00",
            color2: "#FF7C00", 
            color3: "#FF6C00",
            blocks: [
                {
                    opcode: 'init',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'gui.blocklyText.berttext.init',
                        default: 'Initialize module'
                    })
                },
                {
                    opcode: 'readcap1',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'gui.blocklyText.berttext.readcap1',
                        default: 'Set [CLS] recognition result category [CLASS]'
                    }),
                    arguments: {
                        CLS: {
                            type: ArgumentType.STRING,
                            defaultValue: 'words'
                        },
                        CLASS: {
                            type: ArgumentType.STRING,
                            inputParams: { 
                                symbol: '[]'
                            },
                            defaultValue: "'king','queen','apple'"
                        }
                    }
                },
                {
                    opcode: 'readcapq',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'gui.blocklyText.berttext.readcapq',
                        default: 'Use tool at path [PATH] to convert words in [CLS] to word vectors'
                    }),
                    arguments: {
                        PATH: {
                            type: ArgumentType.STRING,
                            inputParams: { 
                                symbol: '""'
                            },
                            defaultValue: 'checkpoint'
                        },
                        CLS: {
                            type: ArgumentType.STRING,
                            defaultValue: 'words'
                        }
                    }
                },
                '---',
                {
                    opcode: 'readcap1a1',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'gui.blocklyText.berttext.readcap1a1',
                        default: 'Get word vectors of all words'
                    })
                },
                {
                    opcode: 'readcap1a',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'gui.blocklyText.berttext.readcap1a',
                        default: 'Get word vector of the [NUM]th word'
                    }),
                    arguments: {
                        NUM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                },
                '---',
                {
                    opcode: 'readcap1b',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'gui.blocklyText.berttext.readcap1b',
                        default: 'Get visual display of all word vectors [PATH]'
                    }),
                    arguments: {
                        PATH: {
                            type: ArgumentType.STRING,
                            inputParams: { 
                                symbol: '""'
                            },
                            defaultValue: 'word_vectors.html'
                        }
                    }
                },
                {
                    opcode: 'readcap2',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'gui.blocklyText.berttext.readcap2',
                        default: 'Calculate similarity between all word vectors and output'
                    })
                }
            ],
            menus: {
                // 如果需要下拉菜单可以在这里定义
            }
        };
    }
}

export default berttext;
