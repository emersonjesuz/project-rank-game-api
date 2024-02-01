import server from "./server";

server.listen(process.env.PORT, () =>
  console.log("servidor inicializado na porta " + process.env.PORT)
);
