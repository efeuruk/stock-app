<template>
  <div class="form-group">
    <label v-if="label" :for="id" class="form-label">{{ label }}</label>
    <input
      :type="type"
      class="form-control"
      :class="addClass"
      :value="value"
      :step="step"
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
    step: String,
    value: [String, Number],
    placeholder: String,
    errorText: String,
    isError: Boolean,
  },
  methods: {
    onInput(value) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.$emit("input", value);
      }, 200);
    },
  },
  computed: {
    addClass() {
      return [{ "is-invalid": this.isError }];
    },
  },
};
</script>
