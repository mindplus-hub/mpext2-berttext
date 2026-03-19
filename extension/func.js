class func {
    constructor(runtime, extensionId) {
        this.runtime = runtime;
        this.extensionId = extensionId;
    }

    // 初始化模块
    init(generator, block, parameter) {
        generator.addImport(`from XEdu.hub import Workflow as wf
import numpy as np
from PCA import *`);
        return '';
    }

    // 设置识别结果类别
    readcap1(generator, block, parameter) {
        let cls = parameter.CLS.code;
        let classes = parameter.CLASS.code;
        generator.addInit('classes_vocabulary', `${cls} = ${classes}
words_valus = ${cls}`, 5, true);
        return '';
    }

    // 将词汇转为词向量
    readcapq(generator, block, parameter) {
        let path = parameter.PATH.code;
        let cls = parameter.CLS.code;
        return `txt_emb = wf(task='embedding_text',download_path=${path})
txt_embeddings = txt_emb.inference(data=${cls})
# 将词向量转换为numpy数组
vectors = np.array(txt_embeddings)
data_dict = {word: vector for word, vector in zip(words_valus, vectors)}`;
    }

    // 获取全部词的词向量
    readcap1a1(generator, block, parameter) {
        return [`vectors`, generator.ORDER_UNARY_POSTFIX];
    }

    // 获取第N个的词向量
    readcap1a(generator, block, parameter) {
        let num = parameter.NUM.code;
        return [`vectors[${num} - 1]`, generator.ORDER_UNARY_POSTFIX];
    }



    // 获取全部词向量的可视化显示
    readcap1b(generator, block, parameter) {
        let path = parameter.PATH.code;
        return `visualize_data_3d_interactive_v1(data_dict, ${path})`;
    }

    // 计算全部词向量之间的相似度并输出
    readcap2(generator, block, parameter) {
        return [`run_ss(vectors,words_valus)`, generator.ORDER_UNARY_POSTFIX];
    }
}

export default func;
