// import Guide from "@/store/modules/Guide";
import Guide from "../../../src/renderer/store/modules/Guide";
describe.only("Guide Tests", () => {
  describe("Mutations", () => {
    let state = {};
    beforeEach(() => {
      state = {
        armors: [],
        backgrounds: [],
        classes: [],
        races: [],
        skills: [],
        spells: [],
        weapons: [],
        stats: [],
        isInitialized: false
      };
    });
    it("Should set the state of armor", () => {
      const newArmor = ["Test Armor"];
      Guide.mutations.SET_GUIDE_PROPERTY(state, {
        property: "armors",
        value: newArmor
      });
      expect(state).to.have.property("armors");
      expect(state.armors).to.not.be.empty;
      expect(state.armors[0]).to.equal("Test Armor");
    });

    it("Should set initialized", () => {
      Guide.mutations.SET_INITIALIZED(state);
      expect(state.isInitialized).to.be.true;
    });
  });
  describe("Actions", () => {
    let state = {};
    beforeEach(() => {
      state = {
        armors: [],
        backgrounds: [],
        classes: [],
        races: [],
        skills: [],
        spells: [],
        weapons: [],
        stats: [],
        isInitialized: false
      };
    });

    it("Should load the state of armors", async () => {
      const mockCommit = (type, payload) => {
        expect(type).to.equal("SET_GUIDE_PROPERTY");
        expect(payload).to.have.property("property");
        expect(payload).to.have.property("value");

        expect(payload.property).to.equal("armors");
        expect(payload.value).to.be.a("array");
        expect(payload.value).to.have.length.greaterThan(0);

        state.armors = payload.value;
      };
      await Guide.actions.loadStore(
        { commit: mockCommit },
        { name: "armors", file: "armor.json" }
      );

      expect(state.armors).to.not.be.empty;
    });

    it("Should load all the states correctly", async () => {});
  });

  describe("Getters", () => {
    let state = {};
    beforeEach(() => {
      state = {
        armors: [{ id: 1, name: "Test" }],
        backgrounds: [],
        classes: [],
        races: [],
        skills: [],
        spells: [],
        weapons: [],
        stats: [],
        isInitialized: true
      };
    });

    it("should get armor by id", () => {
      const result = Guide.getters.getArmorById(state)(1);
      expect(result).to.exist;
      expect(result).to.have.property("name", "Test");
    });
  });
});
