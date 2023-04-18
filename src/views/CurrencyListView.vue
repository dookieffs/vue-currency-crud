<script setup lang="ts">
    import store from '@/store';
    import AddEditCurrency from './AddEditCurrencyView.vue';
import { PropType } from 'vue';
</script>
<template>
    <VCard>
        <VLayout>
            <VMain style="height: calc(100vh - 64px)">
                <VCard>
                    <VCardTitle>
                        <div class="m24">
                            <div class="st-title">Currencies</div>

                            <v-text-field
                                v-model="searchTerm"
                                density="compact"
                                variant="solo"
                                label="Search"
                                prepend-inner-icon="mdi-magnify"
                                single-line
                                hide-details
                                class="st-input"
                            ></v-text-field>
                        </div>
                        <VBtn class="m24 ttci" color="primary" prepend-icon="mdi-plus" @click="addItem">
                            Add Currency
                        </VBtn>
                    </VCardTitle>
                    <VCardText>
                        <div class="table">
                            <div class="row header">
                                <div class="cell">Currency name</div>
                                <div class="cell">Currency code</div>
                                <div class="cell">Currency symbol</div>
                                <div class="cell"></div>
                            </div>
                            <div v-if="filteredItems.length > 0" v-for="(item, index) in filteredItems" :key="item.id"  class="row body" @click="editItem($event.target, item)">
                                <div class="fwb cell">
                                    {{ item.isoName }}
                                </div>
                                <div class="cell">
                                    {{ item.isoMark }}
                                </div>
                                <div class="cell">
                                    {{ item.symbol }}
                                </div>
                                <div class="cell">
                                    <VListItemAction>
                                        <img src="../assets/delete.svg" class="crp" @click="deleteItem(item)">
                                    </VListItemAction>
                                </div>
                            </div>
                            <div v-else style="text-align: center; padding: 24px; color: #666666;">
                                There are no currencies added
                            </div>
                        </div>
                    </VCardText>
                </VCard>
            </VMain>
            <VNavigationDrawer v-model="drawer" :width="440" location="right">
                <AddEditCurrency v-if="selectedItem" :editItem="selectedItem" />
                <AddEditCurrency v-else />
            </VNavigationDrawer>
        </VLayout>
    </VCard>
</template>

<script lang="ts">
import { Item } from '../interfaces'
import { toggleActive } from '../plugins/helpers'
  export default {
    name: 'CurrencyListView',
    data()
    {
        return { selectedItem: {
            id: 0,
            isoName: '',
            isoMark: '',
            symbol: '',
            } as Item,
            searchTerm: '' };
    },
    computed: 
    {
        items() 
        {
            return store.state.items;
        },
        drawer()
        {
            return store.state.drawer;
        },
        filteredItems(): Item[] {
        const term = this.searchTerm.toLowerCase().trim();
        return this.items.filter((item) =>
            item.isoName.toLowerCase().includes(term) ||
            item.isoMark.toLowerCase().includes(term) ||
            item.symbol.toLowerCase().includes(term)
        );
        }
    },
    methods: {
        editItem(target: any, item: Item)
        {
            toggleActive(target);
            this.selectedItem = item;
            store.commit('toggleDrawer', true);
        },
        addItem()
        {
            this.selectedItem = {
                                    id: 0,
                                    isoName: '',
                                    isoMark: '',
                                    symbol: '',
                                };

            toggleActive(null);

            store.commit('toggleDrawer', true);
        },
        deleteItem: (item: Item) =>
        {
            if (confirm('Are you sure?'))
            {
                store.commit('removeItem', item);
            }

            store.commit('toggleDrawer', false);
        },
        toggleDrawer: () =>
        {
            store.commit('toggleDrawer', true);
        }
    }
  }
</script>

<style lang="scss">
.st-list-head
{
    border-bottom: 1px solid #00000012;
    & div
    {
        text-transform: uppercase;
        font-size: 11px;
        color: #666666;
    }
    
}
.v-main
{
    .v-card
    {
        height: calc(100vh - 64px);
    }
}


.v-list-item-title
{
    display: flex !important;
    justify-content: space-between;
}
.v-card-title
{
    display: flex !important;
    justify-content: space-between;
    padding: 8px !important;
    div.st-title
    {
        font-size: 28px;
        font-weight: bold;
        padding-bottom: 24px;
    }
}

.v-field--variant-solo
{
    border: 1px solid #CCCCCC;
}

.st-input
{
    width: 300px;
    .v-field
    {
        box-shadow: none !important;
    }
}

.table {
  display: flex;
  flex-direction: column;
  border-collapse: collapse;
}

.row {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #00000012;
    margin-left: 16px;
    margin-right: 16px;
    &.body
    {
        &:hover, &.active
        {
            cursor: pointer;
            background: rgba(0, 0, 0, 0.03);
        }
    }
}

.header {
  margin-left: 16px;
    margin-right: 16px;
    color: #666666;
    text-transform: uppercase;
}

.cell {
  padding: 10px;
  flex: 1;
  text-align: center;
  text-align: left;
}

.cell:first-child {
    flex: 2;
    border-left: none;
}

.cell:last-child {
    flex-direction: row-reverse;
    display: flex;
    border-right: none;
}
</style>