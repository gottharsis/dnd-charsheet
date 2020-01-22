import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "landing-page",
      components: { page: require("@/components/LandingPage").default }
    },
    {
      path: "/character-select",
      name: "character-select",
      components: { page: require("@/components/CharacterSelect").default }
    },
    {
      path: "/home",
      name: "home-page",
      components: { page: require("@/components/HomePage").default },
      children: [
        {
          path: "/spells",
          components: {
            page: require("@/components/HomePage/tabs/SpellTab").default
          }
        },
        {
          path: "/combat",
          components: {
            page: require("@/components/HomePage/tabs/CombatTab").default
          }
        },
        {
          path: "/inventory",
          components: {
            page: require("@/components/HomePage/tabs/InventoryTab").default
          }
        },
        {
          path: "*",
          redirect: "/spells"
        },
        {
          path: "",
          redirect: "/spells"
        }
      ]
    },
    {
      path: "/edit-slots",
      name: "edit-slots",
      components: {
        modal: require("@/components/EditSlots").default,
        page: require("@/components/HomePage").default
      },
      meta: {
        showModal: true
      }
    },
    {
      path: "/edit-armor",
      name: "edit-armor",
      components: {
        modal: require("@/components/modals/EditArmor").default,
        page: require("@/components/HomePage").default
      },
      meta: {
        showModal: true
      }
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
