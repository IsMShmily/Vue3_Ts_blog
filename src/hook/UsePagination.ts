/*
 * @Author: shmily_yy
 * @Date: 2024-04-27 02:24:49
 * @LastEditors: shmily_yy ml13846598527@gmail.com
 * @LastEditTime: 2024-04-27 02:26:04
 * @FilePath: /blogs/src/hook/UsePagination.ts
 * @Description: hook 封装分页
 * @returns handleSizeChange
 * @returns handleCurrentChange
 * @returns pageNum -当前页
 * @returns pageSize -每页展示条数
 * @returns totalNum -总页数
 * 
 */
import { ref } from "vue";
const pageNum = ref(1);
const pageSize = ref(10);
const totalNum = ref(0);
/**
 * @description: 获取列表数据函数
 * @param {function} getListInfo_fn
 * @return {*}
 */
const UsePagination = (getListInfo_fn: () => void) => {
  pageNum.value = 1;
  pageSize.value = 10;
  totalNum.value = 0;
  /**
   * 翻页时触发
   * page-size 改变时触发
   * @param val
   */
  const handleSizeChange = (val: number) => {
    pageNum.value = 1;
    pageSize.value = val;
    getListInfo_fn();
  };
  /**
   * 切换每页展示条数触发
   * current-page 改变时触发
   * @param val
   */
  const handleCurrentChange = (val: number) => {
    pageNum.value = val;
    getListInfo_fn();
  };

  return { handleSizeChange, handleCurrentChange, pageNum, pageSize, totalNum };
};

export default UsePagination;
