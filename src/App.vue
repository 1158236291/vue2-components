<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> &nbsp;|&nbsp;
      <router-link to="/about">About</router-link>&nbsp; |&nbsp;
      <router-link to="/table">Table</router-link> &nbsp;|&nbsp;
      <router-link to="/upload">Upload</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less" scoped>
#app {
  background-color: @primaryColor;
  #nav {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
  }
}
</style>
