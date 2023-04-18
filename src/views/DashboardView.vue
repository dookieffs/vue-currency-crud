
<script setup lang="ts">
    import AnalyticsIcon from '../components/icons/menu-analytics.vue'
    import OffersIcon from '../components/icons/menu-offers.vue'
    import LoyaltyIcon from '../components/icons/menu-loyalty.vue'
    import CurrenciesIcon from '../components/icons/menu-currencies.vue'
    import DispatchIcon from '../components/icons/menu-dispatch.vue'
    import ConfigurationsIcon from '../components/icons/menu-configurations.vue'
    import CurrencyListView from './CurrencyListView.vue'
</script>
<template>
    <v-card>
        <v-layout>
            <v-app-bar>
                <v-app-bar-title>
                    <div class="st-col">
                        <div class="st-app-bar-icon">A</div>
                    </div>
                    <div class="st-col">
                        <span>Brand name</span>
                        <div class="st-app-bar-subtitle">All Stores</div>
                    </div>
                </v-app-bar-title>
                <img class="st-top-bar-item" src="../assets/bell.svg" />
                <img class="st-top-bar-item" src="../assets/user.svg" />
                <v-icon class="st-top-bar-item" @click="handleLogout">mdi-logout</v-icon>
            </v-app-bar>
            <v-navigation-drawer>
                <v-list color="transparent">
                    <v-list-item
                        v-for="item in menuItems"
                        :key="item.title"
                        :to="item.route"
                        class="st-menu"
                        >
                            <component :is="item.icon" />
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-main style="min-height: 300px;">
                <CurrencyListView/>
            </v-main>
        </v-layout>
    </v-card>
</template>
<script lang="ts">
    import store from '../store'
    export default {
    name: 'Dashboard',
    components: {
        AnalyticsIcon,
        OffersIcon,
        LoyaltyIcon,
        CurrenciesIcon,
        DispatchIcon,
        ConfigurationsIcon
    },
    data()
    { return { menuItems: [
                            { title: 'Analytics', route: '', icon: 'AnalyticsIcon' },
                            { title: 'Offers', route: '', icon: 'OffersIcon' },
                            { title: 'Loyalty', route: '', icon: 'LoyaltyIcon' },
                            { title: 'Currencies', route: '/dashboard', icon: 'CurrenciesIcon' },
                            { title: 'Dispatch', route: '', icon: 'DispatchIcon' },
                            { title: 'Configurations', route: '', icon: 'ConfigurationsIcon' },
                        ]}
    },
    methods: {
        handleLogout()
        {
            store.commit('logout')
            this.$router.push({ name: 'Login' })
        }
    }
}
</script>
<style lang="scss">

.v-list-item-title
{
    display: inline-block;
}

header.v-app-bar.v-toolbar:not(.v-toolbar--flat)
{
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
}
.st-icon-color
{
    float: left;
    margin-right: 13px;
}

.v-list-item
{
    margin-left: 12px;
    margin-right: 12px;
    padding-inline-start: 13px !important;
    padding-inline-end: 13px !important;
    & div.v-list-item-title
    {
        color: #141414;
    }
    & div
    {
        fill: #808080;
        color: #808080;
    }
    &--active
    {
        background: #FF660012;
        div
        {
            color: #FF6600 !important;
            fill: #FF6600;
            font-weight: bold;
        }
    }
}

.v-toolbar__content
{
    height: 60px !important;
    .st-top-bar-item
    {
        margin-left: 12px;
        margin-right: 12px;
        &:last-child
        {
            color: #808080;
            padding-right: 10px;
        }
    }
    div.v-app-bar-title
    {
        margin-inline-start: 21px;
        div.v-toolbar-title__placeholder
        {
            display: flex;
            color: #666666;
            font-size: 11px;
            line-height: 1.5;
            div.st-col
            {
                display: flex;
                flex-direction: column;
                & span
                {
                    text-transform: uppercase;
                }
                div.st-app-bar-icon
                {
                    height: 32px;
                    width: 32px;
                    border-radius: 32px;
                    background: #FF6600;
                    font-size: 17px;
                    text-align: center;
                    color: white;
                    line-height: 1.8;
                    margin-right: 10px;
                }
                div.st-app-bar-subtitle
                {
                    display: block;
                    font-weight: bold;
                    font-size: 14px;
                    line-height: 1.4;
                    color: #141414;
                }
            }
        }
    }
}
</style>