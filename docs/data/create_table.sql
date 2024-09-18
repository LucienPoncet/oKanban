BEGIN;

DROP TABLE IF EXISTS "list", "card", "tag", "card_has_tag";

CREATE TABLE "list" (
  "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(128) NOT NULL,
  "position" INTEGER NOT NULL DEFAULT 1,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "card" (
  "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "content" TEXT NOT NULL,
  "color" VARCHAR(20) NOT NULL DEFAULT '#FFFFFF',
  "position" INTEGER NOT NULL DEFAULT 1,
  "list_id" INTEGER NOT NULL REFERENCES "list"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tag" (
  "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(128) NOT NULL,
  "color" VARCHAR(20) NOT NULL DEFAULT '#FFFFFF',
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "card_has_tag"(
  "card_id" INTEGER NOT NULL REFERENCES "card"("id") ON DELETE CASCADE,
  "tag_id" INTEGER NOT NULL REFERENCES "tag"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("card_id", "tag_id")
);


INSERT INTO "list" ("name", "position")
VALUES ('BACKLOG', 1),
('TO DO', 2),
('IN PROGRESS', 3),
('DONE', 4);


INSERT INTO "card" ("content", "position", "color", "list_id")
VALUES ('faire okanban front ', 1, '#1E90FF', 1),
('découvrir les API REST', 1, DEFAULT, 2),
('découvrir INSOMNIA', 2, DEFAULT, 2),
('Créer les modèle', 1, DEFAULT, 3),
('faire la conception', 1, DEFAULT, 4);


INSERT INTO "tag" ("name", "color")
VALUES ('prioritaire', '#FF0000'),
('normal', '#FF8000'),
('non urgent', '#008000');


INSERT INTO "card_has_tag" ("card_id", "tag_id")
VALUES (2, 1),
(3, 1),
(1, 3),
(4,2);


COMMIT;

