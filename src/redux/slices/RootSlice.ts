import { createSlice } from "@reduxjs/toolkit"

const rootSlice = createSlice({
    name: "root",
    initialState: {
        car_year: "Car Year",
        car_type: 'Car Type',
        color: "Color",
        make: "Make",
        model: "Model"
    },
    reducers: {
        // action is submitted elsewhere - written to state.name
        chooseYear: (state, action) => { state.car_year = action.payload }, // All we're doing is setting the input to the state.name
        chooseType: (state, action) => { state.car_type = action.payload },
        chooseColor: (state, action) => { state.color = action.payload },
        chooseMake: (state, action) => { state.make = action.payload },
        chooseModel: (state, action) => { state.model = action.payload }
    }
})

export const reducer = rootSlice.reducer;
export const { chooseYear, chooseType, chooseColor, chooseMake, chooseModel } = rootSlice.actions

