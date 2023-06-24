# AUTORO クライアント TypeScript

AUTORO の PUBLIC API にリクエストを送信するNodeクライアントクラスのサンプルです。クローンして適宜修正しながら利用してください。

# 設定

コンストラクタで以下の情報が必要です。

* ACCESS_KEY_ID
* SECRET_ACCESS_KEY

これらの情報は、他人に知られないように管理してください。

# サンプルコード

以下は、指定のワークフロー（workflow_id）にパラメーター(params)を送って実行するサンプルです。

```ts
import { AutoroClient } from "./autoroClient";

const client = new AutoroClient(
  'YOUR_ACCESS_KEY_ID',
  'YOUR_SECRET_ACCESS_KEY'
);

client.createSessionQueue(
  {
    // 実行したいワークフローIDを数値か文字列で与えてください
    workflow_id: 'YOUR_WORKFLOW_ID',
    // params の中身は、ワークフローの設定次第で異なります
    params: {
      text: 'Hello World!',
      array: [1, 2, 3, 4, 5],
    }
  }
).then(res => {
  console.log(res);
});
```

# サンプルコード index.js の実行

`index.ts` の設定部分に全ての値を入力します。

```ts
const YOUR_ACCESS_KEY_ID = 'YOUR_ACCESS_KEY_ID';
const YOUR_SECRET_ACCESS_KEY = 'YOUR_SECRET_ACCESS_KEY';
const YOUR_PROJECT_ID = 'YOUR_PROJECT_ID';
const YOUR_WORKFLOW_ID = 'YOUR_WORKFLOW_ID';
```

その後、コンパイルと実行します。

```bash
$ npm run build
$ node ./lib/index.js
```

これで、全て実行できれば成功です。

# APIドキュメント

[ドキュメント](https://developer.autoro.io/)