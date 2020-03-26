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

              <b-button type="is-text" @click="deleteNote({ note })">
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
        <note-renderer :note="activeNote" ref="renderer" />
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
      notes: state => state.character.notes
    })
  },
  data() {
    return {
      // notes: [],
      activeNoteId: -1,
      activeNote: null
    };
  },
  mounted() {
    // this.notes = deepclone(this.currentNotes);
    this.activeNote = this.notes[0];
    this.activeNoteId = this.activeNote.id;
  },
  methods: {
    ...mapActions(["setNotes", "updateNote", "deleteNote"]),
    setActiveNote(note) {
      console.log("Setting active note: ");
      console.log(note);
      this.activeNote = note;
      this.activeNoteId = note.id;
    },
    async addNote() {
      const id = "note_" + uuidv4();
      console.log("id: " + id);
      const note = {
        id,
        title: "Untitled Note",
        content: ""
      };
      const newNotes = deepclone(this.notes);
      newNotes.push(note);
      this.setNotes({ notes: newNotes });

      const n = this.notes[this.notes.length - 1];
      this.setActiveNote(n);
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
