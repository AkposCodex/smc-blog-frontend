<template>
  <aside class="dark:text-white px-4 overflow-auto w-full">
    <div v-if="[STATES.ERROR, STATES.STALE_IF_ERROR].includes(state)">
      Error Fetching Tokens: {{ error }}
    </div>
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
        @change="handleSearch"
        class="outline-none bg-transparent w-full text-black"
      />
    </div>
    <div class="grid gap-5" v-if="coinMap.length > 0">
      <div
        class="flex justify-between items-center"
        v-for="coin in coinMap"
        :key="coin.id"
      >
        <div class="flex items-center gap-2">
          <figure
            class="border border-[#2D2D2D99] rounded-full p-2 w-10 h-10 dark:border-zinc-700"
          >
            <img
              :src="`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`"
              :alt="`${coin.slug} logo`"
              class="w-full h-full object-cover rounded-full"
            />
          </figure>
          <div>
            <p class="font-bold">{{ coin.name }}</p>
            <p class="text-[#2A2B2E] text-sm opacity-80 dark:text-zinc-400">
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
      <button class="w-fit m-auto" @click="loadMore">Load More</button>
    </div>
    <div class="flex flex-col items-center justify-center h-full" v-else>
      <p class="mt-4 text-sm text-gray-500">Loading...</p>
    </div>
  </aside>
</template>

<script setup>
import BaseIcon from "@/components/BaseIcon.vue";
import { getAPI } from "../axios";
import { ref, watch, toRaw } from "vue";
import useSWRV from "swrv";
import useSwrvState from "@/composables/useSwrvState";

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
  getAPI.delete(`/coins/${id}`).catch((err) => {
    console.log(err);
  });
};
const addCoin = (id) => {
  getAPI
    .post("/coins", {
      coin_ids: [id],
    })
    .catch((err) => {
      console.log(err);
    });
};
const currentCoins = ref([]);
const coinMap = ref([]);
let start = ref(1);
let limit = ref(100);
const fetcher = (url) => getAPI.get(url).then((res) => res.data);
const {
  data: mapData,
  error: mapError,
  mutate: mutateMapData,
} = useSWRV(`/api/cmc/map?start=${start.value}&limit=${limit.value}`, fetcher, {
  revalidateOnFocus: false,
});
const sortByAdded = (a, b) => {
  console.log(
    currentCoins.value.includes(a.id),
    currentCoins.value.includes(b.id)
  );
  if (currentCoins.value.includes(a.id)) {
    return -1;
  }
  if (currentCoins.value.includes(b.id)) {
    return 1;
  }
  return 0;
};
watch([mapData, mapError], ([newMapData, newMapError]) => {
  if (newMapData) {
    if (coinMap.value.length > 0) {
      const mergedResult = [
        ...coinMap.value,
        ...Object.values(newMapData.data),
      ];
      coinMap.value = mergedResult.sort(sortByAdded);
    } else {
      coinMap.value = Object.values(newMapData.data).sort(sortByAdded);
    }
  }
  if (newMapError) {
    console.log(newMapError);
  }
});

const { data: coinData, error: coinError } = useSWRV("/coins", fetcher, {
  revalidateOnFocus: false,
});
watch([coinData, coinError], ([newCoinData, newCoinError]) => {
  if (newCoinData) {
    console.log(newCoinData);
    currentCoins.value = newCoinData.coin_ids;
  }
  if (newCoinError) {
    console.log(newCoinError);
  }
});

const cached_coins = ref([]);

const { data, error, isValidating } = useSWRV(
  "https://s3.coinmarketcap.com/generated/core/crypto/cryptos.json"
);
watch(data, (val) => {
  cached_coins.value = val.values;
});
const { state, STATES } = useSwrvState(data, error, isValidating);

const handleSearch = (e) => {
  const term = e.target.value;
  if (term.length > 0) {
    const results = searchToken(term);
    coinMap.value = results;
  } else {
    mutateMapData();
  }
};

const searchToken = (term) => {
  const filteredCoins = toRaw(cached_coins.value).filter((coin) => {
    return (
      coin[1].toLowerCase().includes(term.toLowerCase()) ||
      coin[2].toLowerCase().includes(term.toLowerCase())
    );
  });
  const coinMap = filteredCoins.map((coin) => {
    return {
      id: coin[0],
      name: coin[1],
      symbol: coin[2],
      slug: coin[3],
    };
  });
  return coinMap;
};

const loadMore = () => {
  limit.value = coinMap.value.length + 100;
  start.value = coinMap.value.length + 1;
  mutateMapData(() =>
    fetcher(`/api/cmc/map?start=${start.value}&limit=${limit.value}`)
  );
};

const isCoinAdded = (id) => {
  return currentCoins.value.includes(id);
};
</script>

<style scoped></style>
