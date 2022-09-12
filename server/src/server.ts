import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/ads", (_request: Request, response: Response) => {
  return response.status(200).json([
    { id: 1, name: "Anúncio 1" },
    { id: 2, name: "Anúncio 2" },
    { id: 3, name: "Anúncio 3" },
    { id: 4, name: "Anúncio 4" },
  ]);
});

app.listen(4000, () => console.log("listening on http://localhost:4000"));
