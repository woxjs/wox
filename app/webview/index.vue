<template>
  <div v-redirect:sync="'/afdsa'">world</div>
</template>
<script>
  export default {
    name: "IndexPage",
    enter(ctx) {
      console.log('enter', ctx.path);
    }
  }
</script>