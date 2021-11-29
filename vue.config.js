module.exports = {
    css: {
      loaderOptions: {
        less: {
            modifyVars: {
              hack: `true; @import "@/assets/style.css";`,
            },
        },
      },
    },
  };