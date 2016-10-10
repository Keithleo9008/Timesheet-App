import axios from 'axios';
import {FETCH_TIMESHEET, CREATE_TIMESHEET, FETCH_USER_DATA, DELETE_TIMESHEET, FETCH_TEST, ROOT_URL} from '../constants/time.constants';

export function fetchTimesheetData() {
  const request = axios.get(ROOT_URL);

  return {
    type: FETCH_TIMESHEET,
    payload: request
  };
}

// Test
export function fetchTest() {
  const request = axios.get(ROOT_URL); // this ajax returns a promise

  return dispatch => {
    request.then(({data}) => {
      console.log('data', data);
      dispatch({type: FETCH_TEST, payload: data});
    });
  };
  // payload is an optional paraamter that goes into action that can provide some additional info
}





export function createTimesheet(props) {
  const request = axios.post(ROOT_URL, props);
  console.log('create action hit', props);
  return {
    type: CREATE_TIMESHEET,
    payload: request
  };
}

export function fetchUserData(name) {
  console.log('hittin it name', name);
  const request = axios.get(`${ROOT_URL}${name}`);
  console.log('hittin it', request);
  return {
    type: FETCH_USER_DATA,
    payload: request
  };
}

// not being used for now
export function deleteTime(id) {
  const request = axios.delete(`${ROOT_URL}${id}`);

  return {
    type: DELETE_TIMESHEET,
    payload: request
  };
}
