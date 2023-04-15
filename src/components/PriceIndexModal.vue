<template>
  <BaseModal>
    <header class="pb-4 capitalize overflow-x-clip w-full">
      <div class="h-max" id="stats">
        <PriceMarqueeWidget :key="marqueeKey" />
      </div>
    </header>
    <AddIndex v-show="currentTab === 1" @change-tab="setTab(2)" />
    <ManageIndex
      v-show="currentTab === 2"
      @change-tab="setTab(1)"
      @index-updated="refreshMarquee"
    />
  </BaseModal>
</template>

<script setup>
import ManageIndex from "./ManageIndex.vue";
import AddIndex from "./AddIndex.vue";
import PriceMarqueeWidget from "./PriceMarqueeWidget.vue";
import BaseModal from "./BaseModal.vue";
import { ref } from "vue";

defineEmits(["change-tab"]);

const marqueeKey = ref(0);

const currentTab = ref(1);

const setTab = (tab) => {
  currentTab.value = tab;
};

const refreshMarquee = () => {
  marqueeKey.value = marqueeKey.value + 1;
};
</script>

<style scoped></style>
