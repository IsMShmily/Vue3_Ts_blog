<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { io } from "socket.io-client";
import useUserStore from "@/store/modules/user";

const userStore = useUserStore();
const socket =
  import.meta.env.VITE_USER_NODE_ENV == "dev"
    ? io("http://localhost:8000")
    : io("https://www.shmilyyy.cn", {
        path: '/socket.io',
        withCredentials: true,
        transports: ["websocket"],
      });


/** @module 消息相关 */
interface itemProps {
  id: number;
  avatar: string;
  userName: string;
  time: string;
  content: string;
  market: number; //1-自己 2-别人
}

interface UserList {
  id: number;
  avatar: string;
  userName: string;
}

/** @module 发送消息 */
const iptvalRules = [(v: string | number) => !!v || "消息不能为空"];
const list = ref<itemProps[]>([]);
const iptVal = ref("");
const iptRef = ref();
const sendMsg = async () => {
  const valid = await iptRef.value.validate();
  if (valid.length) return;
  const msg = {
    id: userStore.userInfo.id,
    avatar: userStore.userInfo.avatar,
    userName: userStore.userInfo.userName,
    time: new Date().toLocaleString(),
    content: iptVal.value,
    market: 2,
  };
  iptRef.value.reset();
  socket.emit("sendMsg", msg);
  setTimeout(() => {
    scrollToBottom();
  }, 50);
};

/** @module 在线用户 */
const onlineUsers = ref<UserList[]>([]);

// 滚动到底部
const scrollToBottom = () => {
  const container = document.querySelector(".overflow-auto");
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
};

onMounted(() => {
  // 发送消息通知服务端 上线
  socket.emit("online", {
    id: userStore.userInfo.id,
    avatar: userStore.userInfo.avatar,
    userName: userStore.userInfo.userName,
  });

  // 用户上线：监听上线消息
  socket.on("launched", (data) => {
    console.log("launched---", data);
    if (data.id === userStore.userInfo.id) {
      data.userName = "你";
    }
    list.value.push({
      ...data,
    });
  });

  // 服务器派发消息：其他用户发送消息了
  socket.on("getMsg", (data) => {
    console.log("getMsg---", data);
    if (data.id === userStore.userInfo.id) {
      data.market = 1;
    }
    list.value.push({
      ...data,
    });
    setTimeout(() => {
      scrollToBottom();
    }, 50);
  });

  // 监听在线用户列表更新事件
  socket.on("onlineUsers", (users) => {
    console.log("onlineUsers---", users);
    onlineUsers.value = users;
  });
});

// 离开页面：下线
onBeforeUnmount(() => {
  console.log("页面销毁");
  // 发送用户离线消息
  socket.emit("offline", { id: userStore.userInfo.id });

  // 移除事件监听器
  socket.off("launched");
  socket.off("getMsg");

  // 关闭 WebSocket 连接
  socket.disconnect;
});
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" md="8">
        <v-card style="height: 81vh" class="relative">
          <v-list lines="two" class="overflow-auto h-4/5">
            <v-list-item v-for="item in list" :key="item.id">
              <div
                class="w-full text-center text-xs text-green-600"
                v-show="item.market == 3"
              >
                {{ item.userName }} 加入了聊天室
              </div>
              <div v-show="item.market === 2">
                <div class="flex items-center">
                  <v-avatar :image="item.avatar" class="self-start"></v-avatar>
                  <div class="ml-2">
                    <div>
                      {{ item.userName }}
                      <span class="ml-3 text-gray-400 text-xs">{{
                        item.time
                      }}</span>
                    </div>
                    <div class="mt-1 leading-6">{{ item.content }}</div>
                  </div>
                </div>
              </div>
              <div v-show="item.market === 1">
                <div class="flex items-center flex-row-reverse">
                  <v-avatar :image="item.avatar" class="self-start"></v-avatar>
                  <div class="mr-2">
                    <div>
                      <span class="text-gray-400 text-xs">{{ item.time }}</span>
                    </div>
                    <div class="mt-1 leading-6">{{ item.content }}</div>
                  </div>
                </div>
              </div>
            </v-list-item>
          </v-list>
          <div class="flex items-center px-4 absolute bottom-0 left-0 w-full">
            <v-text-field
              v-model="iptVal"
              ref="iptRef"
              @keyup.enter="sendMsg"
              :rules="iptvalRules"
              ><template v-slot:append>
                <v-btn @click="sendMsg" v-model="iptVal"> 发送 </v-btn>
              </template></v-text-field
            >

            <!-- <v-btn @click="sendMsgOther" v-model="iptVal">别人 发送 </v-btn> -->
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="" title="当前在线用户">
          <v-list>
            <v-list-item v-for="item in onlineUsers" :key="item.id">
              <div class="flex items-center h-12">
                <v-badge color="success" dot>
                  <v-avatar :image="item.avatar"></v-avatar>
                </v-badge>
                <div class="ml-2">{{ item.userName }}</div>
              </div>
            </v-list-item>
          </v-list></v-card
        ></v-col
      >
    </v-row>
  </div>
</template>

<style lang="scss" scoped></style>
