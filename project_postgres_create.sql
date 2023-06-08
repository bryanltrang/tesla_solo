CREATE TABLE "tire_rotations" (
  "id" serial NOT NULL PRIMARY KEY,
  "miles" integer NOT NULL,
  "vehicle_id" integer NOT NULL,
  "created_at" timestamp NOT NULL
);

CREATE TABLE "vehicle" (
  "id" integer PRIMARY KEY,
  "make" varchar NOT NULL,
  "model" varchar NOT NULL,
  "vin" varchar NOT NULL,
  "odometer" integer NOT NULL,
  "created_at" timestamp NOT NULL
);

ALTER TABLE "tire_rotations" ADD FOREIGN KEY ("vehicle_id") REFERENCES "vehicle" ("id");
