# Synchat

> A Real-Time State Synchronization Experiment

Synchat은 단순한 채팅 애플리케이션이 아니라,  
실시간 이벤트 기반 시스템과 상태 동기화 전략을 단계적으로 설계하고 구현하기 위한 실험 프로젝트입니다.

---

## 🎯 Goal

- 실시간 통신의 동작 원리 이해
- Socket 기반 이벤트 흐름 설계
- 클라이언트 간 상태 동기화 전략 실험
- Room 기반 1:1 / Group 구조 구현
- 재연결(Reconnection) 및 일관성 유지 전략 탐구

---

## 🧠 Philosophy

Synchat은 "기능 구현"이 목적이 아닙니다.

우리는 다음을 탐구합니다:

- 어떻게 이벤트가 전파되는가?
- io.emit과 socket.emit의 차이는 무엇인가?
- 상태는 서버가 관리해야 하는가, 클라이언트가 관리해야 하는가?
- 여러 사용자가 동시에 접속했을 때 일관성은 어떻게 유지되는가?
- 연결이 끊겼다가 복구되면 어떤 문제가 발생하는가?

---

## 🏗 Architecture Overview

Monorepo 구조로 구성됩니다:


synchat/
├── frontend/ # Next.js (Client)
└── server/ # Express + Socket.io (Server)


- Frontend: UI 및 클라이언트 상태 관리
- Server: 이벤트 브로드캐스트 및 Room 관리
- DB: 초기 단계에서는 사용하지 않음 (후반 도입 예정)

---

## 🚀 Development Roadmap

### Phase 1 — Basic Connection
- Socket 연결
- Handshake 확인
- 메시지 브로드캐스트

### Phase 2 — Room System
- Room 생성 / 입장 / 퇴장
- 1:1 채팅 구조 설계
- 그룹 채팅 구조 설계

### Phase 3 — State Synchronization
- 메시지 순서 보장
- 중복 이벤트 처리
- 서버 상태 vs 클라이언트 상태 전략 비교

### Phase 4 — Persistence Layer
- DB 연동
- 메시지 저장 전략
- 복구 시 데이터 재동기화

### Phase 5 — Advanced Topics
- Reconnection Handling
- Redis Pub/Sub (확장 대비)
- Horizontal Scaling 고려

---

## 🛠 Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Socket.io Client

### Backend
- Express
- Socket.io
- TypeScript

---

## 📌 Why This Project?

실시간 시스템은 단순 CRUD와 다르게  
이벤트 흐름과 상태 일관성이 핵심입니다.

Synchat은 그 내부 구조를 직접 구현하고 실험하며  
"보이는 기능"이 아닌 "보이지 않는 설계"를 이해하기 위한 프로젝트입니다.

---

## 🧪 Status

Currently in early architecture design phase.