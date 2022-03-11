const raritiesName = [
  "B",
  "A",
  "S",
  "SS",
  "SSS"
];

const classes = [
  "Normal",
  "Fire",
  "Water",
  "Electric",
  "Grass",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dragon",
  "Dark",
  "Steel",
  "Fairy"
];

export const getElemonNftImg = (
  baseCardId : number,
  bodyPart1 : number,
  bodyPart2 : number,
  bodyPart3 : number,
  bodyPart4 : number,
  bodyPart5 : number,
  bodyPart6 : number
) => {
  return `https://statics.elemon.io/avatar/${ baseCardId }/${ baseCardId }_${ bodyPart1 }_${ bodyPart2 }_${ bodyPart3 }_${ bodyPart4 }_${ bodyPart5 }_${ bodyPart6 }.png`;
};

export const getRarityImg = (rarity : number) => {
  const raritySymbol = raritiesName[rarity - 1];

  return `https://app.elemon.io/assets/images/rarity_${ raritySymbol }.png`;
}

export const getClassImg = (classId : number) => {
  const symbol = classes[classId - 1];

  return `https://app.elemon.io/assets/images/element/${ symbol }.png`;
}

export const getStatName = (statType : number) => {
  const colors = ["Comm", "U.Comm", "Rare 1", "Rare 2", "Epic 1", "Epic 2", "Legend 1", "Legend 2", "Mythical"];
  return colors[statType - 1];
}

export const getStatColor = (statType : number) => {
  const colors = ["white", "white", "light-blue", "light-blue", "pink", "pink", "orange", "orange", "danger"];
  return colors[statType - 1];
}

export const getSkillImg = (img : string) => {
  return img.replace("game.", "statics.");
}
