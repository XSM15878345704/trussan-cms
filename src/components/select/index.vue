<!-- 封装select，不用再写el-option了 ^_^ -->

<template>
  <el-select class="a-select" @input="handleChange" v-bind="$props">
    <el-option v-if="showUnlimited" value="" label="不限"></el-option>
    <el-option
      v-for="(opt, index) in computedOpts"
      :key="index"
      :value="genValue(opt)"
      :label="genLabel(opt)"
      :disabled="opt.disabled">
    </el-option>
  </el-select>
</template>

<script>
import { Select } from 'element-ui'

export default {
  name: 'a-select',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    showUnlimited: {
      type: Boolean,
      default: false,
    },
    options: {
      type: [Array, String],
      required: true,
    },
    ...Select.props,
  },
  data() {
    return {

    }
  },
  computed: {
    computedOpts() {
      if (typeof this.options === 'string' && this.options) {
        return this[this.options]
      }
      return this.options
    },
  },
  mounted() {

  },
  methods: {
    handleChange(v) {
      this.$emit('change', v)
    },

    /**
     * 生成el-option 的 value值，没value就用label代替
     * @param {Object} opt { value [, label] }
     * @return
     ** */
    genValue(opt) {
      return opt.value === undefined ? opt : opt.value
    },

    // 生成el-option的 label值, 默认是 value 值
    genLabel(opt) {
      let ret = ''
      if (opt.label === undefined) {
        ret = (opt.value === undefined ? opt : opt.value)
      } else {
        ret = opt.label
      }
      return ret
    },
  },
}
</script>
