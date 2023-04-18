<template>
    <div class="d-flex align-center justify-center st-login-background" style="height: 100vh">
        <v-sheet width="400" class="mx-auto st-login-widget">
            <img src="../assets/menu.svg" />
            <div class="st-widget-title">
                <div>
                    Sign in
                </div>
                <div>
                    Please enter your email and password
                </div>
            </div>
            <v-form fast-fail @submit.prevent="handleSubmit">
                <v-text-field  v-model="email" density="compact"
                                variant="solo"
                                placeholder="Your email address"
                                single-line
                                class="st-input-form"></v-text-field>

                <v-text-field type="password" v-model="password" density="compact"
                                variant="solo"
                                placeholder="Password"
                                single-line
                                class="st-input-form"></v-text-field>

                <v-btn type="submit" color="primary" block class="mt-2">Sign in</v-btn>
            </v-form>
        </v-sheet>
    </div>
</template>
<script lang="ts">
import store from '../store'

export default {
    name: 'Login',
    data() {
        return {
        email: '',
        password: ''
        }
    },
    computed: {
        isLoggedIn() {
        return store.getters.isLoggedIn;
        }
    },
    methods: {
        handleSubmit() {
            // Perform login logic here, then update the store's state
            if (this.email == 'admin@mail.com' && this.password == 'password')
            {
                console.log('login succ');
                store.commit('login')
                this.$router.push({ name: 'Dashboard' })
            }
        },
        handleLogout()
        {
            store.commit('logout')
            this.$router.push({ name: 'Login' })
        }
    }
}
</script>


<style lang="scss">
.st-login-background
{
    background: url("../assets/bg.svg") no-repeat center center fixed;
    background-size: cover;
    overflow: hidden;
}
.st-login-widget
{
    margin: auto;
    padding: 40px;
    gap: 24px;

    width: 376px;
    height: 400px;
    margin: auto;
    background: #FFFFFF;
    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.05), 0px 5px 20px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}
.st-widget-title
{
    padding-top: 24px;
    padding-bottom: 24px;

    & div
    {
        color: #141414;
        font-weight: bold;
        font-size: 22px;

        & + div
        {
            font-size: 14px;
            padding-top: 4px;
            font-weight: normal;
        }
    }
}
</style>