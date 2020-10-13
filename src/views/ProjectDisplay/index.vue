<template>
  <div class="table-warp">
    <div class="header">
      <h3>项目展示</h3>
    </div>

    <el-button
      type="primary"
      icon="el-icon-circle-plus-outline"
      size="medium"
      class="add_button"
      @click="add_project"
      >添加项目</el-button
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

        <el-table-column prop="title" label="项目名称"></el-table-column>
        <el-table-column prop="context" label="项目介绍"></el-table-column>
        <el-table-column prop="picUrl" label="项目照片"></el-table-column>
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
    <editProject
      v-show="editVisible"
      :type="type"
      :form="edit_form"
      @closeDialog="this.closeDialog"
    />
  </div>
</template>

<script>
import { getList, deleteProject, addProject } from "@/api/projectList.js";
import editProject from "./edit.vue";
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
      tableData: {
        title: "",
        context: "",
        picUrl: "",
      },
      currentPage: 1,
      totalElement: 100,
      /*
      tableData: [
        {
          title: "项目1",
          context: "介绍1",
          picUrl: "url1",
        },
        {
          title: "项目2",
          context: "介绍2",
          picUrl: "url2",
        },
        {
          title: "项目3",
          context: "介绍3",
          picUrl: "url3",
        },
      ],
      */
    };
  },
  components: { pageBar, editProject },
  created() {
    this.getList();
  },

  methods: {
    getList() {
      this.$axios({
        url: "/project/listProject",
        method: "GET",
        params: {},
      }).then((res) => {
        this.tableData = res.data.data;
        /*
        this.title = res.data.data.title;
        this.picUrl = res.data.data.picUrl;
        this.newsDate = res.data.data.newsDate;
        */
        console.log(res);
      });
    },

    add_project() {
      this.editVisible = true; //弹出窗口
      this.type = "添加";
    },

    closeDialog(val) {
      getList().then((res) => {
        console.log(res);
        this.tableData = res.data.data;
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
      getList().then((res) => {
        console.log(res);
        this.message = res.data.message;
        this.success = res.data.success;
        this.tableData = res.data.data;
      });
    },

    changeCurrentPage() {
      this.$axios({
        url: "/project/pageProject",
        method: "GET",
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        this.message = res.data.message;
        this.success = res.data.success;

        this.tableData = res.data.data;
        /*
        this.title = res.data.data.title;
      this.picUrl = res.data.data.picUrl;
      this.newsDate = res.data.data.newsDate;
      */
        this.totalPages = res.data.totalPages;
        this.currentPage = res.data.currentPage;
        this.totalElement = res.data.totalElement;
        this.isMoreRecord = res.data.isMoreRecord;
        this.$message(res.data.message);
        console.log(res);
        //this.totalElement = res.data.data.size;
      });
    },

    deleteData(index, row) {
      this.$confirm("确认删除？")
        .then((res) => {
          this.deleteProject(row.id);
          this.getList();
        })
        .catch(() => {
          return;
        });
    },

    deleteProject(itemId) {
      this.$axios({
        url: "/project/deleteProject",
        method: "DELETE",
        params: { id: itemId },
      }).then((res) => {
        console.log(res);
        this.$message(res.data.message);
      });
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
