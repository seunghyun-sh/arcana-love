#!/bin/bash

trap 'kill 0' EXIT

echo "🔮 Acrana Love — 개발 서버 시작"

# Backend
(cd backend && source venv/bin/activate && uvicorn app.main:app --reload --port 8000) &

# Frontend
(cd frontend && npm run dev) &

wait
