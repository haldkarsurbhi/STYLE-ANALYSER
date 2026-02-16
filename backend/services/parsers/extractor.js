function extractKeyData(text) {
  return {
    stitchType: text.includes("SNLS") ? "SNLS" : null,
    buyer: text.match(/Buyer:\s*(.*)/)?.[1] || null,
    season: text.match(/Season\s*:\s*(.*)/)?.[1] || null,
    garmentType: text.includes("SHORT SLEEVE") ? "Short Sleeve Shirt" : null,
    spi: text.match(/SPI\s*(\d+)/)?.[1] || null
  };
}

module.exports = extractKeyData;
