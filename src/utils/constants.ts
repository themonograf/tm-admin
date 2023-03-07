import moment from "moment";

export function checkIsInactivity() {
  const sessionTimeout = localStorage.getItem("sessionTimeout");
  const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
  const duration = moment.duration(
    moment(currentTime).diff(moment(sessionTimeout)),
  );

  return duration.asHours() >= 4;
}
