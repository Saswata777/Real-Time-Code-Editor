let socket: WebSocket | null = null;

export const connectWS = (roomId: string): WebSocket => {
  socket = new WebSocket(`ws://localhost:8000/ws/${roomId}`);

  socket.onopen = () => {
    console.log("Connected to WebSocket");
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
  };

  socket.onerror = (err) => {
    console.error("WebSocket error:", err);
  };

  return socket;
};

export type WSMessage = {
  type: "CODE_UPDATE" | "JOIN" | "PING" | string;
  code?: string;
  user?: string;
  [key: string]: unknown;
};

export const sendWSMessage = (msg: WSMessage): void => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(msg));
  }
};
