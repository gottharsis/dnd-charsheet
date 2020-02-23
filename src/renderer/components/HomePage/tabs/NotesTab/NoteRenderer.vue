<template>
  <div class="content has-background-dark is-full-height">
    <div v-if="!editMode">
      <div class="flex-row justify-flex-end">
        <b-button @click="edit">
          <i class="fa fa-edit"></i>
        </b-button>
      </div>
      <div class="has-padding-50" v-html="html"></div>
    </div>
    <form v-else class="is-full-height flex-column">
      <div>
        <b-input v-model="localNote.title"></b-input>
      </div>
      <textarea
        class="textarea is-full-height"
        v-model="localNote.content"
        ref="text"
      ></textarea>
      <div>
        <b-button @click="save">
          Save
        </b-button>
      </div>
    </form>
  </div>
</template>

<script>
import md from "./md-renderer";
import { mixin as clickaway } from "vue-clickaway";
import { createNamespacedHelpers as help } from "vuex";
import deepclone from "lodash/cloneDeep";

const { mapActions } = help("Character");

export default {
  props: {
    note: Object
  },
  mixins: [clickaway],
  mounted() {
    this.localNote = deepclone(this.note);
  },
  computed: {
    html() {
      if (this.note == null) {
        return "";
      }
      const result = md.render(this.note.content);
      console.log(this.note.content);
      console.log(result);
      return result;
    }
  },
  data() {
    return {
      editMode: false,
      localNote: {}
    };
  },
  methods: {
    ...mapActions(["updateNote"]),
    edit() {
      this.editMode = true;
      this.cloneNote();
      console.log(this.$refs["text"]);
    },
    save() {
      this.updateNote({ note: this.localNote });
      this.editMode = false;
    },
    cloneNote() {
      this.localNote = deepclone(this.note);
    }
  }
};
</script>

<style lang="scss" scoped></style>
