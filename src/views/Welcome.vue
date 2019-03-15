<template>
    <div class="welcome">
      <div class="boxes">
        <div class="green-box" style="background-color: aquamarine"></div>
        <div class="blue-box" style="background-color: cornflowerblue"></div>
        <div class="yellow-box" style="background-color: yellowgreen"></div>
        <div class="red-box" style="background-color: hotpink"></div>
      </div>
      <h1>~~欢迎回来~~</h1>
    </div>
</template>

<script>
    export default {
        name: "Welcome"
    }
</script>

<style lang="scss" scoped>
  .welcome{
    text-align: center;
    font-size: 50px;
  }
  .boxes{
    transform:rotate(45deg);
    margin: 100px auto;
    width: 240px;
    height: 240px;
    .green-box{
      width: 120px;
      height: 120px;
      float: right;
      animation: flush 4s ease 1s infinite alternate;
    }
    .blue-box{
      width:120px;
      height: 120px;
      float: left;
      animation: flush 4s ease 0s infinite alternate;
    }
    .yellow-box{
      width:120px;
      height: 120px;
      float: right;
      animation: flush 4s ease 2s infinite alternate;
    }
    .red-box{
      width:120px;
      height: 120px;
      float: left;
      animation: flush 4s ease 3s infinite alternate;
    }
  }

  @keyframes flush
  {
    from {opacity: 0;}
    to {opacity: 1;}
  }

</style>
