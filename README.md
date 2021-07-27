# PIUDA
## 인스톨 방법 및 실행 방법

### 요구사항
- npm
- react-scripts
- netlify-lambda
- vscode
- vscode extesions: eslint, prettier
  
### 환경 변수
먼저 환경 변수를 추가해줘야 함
- .env
   ```
   REACT_APP_API_URL=
   # 네이버 클라우드 https://api.ncloud-docs.com/
   REACT_APP_NAVER_CLOUD_CLIENT_ID=
   REACT_APP_NAVER_CLOUD_CLIENT_SECRET=
   REACT_APP_NAVER_MAP_API=
   # 네이버 앱 https://developers.naver.com/
   REACT_APP_NAVER_APP_CLIENT_ID=
   REACT_APP_NAVER_APP_CLIENT_SECRET=
   ```

### 모듈 설치

```
npm install
```

### 실행
- 람다 실행
   ```
   npm run start:netlify
   ```
- 피우다 맵
   ```
   npm run start
   ```