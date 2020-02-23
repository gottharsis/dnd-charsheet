<template>
  <div id="notes-tab">
    <div class="columns is-gapless" style="height: 75vh">
      <div class="column is-3 has-background-dark note-list">
        <div class="menu">
          <ul class="menu-list">
            <li
              v-for="note in notes"
              :key="note.id"
              :class="{
                'has-background-info': note.id === activeNoteId,
                'note-select': true,
                'flex-row': true
              }"
              @click="setActiveNote(note)"
            >
              <a
                :class="{
                  'has-text-weight-bold': note.id === activeNoteId,
                  'note-menu-item': true
                }"
              >
                {{ note.title }}
              </a>

              <b-button type="is-text" @click="deleteNote(note)">
                <i class="fas fa-trash"></i>
              </b-button>
            </li>
            <li class="flex-row justify-center has-bacground-grey-light">
              <b-button type="is-text" @click="addNote">
                <i class="fas fa-plus"></i>
              </b-button>
            </li>
          </ul>
        </div>
      </div>
      <div class="column">
        <note-renderer :note="activeNote" />
      </div>
    </div>
  </div>
</template>

<script>
import NoteRenderer from "./NotesTab/NoteRenderer";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("Character");
import uuidv4 from "uuid/v4";
import deepclone from "lodash/cloneDeep";

export default {
  components: {
    NoteRenderer
  },
  computed: {
    ...mapState({
      currentNotes: state => state.character.notes
    })
  },
  data() {
    return {
      notes: [],
      activeNoteId: -1,
      activeNote: null
    };
  },
  mounted() {
    this.notes = deepclone(this.currentNotes);
    this.activeNote = this.notes[0];
    this.activeNoteId = this.activeNote.id;
  },
  methods: {
    ...mapActions(["setNotes", "updateNote", "deleteNote"]),
    setActiveNote(note) {
      this.activeNote = note;
      this.activeNoteId = note.id;
    },
    addNote() {
      const id = "note_" + uuidv4();
      const note = {
        id,
        title: "Untitled Note",
        content: ""
      };
      this.notes.push(note);
      this.setNotes({ notes: this.notes });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~bulmaswatch/superhero/variables";
@import "~bulma/bulma";
.note-select {
  border: 1px solid $grey-lighter;
  // border-right: none;
}

#notes-tab {
  min-height: 75vh;
}

.note-list {
  // border-right: 1px solid $grey-lighter;
}

.note-menu-item {
  flex: 3;
}
</style>
