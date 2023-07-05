<template>
  <Layout>
    <Tabs :dataSource="typeList" :value.sync="type" classPrefix="type" />
    <Tabs
      :dataSource="intervalList"
      :value.sync="interval"
      classPrefix="interval"
    />
    <ol>
      <li v-for="(group, key) in result" :key="key">
        <h3 class="key">
          <span>{{ beautify(key) }}</span>
          <span>{{ type }}￥{{ recordSum(group) }}</span>
        </h3>
        <ol>
          <li
            v-for="item in group"
            :key="item.id"
            class="record"
            :class="{ ['removeRecord']: showModal === item.id }"
            @click="open(item.id, $event)"
          >
            <span>{{ item.selectedtag }}</span>
            <span class="form">{{ item.form }}</span>
            <span>{{ type }}￥{{ item.amount }}</span>
            <!-- 弹窗 -->
            <div class="modal" v-if="showModal === item.id">
              <p>你确定要删除这条记账吗?</p>
              <div class="buttons">
                <button @click="remove(item.id)">确定</button>
                <button @click="close($event)">取消</button>
              </div>
            </div>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">
import Tabs from "@/components/Tabs.vue";
import typeList from "@/constants/typeList";
import intervalList from "@/constants/intervalList";
import { Component, Vue } from "vue-property-decorator";
import dayjs from "dayjs";
import Decimal from "decimal.js";

@Component({
  components: {
    Tabs,
  },
})
export default class StatisticsView extends Vue {
  type = "-";
  interval = "day";
  typeList = typeList;
  intervalList = intervalList;
  showModal = "";
  get recordList() {
    return this.$store.state.recordList as RecordItem[];
  }
  get result() {
    let string = "";
    const { recordList, type, interval } = this;
    const hashTable: { [key: string]: RecordItem[] } = {};
    recordList.sort((r1, r2) => {
      return dayjs(r2.createdAt).valueOf() - dayjs(r1.createdAt).valueOf();
    });
    const newList = recordList.filter((r) => r.value === type);
    if (interval === "day") {
      string = "YYYY年M月D日";
    } else if (interval === "month") {
      string = "YYYY年M月";
    } else if (interval === "year") {
      string = "YYYY年";
    }
    for (let r of newList) {
      const date = dayjs(r.createdAt).format(string);
      hashTable[date] = hashTable[date] || [];
      hashTable[date].push(r);
    }
    return hashTable;
  }
  created() {
    this.$store.commit("fetchRecords");
  }
  beautify(date: string | number) {
    date = date.toString();
    const now = dayjs();
    let nowDate = "";
    if (this.interval === "day") {
      nowDate = now.format("YYYY年M月D日");
      if (nowDate === date) {
        return "今天";
      } else if (nowDate.substring(0, 4) === date.substring(0, 4)) {
        return date.substring(5);
      } else {
        return date;
      }
    } else if (this.interval === "month") {
      nowDate = now.format("YYYY年M月");
      if (nowDate === date) {
        return "本月";
      } else if (nowDate.substring(0, 4) === date.substring(0, 4)) {
        return date.substring(5);
      } else {
        return date;
      }
    } else if (this.interval === "year") {
      nowDate = now.format("YYYY年");
      if (nowDate === date) {
        return "今年";
      } else {
        return date;
      }
    }
  }
  recordSum(group: RecordItem[]) {
    let sum = new Decimal(0);
    for (let r of group) {
      sum = sum.add(new Decimal(r.amount));
    }
    return sum.toNumber();
  }
  open(id: string, e: Event) {
    const modal = document.querySelector(".modal");
    if (!modal) {
      this.showModal = id;
    }
  }
  close(e: Event) {
    this.showModal = "";
    e.stopPropagation(); //阻止事件向外传播
  }
  remove(id: string) {
    this.$store.commit("removeRecord", id);
    this.showModal = "";
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";
::v-deep .interval-tabs-item {
  font-size: 20px;
  padding: 14px 0 4px 0;
  &.selected {
    background: none;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: #333;
    }
  }
}
%item {
  padding: 0 16px;
  min-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.key,
.record {
  @extend %item;
}
.form {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
  font-size: 12px;
}
h3 {
  background: #ebebeb;
  @extend %item;
}
.removeRecord {
  background: #ffaa44;
}
.modal {
  @extend %outerShadow;
  border-radius: 6px;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  width: 80%;
  height: 150px;
  font-size: 22px;
  font-weight: bolder;
  > p {
    height: 50%;
  }
  > .buttons {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    > button {
      padding: 5px 10px;
    }
  }
}
</style>