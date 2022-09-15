import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { HourConverter } from "./utils/hour-converter";

const app = express();

app.use(cors());
app.use(express.json());

const prisma = new PrismaClient({ log: ["error"] });

app.get("/games", async (request: Request, response: Response): Promise<Response> => {
  try {
    const games = await prisma.game.findMany({
      include: {
        _count: {
          select: {
            ads: true,
          },
        },
      },
    });

    return response.status(201).json(games);
  } catch (error) {
    return response.status(500).json({ error });
  }
});

app.post("/games/:id/ads", async (request: Request, response: Response): Promise<Response> => {
  try {
    const gameId = request.params.id;
    const ad = request.body;

    const data = {
      gameId,
      name: ad.name,
      yearsPlaying: ad.yearsPlaying,
      discord: ad.discord,
      weekDays: ad.weekDays.join(",").trim(),
      hourStart: HourConverter.hourStringToMinutes(ad.hourStart),
      hourEnd: HourConverter.hourStringToMinutes(ad.hourEnd),
      useVoiceChannel: ad.useVoiceChannel,
    };

    const createdAd = await prisma.ad.create({ data });

    return response.status(201).json(createdAd);
  } catch (error) {
    return response.status(500).json({ error });
  }
});

app.get("/games/:id/ads", async (request: Request, response: Response): Promise<Response> => {
  try {
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
      select: {
        id: true,
        name: true,
        weekDays: true,
        useVoiceChannel: true,
        yearsPlaying: true,
        hourStart: true,
        hourEnd: true,
      },
      where: {
        gameId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedAds = ads.map(ad => ({
      ...ad,
      weekDays: ad.weekDays.split(",").map(Number),
      hourStart: HourConverter.minutesToHourString(ad.hourStart),
      hourEnd: HourConverter.minutesToHourString(ad.hourEnd),
    }));

    return response.status(200).json(formattedAds);
  } catch (error) {
    return response.status(500).json({ error });
  }
});

app.get("/ads/:id/discord", async (request: Request, response: Response): Promise<Response> => {
  try {
    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
      select: { discord: true },
      where: { id: adId },
    });

    return response.status(200).json({ discord: ad.discord });
  } catch (error) {
    return response.status(500).json({ error });
  }
});

app.listen(4000, () => console.log("listening on http://localhost:4000"));
