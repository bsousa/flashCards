import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'flashCards:notification'

export function getMetaInfo(title) {
  return {
    'title': title,
    questions: [],
  }
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(19)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                notification,
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

const notification = {
  title: 'Lets go student?',
  body: "don't forget to study today!",
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true,
  }
}
