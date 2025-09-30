import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, setFilterCategory } from "../redux/event/eventSlice";
import EventCard from "./EventCard";

const EventList = () => {
    const dispatch = useDispatch();
    const { events, loading, filterCategory } = useSelector((state) => state.event);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    const filteredEvents = filterCategory
        ? events.filter((e) => e.category === filterCategory)
        : events;

    if (loading) return <p>Loading events...</p>;

    return (
        <div className="mt-6 space-y-4">
            <select
                onChange={(e) => dispatch(setFilterCategory(e.target.value))}
                className="w-full md:w-60 border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 shadow-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
            >
                <option value="">Filter Category</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Study">Study</option>
                <option value="Other">Other</option>
            </select>

            {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                    <EventCard key={event._id} event={event} />
                ))
            ) : (
                <div className="flex items-center justify-center h-96">
                    <p className="text-gray-500 text-2xl font-medium px-6 py-3">
                        No events found.
                    </p>
                </div>
            )}
        </div>

    );
};

export default EventList;