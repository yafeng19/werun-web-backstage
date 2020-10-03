<template>
  <div class="table-warp">
    <div class="header">
      <h3>团队成员</h3>
    </div>

    <el-button
      type="primary"
      icon="el-icon-circle-plus-outline"
      size="medium"
      class="add_button"
      @click="add_member"
      >添加成员</el-button
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

        <el-table-column prop="name" label="成员姓名"></el-table-column>
        <el-table-column prop="grade" label="成员年级"></el-table-column>
        <el-table-column prop="picUrl" label="照片地址"></el-table-column>
        <el-table-column prop="major" label="专业"></el-table-column>
        <el-table-column prop="position" label="职务/方向"></el-table-column>
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
    <editMember
      v-show="editVisible"
      :type="type"
      :form="edit_form"
      @closeDialog="this.closeDialog"
    />
  </div>
</template>

<script>
import { getList, deleteMember, addMember } from "@/api/memberList.js";
import editMember from "./edit.vue";
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
          name: "姓名1",
          grade: "年级1",
          picUrl: "照片1",
          major: "专业1",
          position: "方向1",
        },
        {
          name: "姓名2",
          grade: "年级2",
          picUrl: "照片2",
          major: "专业2",
          position: "方向2",
        },
      ],
    };
  },
  components: { pageBar, editMember },
  mounted() {
    getList().then((res) => {
      this.message = res.data.message;
      this.success = res.data.success;

      this.name = res.data.data.name;
      this.grade = res.data.data.grade;
      this.picUrl = res.data.data.picUrl;
      this.major = res.data.data.major;
      this.position = res.data.data.position;
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
    add_member() {
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
        url: "/werun/member/pageMember",
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
      deleteMember(row.id).then((res) => {
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
