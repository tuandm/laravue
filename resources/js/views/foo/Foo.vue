<template>
  <div class="app-container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card card-default">
          <h3 class="card-header">Foo Component</h3>
          <div class="card-body">
            I'm a foo component.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('Foo component mounted.');
  },
};
</script>
