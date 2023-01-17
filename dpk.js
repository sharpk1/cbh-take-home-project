const crypto = require("crypto");

const constants = {
  TRIVIAL_PARTITION_KEY: "0",
  MAX_PARTITION_KEY_LENGTH: 256,
};

const generateHash = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
};

const isCandidateOverMaxLength = (candidate) => {
  return candidate.length > constants.MAX_PARTITION_KEY_LENGTH;
};

exports.deterministicPartitionKey = (event) => {
  let candidate = constants.TRIVIAL_PARTITION_KEY;

  if (event) {
    candidate = event.partitionKey ?? generateHash(JSON.stringify(event));
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  }

  return isCandidateOverMaxLength(candidate)
    ? generateHash(candidate)
    : candidate;
};

exports.generateHash = generateHash;
exports.constants = constants;
exports.isCandidateOverMaxLength = isCandidateOverMaxLength;
