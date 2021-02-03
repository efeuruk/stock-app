<template>
  <div class="form-group">
    <label v-if="label" :for="id" class="form-label">{{ label }}</label>
    <input
      :type="type"
      class="form-control"
      :class="addClass"
      :value="value"
      :id="id"
      :placeholder="placeholder"
      @input="onInput($event.target.value)"
    />
    <div class="invalid-feedback">{{ errorText }}</div>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    id: String,
    type: String,
    label: String,
    value: [String, Number],
    placeholder: String,
    errorText: String,
    isError: Boolean,
  },
  methods: {
    onInput(value) {
      this.$emit("input", value);
    },
  },
  computed: {
    addClass() {
      return [{ "is-invalid": this.isError }];
    },
  },
};
</script>
