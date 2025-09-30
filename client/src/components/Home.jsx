import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-gradient-to-b from-blue-50 to-white min-h-screen">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Welcome to <span className="text-blue-600">Event Planner</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
                Organize your events effortlessly — create, edit, delete, and filter events by category.
                Stay on top of your schedule and never miss a moment that matters.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={() => navigate('/create-event')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                    Get Started
                </button>
                <button
                    onClick={() => navigate('/all-events')}
                    className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-gray-300 transition"
                >
                    View All Events
                </button>
            </div>
        </div>
    );
};

export default Home;
