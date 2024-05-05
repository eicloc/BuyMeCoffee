const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("BuyMeCoffee", (m) => {
  const buymecoffee = m.contract("BuyMeACoffee", []);

  return { buymecoffee };
});
