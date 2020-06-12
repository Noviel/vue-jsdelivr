<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        jsDelivr
      </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <Search />
        <VersionsTable />
      </v-container>
    </v-main>
    <PackageDetails />
  </v-app>
</template>

<script>
import Search from './components/Search';
import VersionsTable from './components/VersionsTable';
import PackageDetails from './components/PackageDetails';

export default {
  name: 'App',

  components: {
    Search,
    VersionsTable,
    PackageDetails,
  },

  data: () => ({
    //
  }),
};
</script>
