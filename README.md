# Trill Guitar Chord Lookup API

A NestJS-powered backend for a guitar chord lookup system. This service allows users to:

-  **Look up chords** by fret positions and finger placements.
-  **Browse a full chord library** without needing to submit input.
- ⚙ Interact with a structured API designed for scalability and future expansion.

---

##  Features

- **Chord Matching:** Submit fret and finger data to find matching chords from the database.
- **Chord Library:** Access a complete list of chords without any input.
- **RESTful API Design:** Built with best practices using NestJS and TypeORM (or Prisma if you prefer).
- **Modular Architecture:** Clean separation of concerns using NestJS modules, services, and controllers.

---

##  Tech Stack

- **Framework:** [NestJS](https://nestjs.com/)
- **Database:** MySQL 
- **ORM:** Prisma
- **Language:** TypeScript

---

## 📂 API Endpoints (Preview)


### `POST /chords/find`
Finds matching chord(s) from finger and fret input.
```json
{
  "frets": "x32010",
  "fingers": "032010"
}
```
### `GET /chords/ find-by`
Returns a full list of chords by keys and suffixes.

