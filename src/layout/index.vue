<template>
  <div>
    
  <LayoutNav/>
  <br/>
  <LayoutHeader/>
  <br/>
  <LayoutMain/>
 
  </div>
</template>

<script>
import LayoutNav from "./Components/Nav";
import LayoutHeader from "./Components/Header";
import LayoutMain from "./Components/main";

export default {
  name: "layout",
  components: { LayoutNav, LayoutHeader,LayoutMain }
};
</script>

<style scoped>
</style>





