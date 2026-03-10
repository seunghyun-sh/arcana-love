# love-tarot

AI 기반 사랑 타로 리딩 웹 애플리케이션입니다. 질문 카테고리를 고르고, 연애 상황을 입력하면, 3장의 메이저 아르카나를 뽑아 OpenAI가 감정과 관계의 흐름을 해석해 줍니다.

## Project Structure

```
arcana-love/
├── frontend/          ← React + Vite + TypeScript + Tailwind + Framer Motion
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── backend/           ← FastAPI + OpenAI Python SDK
│   ├── app/
│   │   ├── main.py
│   │   ├── api/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── domain/
│   │   └── utils/
│   ├── requirements.txt
│   └── .env
├── .github/workflows/ ← CI/CD
└── README.md
```

## Stack

**Frontend**: React, Vite, TypeScript, Tailwind CSS, Framer Motion

**Backend**: FastAPI, Python, Pydantic, OpenAI Python SDK, Uvicorn

## Local Run

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# .env 파일에 OPENAI_API_KEY 설정
uvicorn app.main:app --reload --port 8000
```

## API

- `GET /health` — 서버 상태 확인
- `POST /api/tarot/readings` — AI 타로 리딩 생성

## Build

```bash
cd frontend
npm run build
```

빌드 결과물은 `frontend/dist/`에 생성됩니다.

## GitHub Pages Deployment

1. 이 프로젝트를 GitHub 저장소에 push 합니다.
2. GitHub 저장소의 `Settings > Pages`에서 `Build and deployment` 소스를 `GitHub Actions`로 설정합니다.
3. 기본 브랜치 `main`에 push 하면 `.github/workflows/deploy.yml`이 자동으로 빌드 후 배포합니다.
