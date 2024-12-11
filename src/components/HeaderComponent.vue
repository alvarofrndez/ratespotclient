<script setup>
    import { userStore } from '@/stores/user'
    import { toastStore } from '@/stores/toast'

    const user_s = userStore()
    const toast_s = toastStore()

    function logout(){
        user_s.logout()
        toast_s.show('sesión cerrada', 'success')
    }
</script>

<template>
    <header>
        <nav>
            <ul>
                <li>
                    <router-link to="/">
                        <icon name='hi-solid-home'/>
                    </router-link>
                </li>
                <li>
                    <router-link to="/spots">
                        <icon name='md-locationon-sharp'/>
                    </router-link>
                </li>
                <li>
                    <icon @click='logout' name='ri-login-circle-fill' flip='horizontal'/>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    header {
        // size
        width: 100%;
        height: 10%;

        // position
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 1000;

        // display
        @include flex();

        // decoration
        background-color: $h-c-background;
        border-top: 1px solid $h-c-border;

        nav{
            // size
            width: 70%;
            height: 50%;

            // display
            @include flex();

            ul{
                // size
                width: 100%;
                height: 100%;

                // display
                @include flex(row, center, space-around, .5rem);

                li{
                    // size
                    width: min-content;
                    height: min-content;

                    // display
                    @include flex();

                    // margin
                    padding: .5rem;

                    a{
                        // display
                        @include flex();
                    }
                }
            }
        }
    }
</style>