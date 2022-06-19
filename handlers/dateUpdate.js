const dateUpdate = (timestamp) => {
  const newDate = new Date(timestamp);
  let result = newDate.toLocaleString();
  return result;
};

module.exports = { dateUpdate };
