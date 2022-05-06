<template>
  <Page class="main-page" backgroundImage="~/images/fon.png">
    <ActionBar title="Temperature">
      <StackLayout orientation="horizontal">
        <Label text='Добавление' />
      </StackLayout>
    </ActionBar>
    <FlexboxLayout width="100%" flexDirection="column" justifyContent="center" class="calculator">
      <Label textAlignment="center" class="text title" text='Добавление нового дела' />
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
    </FlexboxLayout>
    </FlexboxLayout>
  </Page>
</template>

<script lang="ts">
  import Vue from "nativescript-vue";
  import * as _ from 'lodash';
  import {appendState, getStateById, TTodo} from '../store';

  function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  export default Vue.extend({
    data() {
      let store = {
        id: generateUUID(),
        name: '',
        discription: '',
        isDo: false,
      }
      return store;
    },
    computed: {
    },

    methods: {
      save() {
        let state: TTodo = {
          id: this.$data.id,
          name: this.$data.name,
          discription: this.$data.discription,
          isDo: this.$data.isDo,
        }
        
        appendState(state);
        this.$modal?.close(state)
      },
      cancel(){
        this.$modal?.close()
      }
    }
  });
</script>

<style scoped lang="scss">

</style>
