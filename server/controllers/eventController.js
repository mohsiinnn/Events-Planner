import eventModel from "../models/Event.js"

// Creating new event
export const createEvent = async (req, res) => {
    const { eventTitle, description, date, category } = req.body
    if (!eventTitle || !date || !category) {
        return res.json({ success: false, message: "Title, Date and Category is required" })
    }
    try {
        const exists = await eventModel.findOne({ eventTitle })
        if (exists) {
            return res.json({ success: false, message: "Event with this title is already exists" });
        }
        const newEvent = new eventModel({ eventTitle, description, date, category })
        await newEvent.save()

        return res.json({ success: true, data: newEvent, message: "Event created successfully!" })
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//Get All Events
export const getAllEvents = async (req, res) => {
    const {category} = req.query
    try {
        const filter = category? {category} : {}
        const eventList = await eventModel.find(filter)
        if (eventList.length > 0) {
            return res.json({ success: true, data: eventList })
        }
        else {
            return res.json({ success: true, message: "No event found" });
        }
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//Get Single Event
export const getSingleEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const getEvent = await eventModel.findById(id);
        if (getEvent) {
            return res.json({ success: true, data: getEvent })
        }
        else {
            return res.json({ success: false, message: "Event not found" })
        }
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//Update Event
export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { eventTitle, description, date, category } = req.body
    try {
        const updatedEvent = await eventModel.findByIdAndUpdate(id,
            { eventTitle, description, date, category },
            { new: true, runValidators: true }
        )

        if (!updatedEvent) {
            return res.json({ success: false, message: "Event not found" })
        }

        res.json({ success: true, data: updatedEvent, message: "Event updated successfully!" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

//Delete Event
export const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEvent = await eventModel.findByIdAndDelete(id)
        if (!deletedEvent) {
            return res.json({ success: false, message: "Event not found" })
        }

        res.json({ success: true, eventId: deletedEvent._id, message: "Event Deleted" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}
