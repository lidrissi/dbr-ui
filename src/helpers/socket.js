/* eslint-disable no-console */
import io from "socket.io-client";
import { BACKEND_SOCKET_API_URL } from "constants/resources";
import { isLoggedIn } from "utils/auth.utils";
import { saveData, loadData } from "utils/localStorage.utils";

const configureSocketIO = isLoggedIn()
  ? () => {
      // connect to server
      const socket = io(BACKEND_SOCKET_API_URL, {
        path: "/back/socket",
        transports: ["websocket", "polling"],
      });

      if (loadData("sid")) {
        socket.id = loadData("sid");
      }
      socket.on("reconnect_attempt", () => {
        if (loadData("sid")) {
          socket.id = loadData("sid");
        }
        socket.io.opts.transports = ["polling", "websocket"];
      });

      socket.on("connect", () => {
        console.log("client connected");
        if (!loadData("sid")) {
          saveData("sid", socket.id);
        }
      });

      socket.on("connect_error", (err) => {
        console.log("client connect_error: ", err);
      });

      socket.on("connect_timeout", (err) => {
        console.log(" connect_timeout: ", err);
      });

      socket.on("error", (error) => {
        console.log("error", error);
      });

      socket.on("disconnect", (reason) => {
        if (reason === "io server disconnect") {
          // the disconnection was initiated by the server, you need to reconnect manually
          socket.connect();
        }
        // else the socket will automatically try to reconnect
        console.log("disconnect reason", reason);
      });

      socket.on("reconnect_error", (error) => {
        console.log("reconnect_error", error);
      });

      return socket;
    }
  : null;

export default configureSocketIO;
