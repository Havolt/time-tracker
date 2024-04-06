/**
      * @returns {string} Formatted time string (HH:mm:ss).
   */
function formatHumanReadableTime(baseTime) {
   const date = new Date(0)
   date.setSeconds(baseTime)
   const timeString = date.toISOString().substring(11, 19)
   return timeString
}

export {
   formatHumanReadableTime
}