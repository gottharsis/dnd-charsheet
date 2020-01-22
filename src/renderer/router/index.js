import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "landing-page",
      component: require("@/components/LandingPage").default
    },
    {
      path: "/character-select",
      name: "character-select",
      component: require("@/components/CharacterSelect").default
    },
    {
      path: "/home",
      name: "home-page",
      component: require("@/components/HomePage").default,
      children: [
        {
          path: "/spells",
          component: require("@/components/HomePage/tabs/SpellTab").default
        },
        {
          path: "/combat",
          component: require("@/components/HomePage/tabs/CombatTab").default
        },
        {
          path: "/inventory",
          component: require("@/components/HomePage/tabs/InventoryTab").default
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
      path: "*",
      redirect: "/"
    }
  ]
});
