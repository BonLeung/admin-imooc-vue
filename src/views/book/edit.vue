<template>
  <div>
    <Detail :is-edit="isEdit" />
  </div>
</template>

<script>
import Detail from './components/Detail'

export default {
  components: {
    Detail
  },
  data() {
    return {
      isEdit: true
    }
  }
}
</script>
