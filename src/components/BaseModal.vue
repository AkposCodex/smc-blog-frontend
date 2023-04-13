<template>
  <Teleport to="body">
    <Transition
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      enter-active-class="transition ease-out duration-300"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        @click.self="close"
        v-if="show"
        class="fixed inset-0 w-full h-screen gap-3 z-50 flex justify-center items-center flex-col bg-black/50"
      >
        <div
          class="relative flex flex-col items-center p-5 bg-white w-[80vw] max-w-lg rounded-lg shadow-lg max-h-[80vh] overflow-auto"
        >
          <slot />
        </div>
        <div
          v-show="closable"
          @click.prevent="close"
          class="p-2 flex items-center justify-center rounded-full bg-white shadow-lg cursor-pointer hover:bg-slate-300"
        >
          <BaseIcon name="close" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import BaseIcon from "./BaseIcon.vue";

const props = defineProps({
  closable: {
    type: Boolean,
    default: true,
  },
  show: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits({
  close: () => true,
});
const close = () => {
  if (props.closable) {
    emit("close");
  }
};
</script>

<style scoped>
.modal-close svg {
  width: 20px;
  height: 20px;
}
</style>
