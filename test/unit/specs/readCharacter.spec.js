import { readCharacter } from "@/data/readCharacter";

describe("readCharacter", () => {
  it("should exist", () => {
    expect(readCharacter).to.exist;
  });
  it("should read the character file correctly", async () => {
    const filePath = "aurore.json";
    const result = await readCharacter(filePath);
    expect(result).to.not.be.null;
    expect(result).to.have.property("name", "Aurore");
  });
});
