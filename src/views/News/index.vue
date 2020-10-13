<template>
  <div class="table-warp">
    <div class="header">
      <h3>新闻动态</h3>
    </div>

    <el-button
      type="primary"
      icon="el-icon-circle-plus-outline"
      size="medium"
      class="add_button"
      @click="add_news"
      >添加新闻</el-button
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
          margin-top: 10vh;
          margin-left: 60px;
          background-color: white;
        "
      >
        <!-- @selection-change="handleSelectionChange" -->

        <el-table-column prop="title" label="新闻标题"></el-table-column>
        <el-table-column prop="picUrl" label="照片地址"></el-table-column>
        <el-table-column prop="newsDate" label="新闻时间"></el-table-column>
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
        :totalnum="totalElement"
        @changeSize="changeSize"
        @changePage="changeCurrentPage"
      />
    </div>
    <editNews
      v-show="editVisible"
      :type="type"
      :form="edit_form"
      @closeDialog="this.closeDialog"
      @confirm="this.confirm"
    />
  </div>
</template>

<script>
//import { addNews } from "@/api/newsList.js";
import editNews from "./edit.vue";
import pageBar from "@/components/pageBar.vue";
import "@/styles/page.css";
export default {
  data() {
    return {
      keyword: "",
      editVisible: false,
      pageSize: 5,
      totalPages: "",
      totalElement: 100,
      currentPage: 1,
      isMoreRecord: "",
      tableData: {
        id: "",
        title: "",
        picUrl: "",
        newsDate: "",
        context: "",
        briefIntro: "",
      },
      edit_form: {},
      type: "",
    };
  },
  components: { pageBar, editNews },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$axios({
        url: "/news/listNews",
        method: "GET",
      }).then((res) => {
        this.tableData = res.data.data;
        console.log(res);
      });
    },

    add_news() {
      this.editVisible = true; //弹出窗口
      this.type = "添加";
    },

    closeDialog(val) {
      this.edit_form = {};
      this.editVisible = val;
    },

    confirm() {
      this.getList();
      this.closeDialog(false);
    },

    handleEdit(index, row) {
      this.edit_form = row;
      console.log(this.edit_form);
      this.editVisible = true;
      this.type = "编辑";
    },

    changeSize(val) {
      this.pageSize = val;
      getList().then((res) => {
        console.log(res);
        this.message = res.data.message;
        this.success = res.data.success;
        this.tableData = res.data.data;
      });
    },

    changeCurrentPage() {
      this.$axios({
        url: "/news/pageNews",
        method: "GET",
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        this.tableData = res.data.data;

        this.totalPages = res.data.totalPages;
        this.currentPage = res.data.currentPage;
        this.totalElement = res.data.totalElement;
        this.isMoreRecord = res.data.isMoreRecord;
        this.$message(res.data.message);
        console.log(res);
      });
    },

    deleteData(index, row) {
      this.$axios({
        method: "DELETE",
        url: "/news/deleteNews",
        headers: {
          "Content-Type": "application/json",
        },
        params: { id: row.id },
      }).then((res) => {
        console.log(res);
        this.$message(res.data.message);
      });
      this.getList();
    },
  },

  watch: {
    /*
    keyword() {
      getList().then((res) => {
        console.log(res);
        this.message = res.data.message;
        this.success = res.data.success;
        this.tableData = res.data.data;

        //this.totalElement = res.data.data.size;
      });
    },
    */
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
