import {ShowNotificationOptions} from '@toolpad/core/useNotifications'

export const getToastConfig = ({
  autoHideDuration = 5000,
  key,
  severity = 'error'
}: {
  autoHideDuration?: ShowNotificationOptions['autoHideDuration']
  key?: ShowNotificationOptions['key']
  severity?: ShowNotificationOptions['severity']
}) => ({
  autoHideDuration,
  key,
  severity
})
