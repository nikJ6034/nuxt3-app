<script lang="ts" setup>

</script>

<template>
    <div class="container-fluid h-100 p-0">
      <div class="row g-0 admin-layout-header">
        <LayoutsHeaderAdminHeader></LayoutsHeaderAdminHeader>
      </div>
      <div class="row g-0">
        <div class="col-auto admin-layout-left">
          <LayoutsLeftAdminLefter></LayoutsLeftAdminLefter>
        </div>
        <div class="col">
          <slot />
        </div>
      </div>
      <LayoutsFooterAdminFooter></LayoutsFooterAdminFooter>
    </div>
</template>

<style lang="scss">
  .admin-layout-header {background-color: #43a7ff;}
  .admin-layout-left {background-color: #1e3f5d; width:290px; max-width: 290px; z-index: 1;}
</style>