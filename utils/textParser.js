module.exports = (file) => {
  const convertedString = file.data
    .toString()
    .split('\n')
    .filter((item) => item !== '');

  const moviesArr = [];
  let tempMovieObj = {};
  const movieKeysMap = ['title', 'year', 'format', 'actors'];

  convertedString.forEach((item, idx) => {
    const currItemNum = idx % 4;

    if (currItemNum !== 3) {
      tempMovieObj[movieKeysMap[currItemNum]] = currItemNum === 1 ? +item.split(': ')[1] : item.split(': ')[1];

      return;
    }

    tempMovieObj[movieKeysMap[3]] = item.split(': ')[1].split(', ');
    moviesArr.push(tempMovieObj);
    tempMovieObj = {};
  });

  return moviesArr;
};
