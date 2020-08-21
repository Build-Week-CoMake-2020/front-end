import  { FETCH_DATA, FETCH_SUCCESS, FETCH_FAIL, POST_DATA, POST_SUCCESS, POST_FAIL} from '../actions/actions';

const initialState = {
    issues: [],
    insFetching:false,
    isPosting: false,
    error:''
}

const IssueReducer = (state=initialState, actions)=>{
    switch(actions.type){
        case FETCH_DATA:
            return {
                ...state, insFetching:true
            }
            case FETCH_SUCCESS:
                return {
                    ...state,
                    insFetching: false,
                    issues: actions.payload
                }
        case FETCH_FAIL:
                return {
                    ...state,
                    insFetching: false,
                    error: actions.payload
                }
         
        case POST_DATA:
            return{
                ...state,
                isPosting: true,
                issues: [...state.issues]
            }

        case POST_SUCCESS:
            return {
                ...state,
                isPosting: false,
                issues: actions.payload
            }    

        case POST_FAIL:
            return {
                ...state,
                isPosting: false,
                error: actions.payload
            }    

                  
                default:
                    return state
    }
}

export default IssueReducer;