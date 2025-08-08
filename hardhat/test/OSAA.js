const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('ProjectOSAA Contract', function () {
  let ProjectOSAA, projectOSAA, owner, addr1, addr2;

  beforeEach(async function () {
    ProjectOSAA = await ethers.getContractFactory('ProjectOSAA');
    [owner, addr1, addr2] = await ethers.getSigners();

    projectOSAA = await ProjectOSAA.deploy();
  });

  describe('Minting', function () {
    it('Should allow owner to mint tokens', async function () {
      const mintAmount = ethers.parseEther('100');

      await expect(projectOSAA.mint(addr1.address, mintAmount))
        .to.emit(projectOSAA, 'Mint')
        .withArgs(addr1.address, mintAmount);

      const balance = await projectOSAA.balanceOf(addr1.address);
      expect(balance).to.equal(mintAmount);
    });

    it('Should not allow non-owner to mint', async function () {
      await expect(
        projectOSAA.connect(addr1).mint(addr1.address, 100)
      ).to.be.revertedWithCustomError(
        projectOSAA,
        'OwnableUnauthorizedAccount'
      );
    });

    it('Should reject minting to zero address', async function () {
      await expect(
        projectOSAA.mint(ethers.ZeroAddress, 100)
      ).to.be.revertedWith('Mint to zero address');
    });

    it('Should reject minting zero amount', async function () {
      await expect(projectOSAA.mint(addr1.address, 0)).to.be.revertedWith(
        'Amount must be greater than zero'
      );
    });
  });

  describe('Transfers', function () {
    beforeEach(async function () {
      await projectOSAA.mint(addr1.address, ethers.parseEther('100'));
    });

    it('Should transfer tokens between users', async function () {
      const transferAmount = ethers.parseEther('50');

      await expect(
        projectOSAA.connect(addr1).transfer(addr2.address, transferAmount)
      )
        .to.emit(projectOSAA, 'Transfer')
        .withArgs(addr1.address, addr2.address, transferAmount);

      const balanceFrom = await projectOSAA.balanceOf(addr1.address);
      const balanceTo = await projectOSAA.balanceOf(addr2.address);

      expect(balanceFrom).to.equal(ethers.parseEther('50'));
      expect(balanceTo).to.equal(transferAmount);
    });

    it('Should reject transferring more than balance', async function () {
      await expect(
        projectOSAA
          .connect(addr1)
          .transfer(addr2.address, ethers.parseEther('200'))
      ).to.be.revertedWith('Insufficient balance');
    });

    it('Should reject transferring to zero address', async function () {
      await expect(
        projectOSAA.connect(addr1).transfer(ethers.ZeroAddress, 10)
      ).to.be.revertedWith('Transfer to zero address');
    });

    it('Should reject transferring zero tokens', async function () {
      await expect(
        projectOSAA.connect(addr1).transfer(addr2.address, 0)
      ).to.be.revertedWith('Amount must be greater than zero');
    });
  });

  describe('BalanceOf', function () {
    it('Should correctly report balances', async function () {
      await projectOSAA.mint(addr1.address, ethers.parseEther('75'));
      const balance = await projectOSAA.balanceOf(addr1.address);
      expect(balance).to.equal(ethers.parseEther('75'));
    });

    it('Should report zero for non-token holders', async function () {
      const balance = await projectOSAA.balanceOf(addr2.address);
      expect(balance).to.equal(0);
    });
  });
});
