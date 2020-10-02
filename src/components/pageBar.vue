<template>
    <div class="block">
    
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5,10]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalnum"
      style="width:50vw;">
    </el-pagination>
  </div>
</template>
<script>
export default {
     methods: {
      handleSizeChange(val) {
        this.$emit('changeSize',val)
      },
      handleCurrentChange(val) {
        this.$emit('changePage',val);
      }
    },
    data() {
      return {
        currentPage: 1
      };
    },
    props:['totalnum']
}
</script>

<style scoped>
.block{
    width:50vw;
    margin-top:3px;margin-left:50px;
}
</style>