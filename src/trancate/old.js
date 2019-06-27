// original function
const trancate = (title, limit = 17) => {
  if (title.length > limit) {
    const current = [];
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        current.push(cur);
      }
      return acc + cur.length;
    }, 0);

    return `${current.join(' ')} ...`;
  }

  return title;
};
