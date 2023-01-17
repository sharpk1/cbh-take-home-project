const {
  deterministicPartitionKey,
  generateHash,
  isCandidateOverMaxLength,
  constants,
} = require("./dpk");

const createStringOverMaxLength = () => {
  let final = "";
  for (let i = 0; i < 300; i++) {
    final += "A";
  }
  return final;
};

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Should return a valid trivialKey if partitionKey does not exist but event does", () => {
    const event = "eventWithoutPartitionKey";
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey.length).toBeGreaterThan(10);
    expect(trivialKey).toBeTruthy();
  });

  it("Should return trivialKey as a string if the partitionKey is an integer", () => {
    const event = { partitionKey: "239487" };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(event.partitionKey);
  });

  it("Should return trivialKey as a string if the partitionKey is a string", () => {
    const event = { partitionKey: 239487 };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(event.partitionKey.toString());
  });

  it("Should return a valid trivialKey if partitionKey is over 250 characters in length", () => {
    const testString = createStringOverMaxLength();
    const event = { partitionKey: testString };
    const trivialKey = deterministicPartitionKey(event);
    expect(testString.length).toBe(300);
    expect(trivialKey).toBeTruthy();
    expect(trivialKey.length).toBeLessThan(250);
  });
});

describe("Helper functions and constants for deterministicPartitionKey", () => {
  it("Should generate a hash given an input", () => {
    const input = { partitionKey: "testKey" };
    const hash = generateHash(JSON.stringify(input));
    expect(hash).toBeTruthy();
    expect(hash.length).toBeGreaterThan(10);
  });

  it("Should determine whether a candidate is over the max length", () => {
    const testString = createStringOverMaxLength();
    const result = isCandidateOverMaxLength(testString);
    expect(result).toBe(true);
  });

  it("Should retrieve the correct values for each constant", () => {
    expect(constants.MAX_PARTITION_KEY_LENGTH).toBe(256);
    expect(constants.TRIVIAL_PARTITION_KEY).toBe("0");
  });
});
