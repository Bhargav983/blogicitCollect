import { FETCHING_REPORT_REQUEST,FETCHING_REPORT_SUCCESS,FETCHING_REPORT_FAILURE } 
from "./types";

export const fetchingReportRequest=()=>({type:FETCHING_REPORT_REQUEST});

export const fetchingReportSuccess=json=>({
    type:FETCHING_REPORT_SUCCESS,
    payload:json
});

export const fetchingReportFailure=error=>({
    type:FETCHING_REPORT_FAILURE,
    payload:error
});

export const fetchReport=()=>{
    return async dispatch=>{
        dispatch(fetchingReportRequest());
        try{
                let response=fetch('http://117.220.197.82/saved-detail-user/mallu606/');
                let json=await response.json();
                console.log('redux json=',json)
                dispatch(fetchingReportSuccess(json.results));
        }catch(error){
            dispatch(fetchingReportFailure(error))            
        }
    }
}
