import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createEvent, fetchEvents } from '../redux/event/eventSlice'
import { toast } from 'react-toastify'

const EventForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [eventTitle, setEventTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [category, setCategory] = useState("")
    const [submitting, setSubmitting] = useState(false);

    const categories = ["Work", "Personal", "Study", "Other"];

    const onSubmit = async (e) => {

        e.preventDefault();
        if (!eventTitle || !description || !date || !category) {
            toast.error("All fields are required");
            console.log(eventTitle, description, date, category);
            return;
        }

        setSubmitting(true);
        try {
            const res = await dispatch(createEvent({ eventTitle, description, date, category })).unwrap();
            toast.success(res?.message || "Event created");

            dispatch(fetchEvents());
            navigate("/all-events");
        } catch (e) {
            toast.error(e?.message || String(e) || "Create failed");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <form
                onSubmit={onSubmit}
                className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-5 border border-gray-200"
            >
                <h2 className="text-xl font-semibold text-gray-800 text-center">
                    Create New Event
                </h2>

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
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition resize-none"
                        rows={4}
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

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {submitting ? "Creating Event…" : "Create Event"}
                </button>
            </form>
        </div>
    );

}

export default EventForm