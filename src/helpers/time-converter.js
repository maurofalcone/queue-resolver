const timeConverter = {
    secondsToHours: function(seconds) {
        return (seconds/3600);
    },
    minutesToHours: function(minutes) {
        return (minutes/60);
    },
    hoursToMinutes: function(hours) {
        return (hours*60);
    },
    hoursToSeconds: function(hours) {
        return (hours*3600);
    },
    hoursToTimestamp: function(hours) {
        return (hours*3600000);
    }
}

export default timeConverter;