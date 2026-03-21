#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PID_DIR="$ROOT_DIR/.dev-pids"
LOG_DIR="$ROOT_DIR/.dev-logs"
BACKEND_PID_FILE="$PID_DIR/backend.pid"
FRONTEND_PID_FILE="$PID_DIR/frontend.pid"

mkdir -p "$PID_DIR" "$LOG_DIR"

is_pid_running() {
  local pid="$1"
  kill -0 "$pid" >/dev/null 2>&1
}

wait_for_port() {
  local port="$1"
  local max_tries="40"
  local i
  for ((i=1; i<=max_tries; i++)); do
    if lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; then
      return 0
    fi
    sleep 0.5
  done
  return 1
}

start_backend() {
  if [[ -f "$BACKEND_PID_FILE" ]] && is_pid_running "$(cat "$BACKEND_PID_FILE")"; then
    echo "Backend already running (PID $(cat "$BACKEND_PID_FILE"))."
    return
  fi

  if lsof -nP -iTCP:8000 -sTCP:LISTEN >/dev/null 2>&1; then
    echo "Port 8000 is already in use. Stop the process using it, then rerun this script."
    exit 1
  fi

  nohup bash -lc "cd '$ROOT_DIR' && source backend/venv/bin/activate && exec python backend/manage.py runserver 127.0.0.1:8000" \
    >"$LOG_DIR/backend.log" 2>&1 &
  echo "$!" >"$BACKEND_PID_FILE"

  if wait_for_port 8000; then
    echo "Backend started: http://127.0.0.1:8000"
  else
    echo "Backend failed to start. See $LOG_DIR/backend.log"
    exit 1
  fi
}

start_frontend() {
  if [[ -f "$FRONTEND_PID_FILE" ]] && is_pid_running "$(cat "$FRONTEND_PID_FILE")"; then
    echo "Frontend already running (PID $(cat "$FRONTEND_PID_FILE"))."
    return
  fi

  if lsof -nP -iTCP:5173 -sTCP:LISTEN >/dev/null 2>&1; then
    echo "Port 5173 is already in use. Stop the process using it, then rerun this script."
    exit 1
  fi

  nohup bash -lc "export NVM_DIR=\"$HOME/.nvm\"; if [[ -s \"$NVM_DIR/nvm.sh\" ]]; then . \"$NVM_DIR/nvm.sh\"; fi; if command -v nvm >/dev/null 2>&1; then nvm use --silent 22.12.0 || nvm use --silent default || true; fi; cd '$ROOT_DIR/frontend' && exec npm run dev -- --host 127.0.0.1 --port 5173" \
    >"$LOG_DIR/frontend.log" 2>&1 &
  echo "$!" >"$FRONTEND_PID_FILE"

  if wait_for_port 5173; then
    echo "Frontend started: http://127.0.0.1:5173"
  else
    echo "Frontend failed to start. See $LOG_DIR/frontend.log"
    exit 1
  fi
}

start_backend
start_frontend

echo ""
echo "Both servers are running."
echo "Backend log:  $LOG_DIR/backend.log"
echo "Frontend log: $LOG_DIR/frontend.log"
echo "Run ./scripts/stop-dev.sh to stop both."
