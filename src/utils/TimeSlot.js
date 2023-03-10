import moment from 'moment';

const timeSlot = () => {
  var now = `${moment(new Date()).format('HH:mm')}`;

  const times = now.split(':');
  let splitedHour = times[0];
  let splitedMin = times[1];
  let newtimeSlot = '';
  let displaytimeslot = '';
  if (splitedMin > 30) {
    splitedMin = 60 - splitedMin;
  } else {
    splitedMin = 30 - splitedMin;
  }

  now = moment(new Date()).add(splitedMin, 'm');
  var newRoundedTime = moment(new Date()).add(splitedMin, 'm').format('HH:mm');
  var newEndroundTime = moment(now).add(30, 'm').format('HH:mm');

  newtimeSlot = newRoundedTime
    .toString()
    .concat('TO', newEndroundTime.toString());

  displaytimeslot = newRoundedTime
    .toString()
    .concat(' TO ', newEndroundTime.toString());
  console.log('newtimeSlot', newtimeSlot);

  //   setDisplayedTimeSlot(displaytimeslot);
  //   setTimeSlot(newtimeSlot);
  const timeSlots = {
    dtime: displaytimeslot,
    ptime: newtimeSlot,
  };

  return timeSlots;
};

export {timeSlot};
