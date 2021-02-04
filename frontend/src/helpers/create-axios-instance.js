export default function(self) {
  self.axios.interceptors.request.use(
    config => {
      self.$store.commit("loading", true);
      return config;
    },
    error => {
      self.$store.commit("loading", false);
      return Promise.reject(error);
    }
  );

  self.axios.interceptors.response.use(
    response => {
      self.$store.commit("loading", false);
      return response;
    },
    error => {
      self.$store.commit("loading", false);
      return Promise.reject(error);
    }
  );
}
