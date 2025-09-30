import express from 'express'
import { createEvent, deleteEvent, getAllEvents, getSingleEvent, updateEvent } from '../controllers/eventController.js';

const eventRouter = express.Router();

eventRouter.post("/create-event", createEvent)
eventRouter.get("/all-events", getAllEvents)
eventRouter.get("/:id", getSingleEvent)
eventRouter.post("/:id", updateEvent)
eventRouter.post("/delete-event/:id", deleteEvent)

export default eventRouter