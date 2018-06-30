<template>
  <header class="header">
    <div class="grid justify-center">
      <div class="col-xs-12  col-sm-6  col-lg-4">
        <h1 class="header__title">Do it!</h1>

        <NewTask />
      </div>
    </div>
  </header>
</template>

<script>
import NewTask from '../NewTask';

export default {
  name: 'Header',
  components: {
    NewTask
  }
}
</script>

<style lang="scss">
.header {
  background-color: $color2;
  color: $color1;
  padding: 20px;
  margin-bottom: 20px;

  &__title {
    margin-bottom: 20px;
  }
}
</style>
