# Firebase Chat App

## 概要
このプロジェクトは、Firebase を使って簡単なチャットルーム機能を実装した React アプリです。
Reactに触れてみたくて作りました。<br>
ユーザーは Firebase Authentication で認証し、参加しているルームを一覧表示したり、新しいルームを作成・削除できます。
以下の動画を参考にルーム機能をつけてみたものです。(UIなども異なります。)
[参考動画](https://www.youtube.com/watch?v=Js9BsBsczE8)


## 機能

- ユーザー認証（Googleログイン）
- ルームの一覧表示（参加しているルームのみ）
- 新しいルームの作成
- ルームの削除
- ルーム内のメンバー表示（最大3人まで）

## Firebase 設定

### Firestore データ構造はこんな感じです

```json
"rooms": [
  {
    "id": "roomId1",
    "name": "ルームA",
    "owner": "userId1",
    "members": ["userId1", "userId2", "userId3"],
    "createdAt": "timestamp",
    "messages": [
    {
      "id": "messageId1",
      "roomId": "roomId1",
      "senderId": "userId1",
      "text": "こんにちは！",
      "createdAt": "timestamp"
    }
]
  }
],
"users": [
  {
    "id": "userId1",
    "displayName": "ユーザーA",
    "email": "userA@example.com"
  }
]
```

### 3. `.env` ファイルの設定

Firebase の設定情報を `.env` に追加してください。

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```




This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts


In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
