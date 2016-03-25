module.exports = {
  getFormatedTime: (seconds) => {
    let sec_num = parseInt(seconds, 10),
        hours = Math.floor(sec_num / 3600),
        minutes = Math.floor((sec_num - (hours * 3600)) / 60),
        sec = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (sec < 10) {
      sec = `0${sec}`;
    }

    let time = `${hours}:${minutes}:${sec}`;

    return time;
  }
};
