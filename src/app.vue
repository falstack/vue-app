<template>
  <div>
    <h1>vue-app</h1>
    <p>A vue project.</p>
      <button @click="showAlert">测试 alert</button>
      <button @click="showConfirm">测试 confirm</button>
  </div>
</template>

<script lang="babel">
  export default {
    name: 'app',
    created () {

    },
      methods : {
          showAlert () {
              $alert.show({
                  content: '哈哈啊哈'
              }).then(() => {
                  console.log('alert submit');
              })
          },

          showConfirm () {
              $confirm.show({
                  content: '测试哈哈'
              }).then(() => {
                  console.log('confirm ok');
              }).catch(() => {
                  console.log('confirm cancel');
              })
          }
      }
  };
</script>
