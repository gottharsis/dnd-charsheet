<template>
  <div id="overview">
    <div class="tile is-ancestor">
      <div class="tile is-vertical">
        <!-- Bar at top -->
        <div class="tile is-parent">
          <div class="tile is-child">
            <div class="level">
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading is-size-4">Spell DC</p>
                  <p class="has-text-weight-bold is-size-3">{{ dc }}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading is-size-4">AC</p>
                  <p class="has-text-weight-bold is-size-3">{{ ac }}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading is-size-4">Speed (ft)</p>
                  <p class="has-text-weight-bold is-size-3">{{ speed }}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading is-size-4">Proficiency Bonus</p>
                  <p class="has-text-weight-bold is-size-3">
                    {{ proficiencyBonus }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- First Row: Skills, etc -->
        <div class="tile">
          <!-- Skills Panel Column-->
          <div class="tile is-parent is-4">
            <div class="tile is-child box">
              <p class="is-size-3 has-text-centered">
                Skills
              </p>
              <skill-table />
            </div>
          </div>

          <!-- <div class="tile is-vertical"> -->
          <div class="tile is-vertical">
            <!-- First Row next to skills -->
            <div class="tile">
              <div class="tile is-parent is-4">
                <div class="tile is-child">
                  <!-- Health Indicator -->
                  <div class="flex-row justify-center align-center">
                    <health-indicator />
                  </div>
                </div>
              </div>

              <!-- Languages -->
              <div class="tile is-parent is-3">
                <div class="tile is-child">
                  <div
                    class="content box  has-padding-25 has-padding-right-25 has-padding-top-25"
                  >
                    <h3 class="is-size-4 has-text-weight-bold">
                      Languages
                    </h3>
                    <ul>
                      <li v-for="language in languages" :key="language">
                        {{ language }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Saving Throws  -->
              <div class="tile is-parent is-5">
                <div class="tile is-child">
                  <div class="box"><saving-throws /></div>
                </div>
              </div>
            </div>

            <!-- Second Row next to skills -->
            <div class="tile">
              <!-- Abilities -->
              <div class="tile is-parent is-8">
                <div class="tile is-child">
                  <div class="box">
                    <abilities />
                  </div>
                </div>
              </div>
              <!-- Features -->
              <div class="tile is-parent">
                <div class="tile is-child">
                  <div class="box">
                    <features />
                  </div>
                </div>
              </div>
            </div>

            <!-- Third Row next to skills -->
            <!-- <div class="tile"></div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { modifierString } from "@/util";
const { mapState, mapGetters } = createNamespacedHelpers("Character");
const { mapState: GuideState } = createNamespacedHelpers("Guide");
import SkillTable from "./OverviewTab/skills/SkillTable";
import SavingThrows from "./OverviewTab/SavingThrows";
import HealthIndicator from "./CombatTab/HealthSection/HealthIndicator";
import Features from "./OverviewTab/Features";
import Abilities from "./OverviewTab/Abilities";

export default {
  computed: {
    ...mapState({
      dc: state => state.character.magic.dc,
      ac: state => state.character.ac,
      languages: state => state.character.languages,
      speed: state => state.character.speed,
      proficiencyBonus: state =>
        modifierString(state.character.proficiencyBonus)
    })
  },
  components: {
    SkillTable,
    HealthIndicator,
    SavingThrows,
    Features,
    Abilities
  }
};
</script>

<style></style>
