-- CreateTable
CREATE TABLE "ads" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "game_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "years_playing" INTEGER NOT NULL,
    "discord" TEXT NOT NULL,
    "week_days" TEXT NOT NULL,
    "hour_start" INTEGER NOT NULL,
    "hour_end" INTEGER NOT NULL,
    "use_voice_channel" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ads_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
