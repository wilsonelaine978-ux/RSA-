# RSA 加密解密双网站演示系统

作者署名：黄冈师范学院——应数2401-刘帅制作

这是一个零外部依赖的 RSA-OAEP 静态演示网站，适合部署到 GitHub Pages 长期使用。

## 页面结构

- `index.html`：演示系统入口页。
- `encrypt.html`：加密网站，只加载公钥和 `src/rsa-encrypt-lib.js`。
- `decrypt.html`：解密网站，加载私钥和 `src/rsa-decrypt-lib.js`。
- `keys/demo-public-key.pem`：演示公钥。
- `keys/demo-private-key.pem`：演示私钥。

## 本地演示

双击 `start-demo.bat`，浏览器会打开：

```text
http://127.0.0.1:4173
```

演示顺序：

1. 进入 `encrypt.html` 加密网站。
2. 输入短消息，点击“生成密文”。
3. 点击“发送到解密网站”。
4. 在 `decrypt.html` 解密网站点击“私钥解密”。

## 部署到 GitHub Pages

1. 在 GitHub 新建一个仓库，例如 `rsa-demo`。
2. 把本文件夹里的全部内容上传到仓库根目录。
3. 进入仓库 `Settings` -> `Pages`。
4. Source 选择 `GitHub Actions`。
5. 等待 Actions 运行完成。

部署完成后网址一般是：

```text
https://你的GitHub用户名.github.io/rsa-demo/
```

两个长期访问页面：

```text
https://你的GitHub用户名.github.io/rsa-demo/encrypt.html
https://你的GitHub用户名.github.io/rsa-demo/decrypt.html
```

## 重要说明

GitHub Pages 是公开静态网站，所以这里内置的私钥只能用于课堂演示，不能用于真实业务或任何需要保密的场景。
