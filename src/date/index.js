const date = {
  fmtDate(obj) {
    const date = new Date(obj);
    const y = 1900 + date.getYear();
    const m = `0${date.getMonth() + 1}`;
    const d = `0${date.getDate()}`;
    return `${y}-${m.substring(m.length - 2, m.length)}-${d.substring(d.length - 2, d.length)}`;
  },
  getTimeStamp() {
    const id = `${Math.floor(new Date().getTime() / 1000)}${Math.floor(10 + (Math.random() * 89))}`;
    return parseInt(id, 10);
  },
};
export default date;
