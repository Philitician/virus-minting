const hre = require('hardhat');

async function main() {
  const ParticipatingVirus = await hre.ethers.getContractFactory('VirusNFT');
  const participatingVirus = await ParticipatingVirus.deploy(
    'Participating Virus',
    'PV',
    100,
    'ipfs://QmP1r8GNmrAkxTH5ivmW9mwYswafBneUtVhDc3nTBwzSJ4/'
  );

  await participatingVirus.deployed();

  console.log(
    'Participating Virus contract deployed to:',
    participatingVirus.address
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
