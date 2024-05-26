// src/redux/actions.js

export const SET_SELECTED_DATE = 'SET_SELECTED_DATE';
export const SAVE_PRAYER_RECORD = 'SAVE_PRAYER_RECORD';
export const SET_STREAK_COUNT = 'SET_STREAK_COUNT';
export const RESET_STREAK_COUNT = 'RESET_STREAK_COUNT';

// Action creators
export const setSelectedDate = (date) => ({
  type: SET_SELECTED_DATE,
  payload: date,
});

export const savePrayerRecord = (prayerRecord) => ({
  type: SAVE_PRAYER_RECORD,
  payload: prayerRecord,
});

export const setStreakCount = (count) => ({
  type: SET_STREAK_COUNT,
  payload: count,
});

export const resetStreakCount = () => ({
  type: RESET_STREAK_COUNT,
});
