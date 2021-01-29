<template>
  <div class="alert alert-dismissible" :class="type">
    {{ text }}
    <button class="close" @click="onClose">
      <span>&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    text: String,
    type: String,
    show: Boolean,
  },
  methods: {
    onClose() {
      this.$emit("close");
    },
  },
  computed: {
    addClassToRoot() {
      return [{ "fade show": this.show }];
    },
  },
};
</script>
