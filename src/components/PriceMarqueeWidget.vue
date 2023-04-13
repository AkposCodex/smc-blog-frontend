<template>
  <div class="flex items-center overflow-hidden min-h-[65px]">
    <div class="bg-transparent flex-col-reverse md:flex-row">
      <div
        class="w-full md:w-[calc(100%-141px)] overflow-hidden whitespace-nowrap flex"
      >
        <div
          class="flex flex-row justify-between animate-marquee-scroll hover:animate-pause text-xs"
        >
          <!-- TODO: Show loading skeleton while waiting -->
          <!-- TODO: Fix typography -->
          <template v-if="coinData.length > 0">
            <WidgetCard v-for="coin in coinData" :key="coin.id" :coin="coin" />
            <WidgetCard v-for="coin in coinData" :key="coin.id" :coin="coin" />
          </template>
          <template v-else>
            <WidgetCardSkeleton v-for="i in 10" :key="i" />
          </template>
          <WidgetCard v-for="coin in coinData" :key="coin.id" :coin="coin" />
        </div>
      </div>
      <!-- <div class="self-end md:self-auto">
        <p>
          powered by
          <a class="font-semibold" href="https://coinmarketcap.com/"
            >CoinMarketCap</a
          >
        </p>
      </div> -->
    </div>
  </div>
</template>
<script>
import { getAPI } from "../axios";
import WidgetCard from "./WidgetCard.vue";
import WidgetCardSkeleton from "./WidgetCardSkeleton.vue";

export default {
  name: "PriceMarqueeWidget",
  components: {
    WidgetCard,
    WidgetCardSkeleton,
  },
  data() {
    return {
      coinData: [],
    };
  },
  mounted() {
    getAPI
      .get("/coins")
      .then((res) => {
        console.log(res.data);
        getAPI
          .get(`/api/cmc/quotes?id=${res.data.coin_ids.toString()}`)
          .then((res) => {
            console.log(res.data);
            this.coinData = Object.values(res.data.data);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
