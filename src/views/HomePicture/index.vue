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
      @click="add_rotationChart"
      >添加轮播图</el-button
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

        <el-table-column prop="name" label="轮播图名称"></el-table-column>
        <el-table-column prop="picUrl" label="地址"></el-table-column>
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
    <editRotationChart
      v-show="editVisible"
      :type="type"
      :form="edit_form"
      @closeDialog="this.closeDialog"
    />
  </div>
</template>

<script>
import {
  getList,
  deleteRotationChart,
  addRotationChart,
} from "@/api/rotationChartList.js";
import editRotationChart from "./edit.vue";
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
      totalElement: 100,
      tableData: [
        {
          name: "名称1",
          picUrl: "url1",
        },
        {
          name: "名称2",
          picUrl: "url2",
        },
        {
          name: "名称3",
          picUrl: "url3",
        },
        {
          name: "名称4",
          picUrl: "url4",
        },
      ],
    };
  },
  components: { pageBar, editRotationChart },
  mounted() {
    getList().then((res) => {
      this.message = res.data.message;
      this.success = res.data.success;

      this.name = res.data.data.name;
      this.picUrl = res.data.data.picUrl;
      console.log(res);
      /*
      this.tableData = res.data.data.list;
      this.totalElement = res.data.data.size;
      */
    });
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
  methods: {
    add_rotationChart() {
      this.editVisible = true; //弹出窗口
      this.type = "添加";
    },

    closeDialog(val) {
      getList().then((res) => {
        console.log(res);
        this.message = res.data.message;
        this.success = res.data.success;
        this.tableData = res.data.data;
        //this.totalElement = res.data.data.total;
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

        //this.totalElement = res.data.data.size;
      });
    },

    changeCurrentPage() {
      this.$axios({
        url: "/werun/rotationChart/pageRotationChart",
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
      deleteRotationChart(row.id).then((res) => {
        console.log(res);
        this.$message(res.data.message);
      });
      getList().then((res) => {
        console.log(res);
        this.message = res.data.message;
        this.success = res.data.success;
        this.tableData = res.data.data;
        //this.totalElement = res.data.data.size;
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
