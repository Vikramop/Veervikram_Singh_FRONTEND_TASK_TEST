const { ethers, run } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('🚀 Deploying with: ', deployer.address);

  const ProjectOSAA = await ethers.getContractFactory('ProjectOSAA');
  const projectOSAA = await ProjectOSAA.deploy();
  await projectOSAA.waitForDeployment();

  const address = await projectOSAA.getAddress();
  console.log('✅ ProjectOSAA deployed to:', address);

  // Wait for network propagation (optional, improves verify reliability)
  await new Promise((resolve) => setTimeout(resolve, 30000));

  // Automatic Etherscan Verification
  try {
    await run('verify:verify', {
      address,
      constructorArguments: [],
    });
    console.log('🔍 Verified on Etherscan!');
  } catch (e) {
    console.error('❌ Etherscan verification failed:', e.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
