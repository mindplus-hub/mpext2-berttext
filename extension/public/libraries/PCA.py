# -*- coding: utf8 -*-
"""
PCA.py - 高维数据可视化工具
本模块提供了两种高维数据可视化方法：
1. visualize_data_3d_interactive_v0: 基础版本，输入为numpy数组
2. visualize_data_3d_interactive_v1: 增强版本，支持按类别着色和标注

功能特点：
- 支持PCA和t-SNE两种降维方法
- 生成交互式3D可视化图表
- 自动保存为HTML文件
- 支持多类别数据可视化

使用示例：
    # 基础版本
    data = np.random.rand(100, 256)
    visualize_data_3d_interactive_v0(data, 'outputs/result.html')
    
    # 增强版本
    data_dict = {
        'class1': np.random.randn(100, 50),
        'class2': np.random.randn(100, 50)
    }
    visualize_data_3d_interactive_v1(data_dict, 'outputs/result.html')
"""
import os
import numpy as np
import matplotlib.pyplot as plt
plt.switch_backend('agg')
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
import plotly.graph_objects as go

import warnings
warnings.filterwarnings("ignore")
def visualize_data_3d_interactive_v1(data_dict, save_path):
    """
    增强版本高维数据可视化函数
    
    参数:
        data_dict (dict): 输入数据字典，格式为{类别标签: 二维特征矩阵[n_samples, n_features]}
        save_path (str): 结果保存路径，自动添加_pca.html和_tsne.html后缀
    
    功能:
        1. 使用PCA和t-SNE将高维数据降维到3D
        2. 生成交互式3D可视化图表
        3. 自动保存为HTML文件
        4. 支持多类别数据可视化
    
    返回:
        无返回值，直接保存结果文件到指定路径
    """
    # 获取文件名和扩展名
    file_name = os.path.basename(save_path)
    name, extension = os.path.splitext(file_name)

    # 在你指定的目录下创建新的文件路径
    folder_path = os.path.dirname(save_path)  # 获取原始文件路径的目录部分
    new_folder_path = os.path.join(folder_path, "outputs")  # 在原始目录下添加新的子目录
    save_path = os.path.join(new_folder_path, name)  # 在新的子目录下创建文件

    # 创建新的目录
    os.makedirs(new_folder_path, exist_ok=True)
    # 准备空列表来存储所有数据点和颜色
    all_data = []
    colors = []
    pid_index = 0  # 用于为每个pid分配不同的颜色
    texts = []  # 用于存储文本标签
    
    # 提取颜色映射
    color_palette = plt.cm.get_cmap('tab10', len(data_dict))
    
    # 将每个类别的数据点收集到一起
    for pid, features in data_dict.items():
        # 确保特征矩阵是二维的
        features = np.atleast_2d(features)
        all_data.append(features)
        colors.extend([color_palette(pid_index)] * features.shape[0])
        # 初始化所有文本为空，仅第一个数据点显示标签
        texts.extend([""] * features.shape[0])
        texts[len(texts) - features.shape[0]] = pid  # 为第一个特征设置标签
        pid_index += 1
    
    # 合并所有数据
    all_data = np.vstack(all_data)
    
    # 颜色格式转换
    plotly_colors = [
        f'rgb({int(c[0]*255)},{int(c[1]*255)},{int(c[2]*255)})' 
        for c in colors
    ]
    # 检查并处理数据中的缺失值或无穷大的值
    if np.any(np.isnan(all_data)):
        all_data = np.where(np.isnan(all_data), np.nanmean(all_data), all_data)
    if np.any(np.isinf(all_data)):
        all_data = np.where(np.isinf(all_data), np.finfo(np.float).max, all_data)
    
    # PCA处理
    print('Processing PCA...')
    n_samples, n_features = all_data.shape
    n_components = min(n_samples, n_features, 3)
    pca = PCA(n_components=n_components)
    X_pca = pca.fit_transform(all_data)
    
    # 维度填充
    if n_components < 3:
        X_pca = np.hstack([X_pca, np.zeros((X_pca.shape[0], 3 - n_components))])
        
    # 创建PCA可视化
    fig_pca = go.Figure(data=[go.Scatter3d(
        x=X_pca[:, 0], 
        y=X_pca[:, 1], 
        z=X_pca[:, 2],
        mode='markers+text',
        text=texts,
        marker=dict(
            size=8,
            color=plotly_colors,
            opacity=0.8
        ),
        textposition="top center"
    )])
    fig_pca.update_layout(
        title='PCA 3D Visualization',
        scene=dict(
            xaxis_title='Principal Component 1',
            yaxis_title='Principal Component 2',
            zaxis_title='Principal Component 3'
        )
    )
    fig_pca.write_html(save_path + extension)
    

# 计算余弦相似度
def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


def run_ss(vectors,words):
    for i, word1 in enumerate(words):
        for j, word2 in enumerate(words):
            sim = cosine_similarity(vectors[i], vectors[j])
            print(f"{word1} - {word2}: {sim:.4f}")
        print()
    return ""