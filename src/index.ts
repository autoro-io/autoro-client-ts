// Example usage of the AutoroClient class
// import { AutoroClient } from "./autoroClient";

import { AutoroClient } from "./autoroClient";

const YOUR_ACCESS_KEY_ID = 'YOUR_ACCESS_KEY_ID';
const YOUR_SECRET_ACCESS_KEY = 'YOUR_SECRET_ACCESS_KEY';
const YOUR_PROJECT_ID = 'YOUR_PROJECT_ID';
const YOUR_WORKFLOW_ID = 'YOUR_WORKFLOW_ID';

async function main() {
  const client = new AutoroClient(
    YOUR_ACCESS_KEY_ID,
    YOUR_SECRET_ACCESS_KEY
  );

  // セッションキューを作成する
  const createRes = await client.createSessionQueue(
    {
      workflow_id: YOUR_WORKFLOW_ID,
      params: {
        text: 'Hello World!',
        array: [1, 2, 3, 4, 5],
      }
    }
  );
  console.log(createRes);

  // セッションキュー一覧を取得する
  const indexRes = await client.getSessionQueues(
    {
      page: 1,
      per_page: 10,
      project_id: YOUR_PROJECT_ID,
      query: ''
    }
  );
  console.log(indexRes);

  // ワークフロー一覧を取得する
  const workflowsRes = await client.getWorkflows(
    {
      page: 1,
      per_page: 10
    }
  );
  console.log(workflowsRes);

  // セッションキューをキャンセルする
  // はじめに生成したセッションキューのIDでキャンセルしています
  const cancelRes = await client.cancelSessionQueue(
    createRes.id
  );
  console.log(cancelRes);
};

main();
