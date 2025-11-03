import * as Calendar from 'expo-calendar';
import { Alert, Platform } from 'react-native';
import { parseDate } from 'utils/parseDate';
import { Event } from '../@types/event';

export const getCalendarPermissions = async () => {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  if (status === 'granted') {
    // Permission granted
    return true;
  }
  // Permission denied or needs to be asked again
  console.warn('Calendar permission not granted.');
  return false;
};

export const getReminderPermissions = async () => {
  // Reminders are a separate permission on iOS
  if (Platform.OS === 'ios') {
    const { status } = await Calendar.requestRemindersPermissionsAsync();
    if (status === 'granted') {
      return true;
    }
    console.warn('Reminder permission not granted on iOS.');
    return false;
  }
  // On Android, calendar permissions usually cover reminders too
  return true;
};

export async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

// TO DO: update this to work on Android, see more: https://docs.expo.dev/versions/latest/sdk/calendar/#usage
export async function getDefaultCalendarId() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.id;
}

export const addEventToCalendar = async (eventData: Event) => {
  if (!(await getCalendarPermissions())) {
    Alert.alert('Permission to access calendar is required.');
    return;
  }

  try {
    const defaultCalendarId = await getDefaultCalendarId();

    const eventDetails = {
      title: eventData.title,
      startDate: parseDate(eventData.startDate, 'PPpp'),
      endDate: parseDate(eventData.endDate, 'PPpp'),
      location: eventData.place,
      notes: eventData.description,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Fallback to local time zone
    };

    const eventId = await Calendar.createEventAsync(defaultCalendarId, eventDetails);

    console.log(`Event created successfully with ID: ${eventId}`);
    // You might want to update the UI state (e.g., show a toast)
    return eventId;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    alert('Failed to add event to calendar.');
  }
};

// TO DO: fix this:
/**
 * 
 * Error setting reminder: [Error: Calling the 'saveReminderAsync' function has failed
→ Caused by: Calendar with id 8636D11F-E9BA-4F67-921F-CB72AAFE15ED is not of type `reminder`]

 */
export const setEventReminder = async (eventData: Event) => {
  // Check both Calendar and Reminder permissions (Reminder on iOS is separate)
  if (!((await getCalendarPermissions()) && (await getReminderPermissions()))) {
    alert('Permission to set a reminder is required.');
    return;
  }

  try {
    const defaultCalendarId = await getDefaultCalendarId();

    const reminderDetails = {
      title: `REMINDER: ${eventData.title}`,
      dueDate: parseDate(eventData.startDate, 'PPpp'),
      notes: eventData.description,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      alarms: [{ relativeOffset: -15 }],
    };

    const reminderId = await Calendar.createReminderAsync(defaultCalendarId, reminderDetails);

    console.log(`Reminder set successfully with ID: ${reminderId}`);
    // Update UI state
    return reminderId;
  } catch (error) {
    console.error('Error setting reminder:', error);
    alert('Failed to set a reminder.');
  }
};
