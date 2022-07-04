export function randomInRange(range) {
  return Math.floor(Math.random() * range);
}

export function randomVerse(index) {
  const book = randomInRange(index.length);
  const chapter = randomInRange(index[book].chapters.length);

  return {
    passage: index[book].passage,
    chapter: chapter,
  };
}
