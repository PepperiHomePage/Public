customFunction.buildAccountInfo = function (slideid) {
  var accountInfoHTML = "";

  accountInfoHTML += customFunction.buildCredit();
  accountInfoHTML += customFunction.buildBalance();

  document.getElementById(slideid).innerHTML = accountInfoHTML;
  document.getElementById(slideid).style.display = "block";
};

customFunction.buildCredit = function () {
  var creditHTML = "";

  creditHTML += `<div class="credit">
                    <div>
                      <p>Credit</p>
                      <p id="credit"></p>
                    </div>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABQCAMAAADRPICnAAACN1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9pu+VyAAAAvXRSTlMAAQIDBAUGBwgJCgsMDg8QERIUFRYXGBobHB0eHyAhIyQnKCkqKywtLi8wMTU2Nzg5Ojs8PT4/REVGR0hJSktMTU5PUlNUVVZXWFlaXF9gYWJjZGVmZ2hpamttbm9wcXJzdHV6e3x9foCBgoOFhoeIiYqLjI2Oj5CRkpaYmZqbnJ2hoqOkpaanqKmqq6yusLGys7S2t7i5u76/wMHCw8XGx8jLzM3Oz9DR0tPU1tfY2drb3N3e3+Dh4uPk5ebl3HCbAAAAAWJLR0QB/wIt3gAABJ5JREFUWMPtWetfE0cUTYJBiCKpSBUFMVpLQw2oQQiggq+IT8D3A2hUwCAoEJ8YReOTxEcEpUV8QCukSlUI1hL0/nGdbF47mdnN7iT+fn7gfNrN3D03ezJzz9yJQjGDGXxHSP5x9reiVmaX1dlf+MB3a3nCubVra2y9Xghh0pA46tl55ub7HojCX8mJUCSnvP7aSx+f98vQjRMV+mZ0VRanIsZaW58X+85jrpad+ZrA8BBAEyu1WldpcQxj1FODXUdN2fwgO8AdBu5M09Gu/imM2+NoNOuSiMg6gBFZ1GmG3a1uXJEP7s59hjkC8SYUoE2gIgQWo7BCSYoMTktRhJxf4wDVonNk/4Wnkxj1O6d1hz5VsqZPADoEB/MffeFTf3p28UDRfBnlAi0OVC7giVBEcXieTL/utmxcqpJVLiKLY1xJj9Jwq/6t01qlT5FRLraT5WIxPXYTGqrPiKdchGCiP2EBGGIuFxiO0x87DDDKpAiBq/SHS8QXIVcu/gMpeE5nWISGVkssF+Lw0S1B+ZFYhJRyIQkr6K/gBugUK6DSsYWeoB2gl0UREo30BHsBvKd7/ob4cZuewACJgoDnpH2Nl/iDu3W3wV8R0ukZ3rBTT/R37SvKCHtOAT3BbRZq37DDUqlT4Z6zl56gkUURsvL2ArTTE2yRTD3uV0TIizoB3PSRFSyKkKhGPwndc9TiK9fjpCpCYDWKzaIPDbAoQiBd2HOusihCYhTgGH3kGIsiJO4Keo4pQP3xcfuegjQG5vSAYTUBDNADshD7+ZIslvbsZ3PTvVGYqvDfbEO7TLVUz5HcngVw0//RSomeE1uRNag9m8C2x+u51/HF8pyYmIUUidpdfP798uHi4KZhEOCU3EWI/1YjeHt282RlbhLe59yiP1mI4pfETlAd4v7HdWbXrxpan/NGwHPQQ6WRW1Vph6undRURlvMe/u2/dHDdAuzTVP0OaxvXn5QimjRBz6kL3yz7I/A9HYRBzVmENSNJSzdaul9ze/+H/vslop5jD13nvg9v1eYKqjW/6MDFZ58iP4iLm7oTYp4zGNKnP/KYjRKKFGlxvcNm0uTTtoUhzzlHT7A1svEr4de8zOi9fvcQ1g1Nv7r+2/ocFc9zHtMT/ISCVwYuz/IJtpNh4aLYc7rql6hznBpU0OjTPRl5zrbA5R1+ggY8LI/70Nt3vtb4g3zPCR42dPMTHIkKq7pSX56jZPScu4GrBn6CYoVszzlEHzke7nNyea34qFpmgj9RvyfsOcF11RZJsFkefQbq92CD8GFDsM9RO4L0XxskU6foq6zOt9xLp8Q+bEg6OOYPHTBJoVZx5SIs62ejpMOGWavMm3QxuaPLBargD/IEoztEDhto5cLqjC4XF/YbtUwbvwSd+RQKHzYEMc/fxE2S+2yNtLeeh3tOVFtrbnR4yFOwTFmTeITvOSKKTA/7FZG5qwwWObsURVIVjGgKn7po8ne2uMYwam+frdaoVcSFcsTTnF9x4gZuKb6X10QLqIwzb6LZ9NxvNucl8K+Bgojg3l5bzVqtItHQOabA98JeV5atVHwjqBckK2Ywg+8H/wN6KKgIpbeWyAAAAABJRU5ErkJggg==">
                  </div>`;

  return creditHTML;
};

customFunction.buildBalance = function () {
  var balanceHTML = "";

  balanceHTML += `<div class="balance">
                    <div>
                      <p>Balance</p>
                      <p id="balance"></p>
                    </div>
                    <img src="https://storage.pepperi.com/PreSales/NewFoodDemoImg/balance.svg">
                  </div>`;

  return balanceHTML;
};