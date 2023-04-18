<template>
    <div>
        <div class="st-form-header">
            <div>
                <v-icon class="st-close-btn" @click="closeForm($refs.addEditForm as HTMLFormElement)">mdi-close</v-icon>
                <div v-if="editItem.id == 0" class="fwb">
                    Add currency
                </div>
                <div v-else class="fwb">
                    Edit currency
                </div>
            </div>
            <div>
                <v-btn inline-block class="mt-2 ttci b-1-gray" @click="closeForm($refs.addEditForm as HTMLFormElement)">Cancel</v-btn>
                <v-btn v-if="editItem.id == 0" color="primary" inline-block class="mt-2 ml-2 ttci" @click="addItem(isoName, isoMark, symbol, $refs.addEditForm as HTMLFormElement)">Add</v-btn>
                <v-btn v-else color="primary" inline-block class="mt-2 ttci ml-2" @click="saveItem(id, isoName, isoMark, symbol, $refs.addEditForm as HTMLFormElement)">Save</v-btn>
            </div>
        </div>
        <div style="padding-top: 30px;">
            <v-form ref="addEditForm">

                <div class="st-form-label">Currency name</div>
                <v-text-field v-model="isoName" placeholder="Add name" :rules="isoNameRules" required 
                                density="compact"
                                variant="solo"
                                single-line
                                class="st-input-form"></v-text-field>
                <div class="st-form-label">Currency code</div>
                <v-text-field  v-model="isoMark" placeholder="e.g. USD" :rules="isoMarkRules" required  density="compact"
                                variant="solo"
                                single-line
                                class="st-input-form"></v-text-field>
                <div class="st-form-label">Currency symbol</div>
                <v-text-field  v-model="symbol" placeholder="Add symbol" :rules="symbolRules" required density="compact"
                                variant="solo"
                                single-line
                                class="st-input-form"></v-text-field>
            </v-form>
        </div>
    </div>
</template>
<script lang="ts">
import store from '../store'
import { defineComponent, PropType, Ref, ref, watch } from 'vue'
import { Item } from '../interfaces'
import { toggleActive } from '@/plugins/helpers';


    export default  defineComponent({
        name: 'AddEditCurrency',
        props:
        {
            editItem: {
                type: Object as PropType<Item>,
                default: {
                    id: 0,
                    isoName: '',
                    isoMark: '',
                    symbol: '',
                }
            }
        },
        setup(props)
        {
            const isoName = ref(''),
                    isoMark = ref(''),
                    id = ref<number>(0),
                    symbol = ref(''),
                    addEditForm = ref<HTMLFormElement | null>(null);
            
            watch(() => props.editItem, () => {
                        id.value = props.editItem.id
                        isoName.value = props.editItem.isoName
                        isoMark.value = props.editItem.isoMark
                        symbol.value = props.editItem.symbol
                },
                { deep: true }
            );

            const isoNameRules = [
                                    (v: string) => !!v || 'ISO Name is required',
                                    (v: string) => !/[^\w]/.test(v) || 'Only letters, numbers, and underscore allowed',
                                ];

            const isoMarkRules = [
                                    (v: string) => !!v || 'ISO Mark is required',
                                    (v: string) => v.length === 3 || 'ISO Mark must be exactly 3 characters long',
                                    (v: string) => !/[^\w]/.test(v) || 'Only letters, numbers, and underscore allowed',
                                ];

            const symbolRules = [
                                    (v: string) => !!v || 'Symbol is required',
                                ];

            return {
                id,
                isoName,
                isoNameRules,
                isoMark,
                isoMarkRules,
                symbol,
                symbolRules,
                addEditForm
            }
        },
        data ()
        {
            return { 
                id: {
                    default: 0,
                    value: this.$props.editItem.id
                },
                isoName: {
                    default: '',
                    value: this.$props.editItem.isoName
                },
                isoMark: {
                    default: '',
                    value: this.$props.editItem.isoMark
                },
                symbol: {
                    default: '',
                    value: this.$props.editItem.symbol
                },
                addEditForm: ref<HTMLFormElement | null>(null)
            }
        },
        methods: {
            addItem(isoName: string, isoMark: string, symbol: string, addEditForm: HTMLFormElement | null) 
            {
               toggleActive(null);

                if (addEditForm != null && addEditForm.checkValidity())
                {
                    store.commit('addItem', { id: new Date().getTime(), isoName: isoName, isoMark: isoMark, symbol: symbol });
                    store.commit('toggleDrawer', false);
                    if (addEditForm != null)
                    {
                        addEditForm.resetValidation();
                    }
                }
                else if (addEditForm != null)
                {
                    addEditForm.validate();
                }
            },
            saveItem(id: number, isoName: string, isoMark: string, symbol: string, addEditForm: HTMLFormElement | null)
            {
                let objSaveItem = {
                    id: id,
                    isoName: isoName,
                    isoMark: isoMark,
                    symbol: symbol,
                } as Item;

               toggleActive(null)

               if (addEditForm != null && addEditForm.checkValidity())
               {
                store.commit('saveItem', objSaveItem);
                store.commit('toggleDrawer', false);
               }
            },
            closeForm(addEditForm: HTMLFormElement | null)
            {
                this.$data.id.value = 0;
                this.$data.isoName.value =  '';
                this.$data.isoMark.value = '';
                this.$data.symbol.value = '';
                
                if (addEditForm != null)
                {
                    addEditForm.resetValidation();
                }
                toggleActive(null);
                store.commit('toggleDrawer', false);
            }
        },
      requiredRule: [(v: string) => !!v || 'Field is required'],
      isoMarkRule: [
        (v: string) => !!v || 'Field is required',
        (v: string) => v.length === 3 || 'ISO Mark must be 3 characters'],
    })
</script>

<style lang="scss">
.st-form-header
{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 24px;
    padding-left: 21px;
    & div
    {
        display: flex;
    }
    .st-close-btn
    {
        margin-right: 12px;
    }
}
.v-form
{
    padding-left: 24px;
    padding-right: 24px;
    .st-form-label
    {
        padding-bottom: 2px;
        color: #141414;
        font-size: 14px;
    }
}

.v-btn.b-1-gray
{
    border:1px solid #CCCCCC !important;
}
</style>