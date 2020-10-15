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
      @click="addItem"
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
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="name" label="轮播图名称"></el-table-column>
        <el-table-column prop="picUrl" label="轮播图地址"></el-table-column>
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
        style="margin: 25px auto"
        :totalnum="totalElement"
        :pageSize="pageSize"
        @changeSize="changeSize"
        @changePage="getList"
      />
    </div>
    <edit
      v-show="editVisible"
      :type="type"
      :form="edit_form"
      @closeDialog="this.closeDialog"
      @confirm="this.confirm"
    />
  </div>
</template>
<script>
import edit from "./edit.vue";
import pageBar from "@/components/pageBar.vue";
import "@/styles/page.css";
export default {
  data() {
    return {
      keyword: "",
      editVisible: false,
      pageSize: 5,
      pageNum: 1,
      totalPages: "",
      totalElement: 100,
      currentPage: 1,
      isMoreRecord: "",
      tableData: {
        name: "",
        picUrl: "",
      },
      edit_form: {},
      type: "",
      itemId: "",
    };
  },
  components: { pageBar, edit },
  mounted() {
    this.getList(this.pageNum);
  },
  methods: {
    /*
    getList() {
      this.$axios({
        url: "/rotationChart/listRotationChart",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        this.tableData = res.data.data;
        //console.log(res);
      });
    },
    //changeCurrentPage() 
*/
    getList(val) {
      this.pageNum = val;
      this.$axios({
        url: "/rotationChart/pageRotationChart?pageNum=" + this.pageNum,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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
        //this.$message(res.data.message);
        //console.log(res);
      });
    },

    addItem() {
      this.editVisible = true; //弹出窗口
      this.type = "添加";
    },

    closeDialog(val) {
      this.edit_form = {};
      this.editVisible = val;
    },

    confirm() {
      this.getList(this.pageNum);
      this.closeDialog(false);
    },

    handleEdit(index, row) {
      this.edit_form = row;
      console.log(this.edit_form);
      this.editVisible = true;
      this.type = "编辑";
      this.itemId = row.id;
    },

    changeSize(val) {
      this.pageSize = val;
      this.getList(this.pageNum);
    },

    deleteData(index, row) {
      this.$axios({
        method: "DELETE",
        url: "/rotationChart/deleteRotationChart",
        headers: {
          "Content-Type": "application/json",
        },
        params: { id: row.id },
      }).then((res) => {
        console.log(res);
        this.$message(res.data.message);
      });
      this.getList(this.pageNum);
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
