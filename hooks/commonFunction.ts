import moment from 'moment'

export const getDateAndTime = (sec: number) => {
  const str = moment(new Date(sec * 1000)).fromNow()

  switch (str) {
    case 'in a few seconds':
      return 'few sec'
    case 'a few seconds ago':
      return 'few sec'
    case 'a minute ago':
      return '1m'
    case 'an hour ago':
      return '1h'
    case 'a day ago':
      return '1day'
    default:
      const first = str.split(' ')[0]
      let mid = str.split(' ')[1]
      if (mid === 'minutes' || mid === 'minute') {
        mid = 'm'
      }
      if (mid === 'hours' || mid === 'hour') {
        mid = 'h'
      }
      if (mid === 'days' || mid === 'day') {
        mid = 'd'
      }
      return first + mid
  }
}
