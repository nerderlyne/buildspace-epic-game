const main = async () => {
  // eslint-disable-next-line no-undef
  const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");
  const gameContract = await gameContractFactory.deploy(
    ["Meredith Grey", "Olivia Benson", "Benjamin Button"], // Names
    [
      "https://i.imgur.com/CoZF2Dg.jpeg", // Images CoZF2Dg
      "https://i.imgur.com/dpTSkXG.jpeg",
      "https://i.imgur.com/pmnIOJm.jpeg",
    ],
    [500, 400, 400], // HP values
    [25, 70, 100], // Attack damage values
    "Bath", // Boss
    "https://i.imgur.com/HM8CRCC.jpeg", // Boss Image
    10000, // Boss hp
    50 // Boss attack damage
  );
  await gameContract.deployed();
  console.log("Contract deployed to: ", gameContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
