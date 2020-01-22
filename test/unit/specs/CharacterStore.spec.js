import mock from "mock-fs";
import c from "@/store/modules/Character";
import { Character } from "@/data/character";

describe("Character store tests", () => {
  it("Should have correct default character", () => {
    const e = new Character();
    expect(c.state.character).to.eql(e);
  });

  describe("Mutations test", () => {
    it("Should Set character appropriately", () => {
      const testState = {
        character: new Character(),
        characterFile: ""
      };

      const newCharacter = new Character();
      newCharacter.name = "TestName";

      const newCharFile = "testchar.file";

      // expect(c.mutations).to.have.property("SET_CHARACTER");
      const mutation = c.mutations.SET_CHARACTER;
      const payload = {
        character: newCharacter,
        characterFile: newCharFile
      };

      mutation(testState, payload);
      expect(testState.character.name).to.equal(newCharacter.name);
      expect(testState.characterFile).to.equal(newCharFile);
    });
  });

  describe("Actions test", () => {
    before(() => {
      mock({
        "/home/ayush/.dndCharSheet/aurore.json": '{ "name": "testname" }'
      });
    });

    it("should read the file and call the commit appropriately", async () => {
      const character = new Character();
      character.name = "testname";
      const characterFile = "aurore.json";
      const expectedMutation = {
        type: "SET_CHARACTER",
        payload: {
          character,
          characterFile
        }
      };

      const commit = (type, payload) => {
        expect(type).to.equal(expectedMutation.type);
        expect(payload.character.name).to.equal(
          expectedMutation.payload.character.name
        );
        expect(payload.characterFile).to.equal(
          expectedMutation.payload.characterFile
        );
      };

      await c.actions.chooseCharacter({ commit }, { characterFile });
    });

    after(() => {
      mock.restore();
    });
  });
});
