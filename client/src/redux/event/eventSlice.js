import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import eventService from "./eventService.js"

const initialState = {
    events: [],
    currentEvent: null,
    loading: false,
    success: false,
    error: false,
    message: "",
    filterCategory: '',
}


// CREATE Event
export const createEvent = createAsyncThunk(
    "event/create",
    async (payload, thunkAPI) => {
        try {
            const res = await eventService.createEvent(payload);
            if (!res?.success) throw new Error(res?.message || "Create failed");
            return res;
        } catch (err) {
            const m = err.response?.data?.message || err.message || String(err);
            return thunkAPI.rejectWithValue(m);
        }
    }
);

// Update Event 
export const updateEvent = createAsyncThunk(
    "event/update",
    async ({ id, payload }, thunkAPI) => {
        try {
            const res = await eventService.updateEvent(id, payload);
            if (!res?.success) throw new Error(res?.message || "Create failed");
            return res;
        } catch (err) {
            const m = err.response?.data?.message || err.message || String(err);
            return thunkAPI.rejectWithValue(m);
        }
    }
);

// Getting All Events 
export const fetchEvents = createAsyncThunk(
    "event/fetchAll",
    async (_, thunkAPI) => {
        try {
            const res = await eventService.getAllEvents();
            if (!res?.success) throw new Error(res?.message || "Failed to load Events");
            return res
        } catch (error) {
            const m = error.response?.data?.message || error.message || String(error)
            return thunkAPI.rejectWithValue(m)
        }
    }
)

// Getting single event by id
export const fetchEventById = createAsyncThunk(
    "event/fetchById",
    async (id, thunkAPI) => {
        try {
            const res = await eventService.getEventById(id)
            if (!res?.success) throw new Error(res?.message || "Failed to load Event");
            return res;
        } catch (err) {
            const m = err.response?.data?.message || err.message || String(err);
            return thunkAPI.rejectWithValue(m);
        }
    }
);

// DELETE Event
export const deleteEvent = createAsyncThunk(
    "event/delete",
    async (id, thunkAPI) => {
        try {
            const res = await eventService.deleteEvent(id)
            if (!res?.success) throw new Error(res?.message || "Delete failed");
            return { ...res, idArg: id }; // id just in case
        } catch (err) {
            const m = err.response?.data?.message || err.message || String(err);
            return thunkAPI.rejectWithValue(m);
        }
    }
);

const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        clearEventState: (state) => {
            state.loading = false
            state.success = false
            state.error = false
            state.message = ""
        },
        setFilterCategory: (state, action) => {
            state.filterCategory = action.payload
        },
    },

    extraReducers: (builder) => {
        builder
            // create
            .addCase(createEvent.pending, (state) => {
                state.error = false;
                state.message = "";
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.success = true;
                const created = action.payload?.data
                if (created) state.events.unshift(created);
                state.message = action.payload?.message;
            })
            .addCase(createEvent.rejected, (state, action) => {
                state.error = true;
                state.message = action.payload;
            })


            // Update Event 
            .addCase(updateEvent.pending, (state) => {
                state.loading = true
                state.error = false
                state.message = ""
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                // update event in state.events
                const idx = state.events.findIndex(e => e._id === action.payload.data._id)
                if (idx >= 0) state.events[idx] = action.payload.data
            })
            .addCase(updateEvent.rejected, (state, action) => {
                state.error = true
                state.message = action.payload
            })

            // Fetching All Events 
            .addCase(fetchEvents.pending, (state) => {
                state.loading = true
                state.error = false
                state.message = ""
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                const list = Array.isArray(action.payload?.data) ? action.payload.data : []
                state.events = list;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.message = action.payload
                state.events = []
            })

            // fetch by id
            .addCase(fetchEventById.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.message = "";
            })
            .addCase(fetchEventById.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                // controller uses data for the single Event
                state.currentEvent = action.payload?.data || null;
            })
            .addCase(fetchEventById.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload
                state.currentEvent = null;
            })

            // delete Event
            .addCase(deleteEvent.pending, (state) => {
                state.error = false;
                state.message = "";
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.success = true;
                const id =
                    action.payload?.data?._id ||
                    action.payload?.idArg ||
                    action.meta.arg;
                if (id) state.events = state.events.filter((c) => c._id !== id);
                if (state.currentEvent?._id === id) state.currentEvent = null;
                state.message = action.payload?.message;
            })
            .addCase(deleteEvent.rejected, (state, action) => {
                state.error = true;
                state.message = action.payload
            });
    }

})

export const {clearEventState, setFilterCategory} = eventSlice.actions;
export default eventSlice.reducer