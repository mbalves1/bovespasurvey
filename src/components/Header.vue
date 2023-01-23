<template>
  <div class="navbar">
    <div>
      <p class="navbar--title">
        <img src="https://d1in87wuzwnqr6.cloudfront.net/wp-content/uploads/2022/10/LOGO.svg" />
      </p>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
* {
  margin: 0
}
.navbar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100px;
  background: #979ddd;
  border-bottom: 4px solid var(--bs-white);

  div {
    display: flex;
    justify-content: space-between;
  }

  &--title {
    font-size: 30px;
    // padding: 40px;
    color: var(--bs-light);
  }
}
</style>
