<template>
  <div class="table-warp">
    <div class="header">
      <h3>首页大图</h3>
    </div>
    <el-button
      type="primary"
      icon="el-icon-circle-plus-outline"
      size="medium"
      class="add_button"
      @click="add_picture"
      >添加图片</el-button
    >
    <div class="search">
      <el-input
        size="medium"
        suffix-icon="el-icon-search"
        placeholder=""
        style="width: 180px; float: right; margin-right: 45px"
        v-model="keyword"
      />
    </div>

    <div>
      <el-table
        :data="tableData"
        border
        size="mini"
        style="
          width: 90%;
          background-color: rgb(240, 241, 244);
          margin-top: 8vh;
          margin-left: 60px;
          background-color: white;
        "
      >
        <!-- @selection-change="handleSelectionChange" -->

        <el-table-column prop="picName" label="图片名称"></el-table-column>
        <el-table-column prop="picUrl" label="图片url"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="handleEdit(scope.$index, scope.row)"
              type="text"
              size="small"
              >编辑</el-button
            >
            <el-button
              @click="deleteData(scope.$index, scope.row)"
              type="text"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <pageBar
        style="margin-top: 25px; margin-left: 250px"
        :totalnum="totalNum"
        @changeSize="changeSize"
        @changePage="changeCurrentPage"
      />
    </div>

    <editManager
      v-show="editVisible"
      :type="type"
      :form="edit_form"
      @closeDialog="this.closeDialog"
    />
  </div>
</template>

<script>
import pageBar from "@/components/pageBar.vue";

import "@/styles/page.css";
export default {
  data() {
    return {
      keyword: "",
      edit_form: {},
      editVisible: false,
      pageSize: 5,
      currentPage: 1,
      tableData: [],
      currentPage: 1,
      totalNum: 100,
      tableData: [
        {
          picName: "图片1",
          picUrl: "url1",
        },
        {
          picName: "图片2",
          picUrl: "url2",
        },
        {
          picName: "图片3",
          picUrl: "url3",
        },
      ],
    };
  },
  components: { pageBar },
  mounted() {
    getList(this.currentPage, this.pageSize, this.keyword).then((res) => {
      console.log(res);
      this.tableData = res.data.data.list;
      this.totalNum = res.data.data.size;
    });
  },
  watch: {
    keyword() {
      getList(this.currentPage, this.pageSize, this.keyword).then((res) => {
        console.log(res);
        this.tableData = res.data.data.list;
        this.totalNum = res.data.data.size;
      });
    },
  },
  methods: {
    add_picture() {
      this.editVisible = true; //弹出窗口
      this.type = "添加";
    },
    closeDialog(val) {
      getList(this.currentPage, this.pageSize, this.keyword).then((res) => {
        console.log(res);
        this.tableData = res.data.data.list;
        this.totalNum = res.data.data.total;
      });
      this.edit_form = {};
      this.editVisible = val;
    },
    handleEdit(index, row) {
      this.edit_form = row;
      console.log(this.edit_form);
      this.editVisible = true;
      this.type = "编辑";
    },
    changeSize(val) {
      this.pageSize = val;
      getList(this.currentPage, this.pageSize, this.keyword).then((res) => {
        console.log(res);
        this.tableData = res.data.data.list;
        this.totalNum = res.data.data.size;
      });
    },
    changeCurrentPage(val) {
      this.currentPage = val;
      getList(this.currentPage, this.pageSize, this.keyword).then((res) => {
        console.log(res);
        this.tableData = res.data.data.list;
        this.totalNum = res.data.data.size;
      });
    },
    deleteData(index, row) {
      deleteManager(row.id).then((res) => {
        console.log(res);
        this.$message(res.data.message);
      });
      getList(this.currentPage, this.pageSize, this.keyword).then((res) => {
        console.log(res);
        this.tableData = res.data.data.list;
        this.totalNum = res.data.data.size;
      });
    },
  },
};
</script>
<style scoped>
.add_button {
  position: absolute;
  margin-left: calc(0.9 * calc(100vw - 320px) + 60px - 320px);
  size: mini;
  width: 130px;
}
.search {
  position: absolute;
  margin-left: calc(0.9 * calc(100vw - 320px) + 60px - 180px);
  size: mini;
}
</style>
