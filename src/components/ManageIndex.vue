<template>
  <aside class="px-4 overflow-auto w-full">
    <div class="border-b p-3 border-b-gray-300 flex items-center gap-4">
      <button @click="$emit('change-tab')">
        <BaseIcon name="arrow-right" class="rotate-180 mx-0" />
      </button>
      <h3 class="font-bold text-center text-xl">Manage Index</h3>
    </div>
    <div
      class="bg-[#F4F4F4] rounded-[10px] flex items-center gap-2 p-3 mt-3 mb-5"
    >
      <BaseIcon name="feather-search" />
      <input
        type="text"
        placeholder="Search..."
        class="outline-none bg-transparent w-full"
      />
    </div>
    <div class="grid gap-5" v-if="coinMap.length > 0">
      <div
        class="flex justify-between items-center"
        v-for="coin in coinMap"
        :key="coin.id"
      >
        <div class="flex items-center gap-2">
          <figure class="border border-[#2D2D2D99] rounded-full p-2 w-10 h-10">
            <img
              :src="`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`"
              :alt="`${coin.slug} logo`"
              class="w-full h-full object-cover rounded-full"
            />
          </figure>
          <div>
            <p class="font-bold">{{ coin.name }}</p>
            <p class="text-[#2A2B2E] text-sm opacity-80">
              1.00 {{ coin.symbol }}
            </p>
          </div>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            @change="updateIndex"
            type="checkbox"
            :value="coin.id"
            :checked="isCoinAdded(coin.id)"
            class="sr-only peer"
          />
          <div
            class="w-9 h-5 border-2 border-black bg-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-4 peer-checked:after:border-white peer-checked:after:bg-white after:content-[''] after:absolute after:top-1/3 after:left-[5px] after:bg-black after:rounded-full after:h-2 after:w-2 after:transition-all peer-checked:bg-zinc-500"
          ></div>
        </label>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center h-full" v-else>
      <!-- <BaseIcon name="loading" class="w-12 h-12" /> -->
      <p class="mt-4 text-sm text-gray-500">Loading...</p>
    </div>
  </aside>
</template>

<script setup>
import BaseIcon from "@/components/BaseIcon.vue";
import { getAPI } from "../axios";
import { ref } from "vue";
// import { useStore } from "vuex";

// const store = useStore();

// const coinMap = computed(() => store.getters["coin/coinMap"]);

const emit = defineEmits(["change-tab", "index-updated"]);
const updateIndex = (e) => {
  if (e.target.checked) {
    addCoin(e.target.value);
  } else {
    removeCoin(e.target.value);
  }
  emit("index-updated");
};

const removeCoin = (id) => {
  getAPI
    .delete(`/coins/${id}`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
const addCoin = (id) => {
  getAPI
    .post("/coins", {
      coin_ids: [id],
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
const currentCoins = ref([]);
const coinMap = ref([]);
getAPI
  .get("/api/cmc/map?limit=100")
  .then((res) => {
    console.log(res.data);
    coinMap.value = Object.values(res.data.data);
  })
  .catch((err) => {
    console.log(err);
  });

getAPI
  .get("/coins")
  .then((res) => {
    console.log(res.data);
    currentCoins.value = res.data.coin_ids;
  })
  .catch((err) => {
    console.log(err);
  });

const isCoinAdded = (id) => {
  return currentCoins.value.includes(id);
};
</script>

<style scoped></style>
