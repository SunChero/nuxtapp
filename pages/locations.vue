<template>

  <v-card>
    <v-card-title>
      <v-btn color="primary"  class="mb-2">Save Locations</v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn>
      
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Dessert name" v-model="editedItem.name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Calories" v-model="editedItem.calories"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Fat (g)" v-model="editedItem.fat"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Carbs (g)" v-model="editedItem.carbs"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Protein (g)" v-model="editedItem.protein"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="items"
      :loading=loading
      class="elevation-1"
      item-key="ServerRelativeUrl"
      :search="search"
    >
    <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded ">
          <td><a :href="url(props.item.ServerRelativeUrl)">{{ props.item.LocationName.Label }}</a></td>
          <td class="text-xs-right">{{ props.item.MainPhone }}</td>
          <td class="text-xs-right">{{ props.item.Email }}</td>
          <td class="text-xs-right">{{ props.item.District.Label }}</td>
          <td class="text-xs-right">{{ props.item.LocationCategory }}</td>
          <td class="text-xs-right">{{ props.item.Neighbourhood.Label }}</td>
          <td class="text-xs-right">{{ props.item.Sector.Label }}</td>
          <td class="justify-center layout px-0">
            <v-btn icon class="mx-0" @click="editItem(props.item)">
              <v-icon color="teal">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="deleteItem(props.item)">
              <v-icon color="pink">delete</v-icon>
            </v-btn>
          </td>
        </tr>
        
      </template>
      <template slot="expand" slot-scope="props">
        <v-card flat>
          <v-card-text>{{props.item}}</v-card-text>
        </v-card>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>
<script>

import {mapState , mapMutations , mapActions} from 'vuex'
  export default {
    data: () => ({
      dialog: false,
      search : '',
      headers: [
        {
          text: 'LocationName',
          align: 'left',
          sortable: false,
          value: 'Location'
        },
        { text: 'Phone', value: 'MainPhone' },
        { text: 'Email', value: 'Email' },
        { text: 'District', value: 'District.Label' },
        { text: 'Category', value: 'LocationCategory' },
        { text: 'Neighbourhood', value: 'Neighbourhood.Label' },
        { text: 'Sector', value: 'Sector.Label' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
        ...mapState(['items' , 'loading', 'db'])
 
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.$store.dispatch('fetchLocations')
    },

    methods: {
      url(partial){
        return "https://www.laval.ca" + partial;
      },
      initialize () {
        this.items = [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0
          },
         
        ]
      },

      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.items.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.close()
      },
      ...mapActions(['saveDb', 'fetchLocations'])
    }
  }
</script>


