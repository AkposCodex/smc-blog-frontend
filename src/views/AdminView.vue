<template>
  <ToastError v-if="hasError" :code="errorCode"></ToastError>
  <AdminNavbar @toggle-menu="toggleMenu" />
  <div class="lg:grid grid-cols-[1fr_3fr] font-baseFamily h-[100vh]">
    <AdminSidebar
      @open-price-index="showPriceIndexModal = true"
      :menu-open="isMenuOpen"
    />
    <div class="w-full overflow-auto">
      <RouterView @has-error="showToast" />
      <PriceIndexModal
        :show="showPriceIndexModal"
        @close="showPriceIndexModal = false"
      />
    </div>
  </div>
</template>
<script>
import { getAPI } from "../axios";
import { mapGetters } from "vuex";
import { useToast } from "vue-toastification";
import ToastError from "../services/error.vue";
import PriceIndexModal from "../components/PriceIndexModal.vue";
import AdminSidebar from "../components/AdminSidebar.vue";
import AdminNavbar from "../components/AdminNavbar.vue";

export default {
  setup() {
    const toast = useToast();

    return { toast };
  },
  emits: ["openPriceIndex", "hasError"],
  components: {
    ToastError,
    PriceIndexModal,
    AdminSidebar,
    AdminNavbar,
  },
  data() {
    return {
      showPriceIndexModal: false,
      errorCode: "",
      hasError: false,
      isMenuOpen: false,
    };
  },
  computed: mapGetters({
    user: "getUserState",
  }),
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    showToast(isError, errorCode) {
      this.errorCode = errorCode ?? "";
      this.hasError = isError;
    },
  },
  async created() {
    await getAPI.get(`/users?email=${this.user.email}`).then((response) => {
      this.$store.dispatch("userModule/updateUser", response.data[0]);
    });
  },
};
</script>
<style>
.ck-editor__editable {
  height: auto;
  min-height: 12rem;
}

.toggler-wrapper {
  display: block;
  width: 45px;
  height: 25px;
  cursor: pointer;
  position: relative;
}

.toggler-wrapper input[type="checkbox"] {
  display: none;
}

.toggler-wrapper input[type="checkbox"]:checked + .toggler-slider {
  background-color: #44cc66;
}

.toggler-wrapper .toggler-slider {
  background-color: #ccc;
  position: absolute;
  border-radius: 100px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-transition: all 300ms ease;
  transition: all 300ms ease;
}

.toggler-wrapper .toggler-knob {
  position: absolute;
  -webkit-transition: all 300ms ease;
  transition: all 300ms ease;
}
.toggler-wrapper.style-3
  input[type="checkbox"]:checked
  + .toggler-slider
  .toggler-knob {
  left: calc(100% - 19px - 3px);
}

.toggler-wrapper.style-3 .toggler-knob {
  width: calc(25px + 6px);
  height: calc(25px + 6px);
  border-radius: 50%;
  left: -3px;
  top: -3px;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 6px rgba(153, 153, 153, 0.75);
  box-shadow: 0 2px 6px rgba(153, 153, 153, 0.75);
}
</style>
