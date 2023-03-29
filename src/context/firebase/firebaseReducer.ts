import { SHOW_LOADER, ADD_NOTE, FETCH_NOTES, REMOVE_NOTE  } from "../types"

interface FirebaseState {
    notes: any[],
    loading: boolean
  } 


const handlers: {[key: string]: (state: FirebaseState, action: any) => FirebaseState }  = {
    [SHOW_LOADER]: state => ({...state, loading: true}), 
    [ADD_NOTE]: (state, {payload}) => ({
        ...state, 
        notes: [...state.notes, payload]
    }),
    [FETCH_NOTES]: (state, {payload}) => ({...state, notes: payload, loading: false}),
    [REMOVE_NOTE]: (state, {payload}) => ({
        ...state, 
        notes: state.notes.filter(note => note.id !== payload)
    }), 
    DEFAULT: state => state
}

export const firebaseReducer = (state: FirebaseState, action: any) => {
    const handle = handlers[action.type] ||  handlers.DEFAULT
    return handle(state, action)
}


