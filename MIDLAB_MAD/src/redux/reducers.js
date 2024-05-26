// src/redux/reducers.js
import { combineReducers } from 'redux';
import {
  SET_SELECTED_DATE,
  SAVE_PRAYER_RECORD,
  SET_STREAK_COUNT,
  RESET_STREAK_COUNT,
} from './actions';

const initialPrayerState = {
  selectedDate: null,
  prayerRecords: [],
};

const initialStreakState = {
  streakCount: 0,
};

const prayerReducer = (state = initialPrayerState, action) => {
  switch (action.type) {
    case SET_SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.payload,
      };
    case SAVE_PRAYER_RECORD:
      return {
        ...state,
        prayerRecords: [...state.prayerRecords, action.payload],
      };
    default:
      return state;
  }
};

const streakReducer = (state = initialStreakState, action) => {
  switch (action.type) {
    case SET_STREAK_COUNT:
      return {
        ...state,
        streakCount: action.payload,
      };
    case RESET_STREAK_COUNT:
      return {
        ...state,
        streakCount: 0,
      };
    default:
      return state;
  }
};

export default combineReducers({
  prayer: prayerReducer,
  streak: streakReducer,
});
