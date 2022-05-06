<template>
  <Page class="main-page" backgroundImage="~/images/fon.png">
    <ActionBar title="Temperature">
      <StackLayout orientation="horizontal">
      </StackLayout>
    </ActionBar>
    <FlexboxLayout width="400" flexDirection="column" justifyContent="center" class="calculator">
      <Label textAlignment="center" class="text title" text='Изменение дела' />
      <FlexboxLayout>
        <Label class="text title" text='Название'/>
        <TextField class="text" hint="Enter text..." v-model='name' />
      </FlexboxLayout>
      <FlexboxLayout>
        <Label class="text title" text='Описание'/>
        <TextField class="text" hint="Enter text..." v-model='discription' />
      </FlexboxLayout>
      <FlexboxLayout>
        <Button class="change" text='Сохранить' @tap='save' />
        <Button class="change" text='Отменить' @tap='cancel' />
        <Button class="change" text='Удалить' @tap='remove' />
      </FlexboxLayout>
    </FlexboxLayout>
  </Page>
</template>

<script lang="ts">
  import Vue from "nativescript-vue";
  import {removeState, setStateById, getStateById} from '../store';

  export default Vue.extend({
    props: ['id'],
    data() {
      let todo = getStateById(this.$props.id)
      console.log(todo);
      let store = {
        id: todo?.id,
        name: todo?.name,
        discription: todo?.discription,
        isDo: todo?.isDo,
      }
      return store;
    },
    computed: {
    },

    methods: {
      save() {
        let state = getStateById(this.$data.id)
        if (state === undefined) {
          return
        }
        state.name = this.$data.name;
        state.discription = this.$data.discription;
        state.isDo = this.$data.isDo;
        setStateById(this.$props.id, state);
        this.$modal?.close(state)
      },

      cancel(){
        this.$modal?.close()
      },

      remove() {
        removeState(this.$props.id)
        this.$modal?.close()
      },
    }
  });
</script>

<style scoped lang="scss">

</style>
