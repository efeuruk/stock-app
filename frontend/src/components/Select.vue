<template>
  <div class="form-group">
    <label v-if="label">{{ label }}</label>
    <select @change="onChange($event.target.value)" class="custom-select">
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "Select",
  props: {
    label: String,
    options: Array,
  },
  methods: {
    onChange(value) {
      this.$emit("onChange", value);
    },
  },
};
</script>
