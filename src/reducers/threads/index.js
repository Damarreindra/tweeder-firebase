import { GET_THREADS } from "../../actions/threadsAction"

const initialState = {
    getThreadResult: false,
    getThreadLoading: false,
    getThreadError: false,
}

const user = (state = initialState, action) =>{
    switch(action.type){

        case GET_THREADS:
           
            return{
                ...state,
                getThreadResult: action.payload.data,
                getThreadLoading: action.payload.loading,
                getThreadError: action.payload.errorMessage,
            }

        default : 
        return state
    }
}

export default user