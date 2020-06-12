<template>
  <v-app>
    <v-app-bar app color="secondary" fixed>
      <span>jsDelivr</span>
      <v-spacer></v-spacer>
      <Search />
    </v-app-bar>

    <v-main>
      <v-container>
        <PackagesTable />
        <Footer />
      </v-container>
    </v-main>
    <PackageDetails />
  </v-app>
</template>

<script>
import Search from './components/Search';
import PackagesTable from './components/PackagesTable';
import PackageDetails from './components/PackageDetails';
import Footer from './components/Footer';

export default {
  name: 'App',

  components: {
    Search,
    PackagesTable,
    PackageDetails,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>
