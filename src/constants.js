const CONTRACT_ADDRESS = "0xc01180dd8B70978C4f11Cb17Cac4D300bf54120e";
const TWITTER_HANDLE = "nerderlyne";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const transformCharacterData = (characterData) => {
  return {
    name: characterData.name,
    imageURI: characterData.imageURI,
    hp: characterData.hp.toNumber(),
    maxHp: characterData.maxHp.toNumber(),
    attackDamage: characterData.attackDamage.toNumber(),
  };
};

export {
  CONTRACT_ADDRESS,
  TWITTER_HANDLE,
  TWITTER_LINK,
  transformCharacterData,
};
