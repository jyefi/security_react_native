import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import * as Calendar from 'expo-calendar';
import * as Permissions from 'expo-permissions';
import { Calendar as ExpoCalendar } from 'react-native-calendars';

export default function CalendarScreen() {
  const [calendarPermission, setCalendarPermission] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    async function requestPermission() {
      const { status } = await Permissions.askAsync(Permissions.CALENDAR);
      setCalendarPermission(status);
    }
    requestPermission();
  }, []);

  useEffect(() => {
    async function loadEvents() {
      if (calendarPermission !== 'granted') {
        return;
      }

      const { startDate, endDate } = getStartAndEndDates(selectedDate);

      const { id } = await getDefaultCalendarId();
      const events = await Calendar.getEventsAsync(
        [id],
        startDate,
        endDate
      );
      setEvents(events);
    }
    loadEvents();
  }, [calendarPermission, selectedDate]);

  async function getDefaultCalendarId() {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    const defaultCalendar = calendars.find(cal => cal.isPrimary) || calendars[0];
    return defaultCalendar;
  }

  function getStartAndEndDates(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    return { startDate, endDate };
  }

  function handleDayPress(day) {
    setSelectedDate(new Date(day.timestamp));
  }

  const markedDates = {};
  events.forEach(event => {
    const date = new Date(event.startDate);
    const dateString = date.toISOString().split('T')[0];
    markedDates[dateString] = { marked: true };
  });

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, marginVertical: 16 }}>
        Calendar Example
      </Text>
      {calendarPermission === 'granted' ? (
        <ExpoCalendar
          markedDates={markedDates}
          onDayPress={handleDayPress}
        />
      ) : (
        <Text>No calendar access</Text>
      )}
    </View>
  );
}
