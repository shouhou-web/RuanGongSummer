<template>
  <button
    class="l-button"
    @click="handleClick"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
    :style="{'color': color, 'background-color': bgColor, 'border-color': bdColor}"
    :class="[
      type ? 'l-button--' + type : '',
      size ? 'l-button--' + size : '',
      {
        'is-active' : active,
        'is-disabled': disabled,
        'is-loading': loading,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <i class="el-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: "LButton",

  props: {
    type: {
      type: String,
      default: "default",
    },
    size: String,
    icon: {
      type: String,
      default: "",
    },
    nativeType: {
      type: String,
      default: "button",
    },
    color: {
      type: String,
      default: "",
    },
    bgColor: {
      type: String,
      default: "",
    },
    bdColor: {
      type: String,
      default: "",
    },
    active: {
      type: Boolean,
      default: false,
    },
    loading: Boolean,
    disabled: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean,
  },

  methods: {
    handleClick(evt) {
      this.$emit("click", evt);
    },
  },
};
</script>

<style scoped>
.l-button {
  background: #ffffff;
  border: 1px solid #d8e3ec;
  box-sizing: border-box;
  border-radius: 7px;
  color: #60a5dd;
  cursor: pointer;
  display: inline-flex;
  font-weight: 500;
  font-size: 15px;
  line-height: 1;
  margin: 0;
  -moz-user-select: none;
  outline: 0;
  overflow: hidden;
  padding: 12px 20px;
  position: relative;
  text-align: center;
  transition: ease-in-out 0.5s;
  white-space: nowrap;
  -ms-user-select: none;
  -webkit-user-select: none;
}

.l-button + .l-button {
  margin-left: 10px;
}

.l-button:focus,
.l-button:hover {
  color: #25374f;
  border-color: #c6e2ff;
  box-shadow: 2px 3px 5px 1px rgba(29, 120, 223, 0.2);
  transition: 0.5s;
}

.l-button::-moz-focus-inner {
  border: 0;
}

.l-button.is-active {
  color: #25374f;
  border-color: #c6e2ff;
  box-shadow: 2px 3px 5px 1px rgba(29, 120, 223, 0.2);
  transition: 0.5s;
}

.l-button::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: radial-gradient(circle, #9ccbda 10%, transparent 10%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform 0.4s, opacity 1s;
}

.l-button:active::after {
  opacity: 0.3;
  transform: scale(0, 0);
  transition: 0s;
}

.l-button.is-disabled,
.l-button.is-disabled:focus,
.l-button.is-disabled:hover {
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
  box-shadow: none;
  color: #c0c4cc;
  cursor: not-allowed;
}

.l-button.is-disabled.l-button--text {
  background-color: transparent;
}

.l-button.is-loading {
  position: relative;
  pointer-events: none;
}

.l-button.is-loading:before {
  pointer-events: none;
  content: "";
  position: absolute;
  left: -1px;
  top: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: inherit;
  background-color: rgba(255, 255, 255, 0.35);
}

.l-button.is-round {
  border-radius: 20px;
  padding: 12px 23px;
}

.l-button.is-circle {
  border-radius: 50%;
  padding: 12px;
}

.l-button--primary {
  color: #ffffff;
  background-color: #a1c4fd;
  border-color: #a1c4fd;
  border: 1px solid #a1c4fd;
}

.l-button--primary:focus,
.l-button--primary:hover {
  color: #ffffff;
  border-color: #a1c4fd;
  box-shadow: 2px 2px 5px 1px hsla(204, 67%, 65%, 0.5);
  transition: 0.5s;
}

.l-button--primary.is-active,
.l-button--primary:active {
  color: #fff;
  outline: 0;
  border-color: #a1c4fd;
  box-shadow: 2px 2px 5px 1px rgba(106, 178, 226, 0.5);
  transition: 0.5s;
}

.l-button--primary::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: radial-gradient(
    circle,
    rgb(15, 71, 90) 10%,
    transparent 10%
  );
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform 0.4s, opacity 1s;
}

.l-button--primary:active::after {
  opacity: 0.3;
  transform: scale(0, 0);
  transition: 0s;
}

.l-button--primary.is-active {
  color: #ffffff;
}

.l-button--primary.is-disabled,
.l-button--primary.is-disabled:active,
.l-button--primary.is-disabled:focus,
.l-button--primary.is-disabled:hover {
  color: #ffffff;
  background-color: #cbe0f0;
  border-color: #cbe0f0;
}

.l-button--success {
  color: #ffffff;
  background-color: #96bf47;
  border-color: #96bf47;
}

.l-button--success:focus,
.l-button--success:hover {
  color: #ffffff;
  border-color: #96bf47;
  box-shadow: 2px 2px 5px 1px rgba(135, 184, 3, 0.5);
  transition: 0.5s;
}

.l-button--success.is-active,
.l-button--success:active {
  color: #fff;
  border-color: #96bf47;
  box-shadow: 2px 2px 5px 1px rgba(135, 184, 3, 0.5);
  transition: 0.5s;
}

.l-button--success:active {
  outline: 0;
}

.l-button--success::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: radial-gradient(
    circle,
    rgb(18, 156, 64) 10%,
    transparent 10%
  );
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform 0.4s, opacity 1s;
}

.l-button--success:active::after {
  opacity: 0.3;
  transform: scale(0, 0);
  transition: 0s;
}

.l-button--success.is-disabled,
.l-button--success.is-disabled:active,
.l-button--success.is-disabled:focus,
.l-button--success.is-disabled:hover {
  color: #fff;
  background-color: #c8e2bc;
  border-color: #c8e2bc;
}

.l-button--warning {
  color: #fff;
  background-color: #f3a909;
  border-color: #f3a909;
}

.l-button--warning:focus,
.l-button--warning:hover {
  color: #fff;
  border-color: #f3a909;
  box-shadow: 2px 2px 5px 1px rgba(201, 155, 4, 0.5);
  transition: 0.5s;
}

.l-button--warning.is-active,
.l-button--warning:active {
  color: #fff;
  border-color: #f3a909;
  box-shadow: 2px 2px 5px 1px rgba(201, 155, 4, 0.5);
  transition: 0.5s;
}

.l-button--warning:active {
  outline: 0;
}

.l-button--warning::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: radial-gradient(
    circle,
    rgb(153, 106, 6) 10%,
    transparent 10%
  );
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform 0.4s, opacity 1s;
}

.l-button--warning:active::after {
  opacity: 0.3;
  transform: scale(0, 0);
  transition: 0s;
}

.l-button--warning.is-disabled,
.l-button--warning.is-disabled:active,
.l-button--warning.is-disabled:focus,
.l-button--warning.is-disabled:hover {
  color: #fff;
  background-color: #f3d19e;
  border-color: #f3d19e;
}

.l-button--danger {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}

.l-button--danger:focus,
.l-button--danger:hover {
  color: #fff;
  border-color: #f56c6c;
  box-shadow: 2px 2px 5px 1px rgba(219, 66, 5, 0.5);
  transition: 0.5s;
}

.l-button--danger.is-active,
.l-button--danger:active {
  color: #fff;
  border-color: #f56c6c;
  box-shadow: 2px 2px 5px 1px rgba(219, 66, 5, 0.5);
  transition: 0.5s;
}

.l-button--danger:active {
  outline: 0;
}

.l-button--danger::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: radial-gradient(
    circle,
    rgb(190, 42, 5) 10%,
    transparent 10%
  );
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform 0.4s, opacity 1s;
}

.l-button--danger:active::after {
  opacity: 0.3;
  transform: scale(0, 0);
  transition: 0s;
}

.l-button--danger.is-disabled,
.l-button--danger.is-disabled:active,
.l-button--danger.is-disabled:focus,
.l-button--danger.is-disabled:hover {
  color: #fff;
  background-color: #fab6b6;
  border-color: #fab6b6;
}

.l-button--info {
  color: #fff;
  background-color: #8eacc5;
  border-color: #8eacc5;
}

.l-button--info:focus,
.l-button--info:hover {
  color: #fff;
  border-color: #8eacc5;
  box-shadow: 2px 2px 5px 1px rgba(80, 131, 151, 0.5);
  transition: 0.5s;
}

.l-button--info.is-active,
.l-button--info:active {
  color: #fff;
  border-color: #8eacc5;
  box-shadow: 2px 2px 5px 1px rgba(80, 131, 151, 0.5);
  transition: 0.5s;
}

.l-button--info:active {
  outline: 0;
}

.l-button--info::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: radial-gradient(
    circle,
    rgb(76, 120, 145) 10%,
    transparent 10%
  );
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform 0.4s, opacity 1s;
}

.l-button--info:active::after {
  opacity: 0.3;
  transform: scale(0, 0);
  transition: 0s;
}

.l-button--info.is-disabled,
.l-button--info.is-disabled:active,
.l-button--info.is-disabled:focus,
.l-button--info.is-disabled:hover {
  color: #fff;
  background-color: #c5daeb;
  border-color: #c5daeb;
}

.l-button--medium {
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
}

.l-button--mini,
.l-button--small {
  font-size: 12px;
  border-radius: 3px;
}

.l-button--medium.is-round {
  padding: 10px 20px;
}

.l-button--medium.is-circle {
  padding: 10px;
}

.l-button--small,
.l-button--small.is-round {
  padding: 9px 15px;
}

.l-button--small.is-circle {
  padding: 9px;
}

.l-button--mini,
.l-button--mini.is-round {
  padding: 7px 15px;
}

.l-button--mini.is-circle {
  padding: 7px;
}

.l-button--text {
  border-color: transparent;
  color: #409eff;
  background: 0 0;
  padding-left: 0;
  padding-right: 0;
}

.l-button--text:focus,
.l-button--text:hover {
  color: #66b1ff;
  border-color: transparent;
  background-color: transparent;
}

.l-button--text:active {
  color: #3a8ee6;
  border-color: transparent;
  background-color: transparent;
}

.l-button--text.is-disabled,
.l-button--text.is-disabled:focus,
.l-button--text.is-disabled:hover {
  border-color: transparent;
}
</style>