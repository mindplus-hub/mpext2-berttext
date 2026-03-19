# Mind+ Extension Builder

Mind+ Extension Builder 是一个帮助开发者构建 Mind+ 编程模式扩展的工具。通过本项目，你可以轻松创建、构建和测试自定义扩展。

## 快速开始

1.  **安装依赖**
    ```bash
    npm install
    ```

2.  **构建示例程序**
    ```bash
    npm run build
    ```
    该命令会构建 `extension` 目录下的默认示例扩展。

## 开发指南

开发者应在 `extension` 文件夹下构建自己的扩展。

### 目录结构说明

-   `extension/`
    -   `index.js`: **主程序入口**。在这里构建 Block 和执行程序逻辑。
    -   `locales/`: **翻译文件**。存放扩展的多语言翻译资源。
    -   `public/`: **静态资源**。包含 `config.json` 配置文件和封面图片等。编译时会直接拷贝到 build 目录。

### 配置文件 (config.json)

`public/config.json` 是扩展的核心配置文件。详细参数如下：

#### 基础配置 (ExtensionBaseConfig)

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 扩展 ID。**只能包含字母和数字**，不能有特殊字符。 |
| `version` | string | 版本号。格式：`大版本.小版本.补丁版本` (如 1.0.0)。 |
| `mode` | string | 扩展模式 (upload/realtime/micrpython-block/python-block)。 |
| `name` | object | 扩展名称。格式：`{"en": "Name", "zh-cn": "名称"}`。 |
| `description` | object | 扩展描述。格式：`{"en": "Desc", "zh-cn": "描述"}`。 |
| `cover` | string | (可选) 封面图片路径。 |
| `author` | string | 作者。**只能包含字母和数字**，不能有特殊字符。 |
| `contributors` | string[] | (可选) 贡献者列表。 |
| `main` | string | 入口文件路径 (通常为 `index.js`)。 |
| `feature` | string[] | (可选) 分类标签。 |
| `isDevice` | boolean | 是否为设备扩展。 |
| `meta.extVersion` | string | 扩展接口版本。用于解决版本匹配问题。 |
| `libraryConfig` | array | (可选) Arduino 库配置。 |

#### 设备配置 (DeviceConfig) - 当 isDevice 为 true

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `supportPlatforms` | string[] | 支持的系统/架构。 |
| `boardConfig` | object | 主板配置 (编译和烧录用)。 |
| `boardConfig.board` | string | 主板名称 (如 "arduino:avr:uno")。 |
| `boardConfig.version` | string | 主板版本 (如 "1.8.6")。 |
| `boardConfig.fqbn` | string | (可选) FQBN 参数。 |
| `firmware` | object | (可选) 固件配置。 |
| `firmware.online` | string | 实时模式固件路径 (如 `./firmware/firmata.hex`)。 |

#### 纯扩展配置 (ExtensionConfig) - 当 isDevice 为 false

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `supportDevices` | object | 支持的主控设备版本映射。`{ "deviceId": "version_range" }` |
| `isSupportStage` | boolean | (可选) 是否支持舞台模式。 |

> 详细的 TypeScript 接口定义可参考项目源码或下方的类型声明。

### 开发手册

更详细的扩展开发手册请参考 `docs/` 目录下的文档：

-   [上传模式扩展开发指南](docs/上传模式扩展开发指南.md)
-   [Python积木模式扩展开发指南](docs/Python积木模式扩展开发指南.md)
-   [通用-定义Block](docs/通用-定义block.md)

## 构建与测试

### 构建

扩展程序编写完成后，运行以下命令进行构建：

```bash
npm run build
```

### 本地测试

1.  运行 **Mind+** 软件。
2.  打开相应的模式页面。
3.  点击右上角设置图标，在弹窗中开启 **开发者模式**。
4.  打开 **扩展库**。
5.  点击 **[加载测试扩展]** 按钮，选择 `build` 目录下的扩展 `config.json` 文件。

## 上架申请

测试完成并准备发布时，请发送邮件至 `mindplus@dfrobot.com` 进行申请。

**邮件内容需包含：**

1.  **仓库链接**: 扩展的源码仓库地址（需开源）。
2.  **扩展ID**: 扩展的唯一标识符（需与 config.json 中一致）。
3.  **作者ID**: 作者的唯一标识符（需与 config.json 中一致）。
4.  **版本号**: 当前申请上架的版本。
5.  **更新日志**: 当前版本更新了什么内容。
6.  **所属模式**: 扩展支持的模式 (upload/realtime/micropython-block/python-block)。
7.  **联系邮箱**: 用于接收审核结果通知。
8.  **扩展帮助文档**: (可选) 帮助手册或使用说明链接。
