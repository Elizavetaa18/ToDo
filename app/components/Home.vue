<template>
  <Page class="main-page" backgroundImage="~/images/fon.png">
    <ActionBar>
      <DockLayout>
        <Label style="font-size: 20" dock="left" text="ToDo list" />
      </DockLayout>
    </ActionBar>
    <Label alignSelf='center' class="text title" text="Список дел" />
      <ScrollView>
        <FlexboxLayout flexDirection="column">
          <DockLayout alignSelf='center'>
            <Button dock='right' class="add_button" text="+" @tap="addToDo" />
            <Label dock='left' textAlignment="right" class="text title" text="Текущие задачи" />
          </DockLayout>
          <template v-for="item in actualToDo">
            <StackLayout :class="{ 'is-do': item.isDo }">
              <FlexboxLayout>
                <Image class="icon" src='~/images/square.png' @tap="changeIsDo(item.id)" />
                <Label class="text title" :text="item.name" />
              </FlexboxLayout>
              <Label class="text" :text="item.discription" />
              <Button class="change" text="Изменить" @tap="editToDo(item.id)" />
            </StackLayout>
          </template>
          <Label
            class="text title"
            text="Текущих задач нет"
            v-if="actualToDo.length == 0"
          />
          <FlexboxLayout class="task-complete-top" justifyContent='center'>
            <Label 
              class="text title"
              text="Выполненые задачи"
              v-if="completeToDo.length > 0"
            />
          </FlexboxLayout>
          <template v-for="item in completeToDo">
            <StackLayout :class="{ 'is-do': item.isDo }">
              <FlexboxLayout>
                <Image class="icon" src='~/images/check.png' @tap="changeIsDo(item.id)" />
                <Label class="text title" :text="item.name" />
              </FlexboxLayout>
              <Label class="text" :text="item.discription" />
            </StackLayout>
          </template>
        </FlexboxLayout>
      </ScrollView>
  </Page>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import Edit from "./Edit.vue";
import Add from "./Add.vue";
import * as _ from "lodash";
import { getState, setStateById, getStateById } from "../store";

export default Vue.extend({
  data() {
    return {
      todoList: getState().toArray(),
    };
  },
  computed: {
    completeToDo() {
      return _.filter(this.$data.todoList, { isDo: true });
    },

    actualToDo() {
      return _.filter(this.$data.todoList, { isDo: false });
    },
  },
  methods: {
    changeIsDo(id: string) {
      let state = getStateById(id);
      let idx = _.findIndex(this.$data.todoList, {'id': id})
      // console.log(state);
      if (state != undefined) {
        state.isDo = !state.isDo;
        this.$data.todoList[idx].isDo = state.isDo
        setStateById(id, state);
        console.log(this.$data.todoList)
      }
    },

    editToDo(id: string) {
      this.$showModal(Edit, { fullscreen: true, props: { id: id } })
        .then((result) => {
          console.log(getState());
          this.$data.todoList = getState().toArray();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addToDo() {
      this.$showModal(Add, { fullscreen: true }).then((result) => {
        this.$data.todoList = getState().toArray();
      });
    },
  },
});
</script>

<style scoped lang="scss">
@import "@nativescript/theme/scss/variables/blue";

// Custom styles
.fas {
  @include colorize($color: accent);
}

.info {
  font-size: 20;
  horizontal-align: center;
  vertical-align: center;
}

.task-complete-top {
  margin-top: 35;
}
</style>
