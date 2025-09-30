import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteEvent, updateEvent, fetchEvents } from "../redux/event/eventSlice";
import { toast } from "react-toastify";

const EventCard = ({ event }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    // same state style as create form
    const [eventTitle, setEventTitle] = useState(event.eventTitle || "");
    const [description, setDescription] = useState(event.description || "");
    const [date, setDate] = useState(event.date ? event.date.split("T")[0] : "");
    const [category, setCategory] = useState(event.category || "");
    const [submitting, setSubmitting] = useState(false);

    const categories = ["Work", "Personal", "Study", "Other"];

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            dispatch(deleteEvent(event._id));
            toast.success("Event deleted");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!eventTitle || !description || !date || !category) {
            toast.error("All fields are required");
            return;
        }

        setSubmitting(true);
        try {
            const res = await dispatch(
                updateEvent({ id: event._id, payload: { eventTitle, description, date, category } })
            ).unwrap();

            toast.success(res?.message || "Event updated");
            dispatch(fetchEvents());
            setIsEditing(false);
        } catch (error) {
            toast.error(error?.message || String(error) || "Update failed");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 mb-4 transition hover:shadow-lg">
            {isEditing ? (
                <form onSubmit={handleUpdate} className="space-y-4 p-14 ">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Event Title
                        </label>
                        <input
                            type="text"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                            placeholder="Write Title"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition resize-none"
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Event Date
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Select Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? "Saving…" : "Save"}
                        </button>
                        <button
                            type="button"
                            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-medium px-4 py-2 rounded-lg transition"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <h3 className="text-lg font-semibold text-gray-800">
                        {event.eventTitle}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                    <p className="text-sm text-gray-700 mt-2">
                        <span className="font-medium">📅 Date:</span>{" "}
                        {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-700">
                        <span className="font-medium">🏷 Category:</span> {event.category}
                    </p>

                    <div className="flex gap-3 mt-4">
                        <button
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                        <button
                            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-4 py-2 rounded-lg transition"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </button>
                    </div>
                </>
            )}
        </div>
    );


};

export default EventCard;
