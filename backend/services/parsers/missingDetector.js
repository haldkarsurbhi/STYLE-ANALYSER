function detectMissingFields(data) {
  const missing = [];

  if (!data.fabricComposition) missing.push("Fabric Composition");
  if (!data.washType) missing.push("Wash Type");

  return missing;
}

module.exports = detectMissingFields;
