# Mind+ Extension Builder

Mind+ Extension Builder is a tool to help developers build extensions for Mind+ programming modes. With this project, you can easily create, build, and test your own extensions.

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Build Example Extension**
    ```bash
    npm run build
    ```
    This command builds the default example extension located in the `extension` directory.

## Development Guide

Developers should build their extensions within the `extension` folder.

### Directory Structure

-   `extension/`
    -   `index.js`: **Main Entry Point**. This is where you construct Blocks and execute program logic.
    -   `locales/`: **Translations**. Stores multi-language translation files for the extension.
    -   `public/`: **Assets**. Contains the `config.json` configuration file and cover image. These are copied to the build directory during compilation.

### Configuration (config.json)

`public/config.json` is the core configuration file for the extension. Detailed parameters are as follows:

#### Base Configuration (ExtensionBaseConfig)

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Extension ID. **Alphanumeric only**, no special characters. |
| `version` | string | Version number. Format: `Major.Minor.Patch` (e.g., 1.0.0). |
| `mode` | string | Extension Mode (upload/realtime/micrpython-block/python-block). |
| `name` | object | Extension Name. Format: `{"en": "Name", "zh-cn": "名称"}`. |
| `description` | object | Description. Format: `{"en": "Desc", "zh-cn": "描述"}`. |
| `cover` | string | (Optional) Path to cover image. |
| `author` | string | Author. **Alphanumeric only**, no special characters. |
| `contributors` | string[] | (Optional) List of contributors. |
| `main` | string | Entry file path (usually `index.js`). |
| `feature` | string[] | (Optional) Category tags. |
| `isDevice` | boolean | Whether it is a device extension. |
| `meta.extVersion` | string | Extension API Version. Used for version matching. |
| `libraryConfig` | array | (Optional) Arduino library configuration. |

#### Device Configuration (DeviceConfig) - When isDevice is true

| Field | Type | Description |
| --- | --- | --- |
| `supportPlatforms` | string[] | Supported systems/architectures. |
| `boardConfig` | object | Board config (for compile and upload). |
| `boardConfig.board` | string | Board name (e.g., "arduino:avr:uno"). |
| `boardConfig.version` | string | Board version (e.g., "1.8.6"). |
| `boardConfig.fqbn` | string | (Optional) FQBN parameter. |
| `firmware` | object | (Optional) Firmware config. |
| `firmware.online` | string | Realtime mode firmware path (e.g., `./firmware/firmata.hex`). |

#### Extension Configuration (ExtensionConfig) - When isDevice is false

| Field | Type | Description |
| --- | --- | --- |
| `supportDevices` | object | Supported main controller versions. `{ "deviceId": "version_range" }` |
| `isSupportStage` | boolean | (Optional) Whether stage mode is supported. |

> For detailed TypeScript interface definitions, refer to the source code or the Type Definitions section below.

### Development Manual

For more detailed extension development manuals, please refer to the documents in the `docs/` directory:

-   [Upload Mode Extension Development Guide](docs/上传模式扩展开发指南.md)
-   [Python Block Mode Extension Development Guide](docs/Python积木模式扩展开发指南.md)
-   [General - Define Block](docs/通用-定义block.md)

## Build & Test

### Build

After finishing the extension development, run the following command to build:

```bash
npm run build
```

### Local Test

1.  Run **Mind+** software.
2.  Open the corresponding mode page.
3.  Click the settings icon in the top right corner and enable **Developer Mode** in the popup.
4.  Open **Extensions**.
5.  Click the **[Load Test Extension]** button and select the extension `config.json` file in the `build` directory.

## Submission

When testing is complete and you are ready to publish, please send an email to `mindplus@dfrobot.com` for application.

**The email must include:**

1.  **Repository Link**: Source code repository address (must be open source).
2.  **Extension ID**: Unique identifier for the extension (must match config.json).
3.  **Author ID**: Unique identifier for the author (must match config.json).
4.  **Version**: The version you are applying to release.
5.  **Changelog**: What has been updated in this version.
6.  **Mode**: The mode supported by the extension (upload/realtime/micropython-block/python-block).
7.  **Contact Email**: Email address to receive audit notifications.
8.  **Documentation**: (Optional) Link to the help manual or user guide.
