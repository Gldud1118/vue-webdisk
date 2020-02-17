<template>
    <div class="dt-login--container">
            <!-- Login Content -->
            <div class="dt-login__content-wrapper">

                <!-- Login Background Section -->
                <div class="dt-login__bg-section">
                    <div class="dt-login__bg-content">
                        <img src="@/assets/images/auth.svg">
                    </div>
                    <!-- Brand logo -->
                    <div class="dt-login__logo">
                        <span class="dt-brand__logo"><a href="javascript:void(0)" class="dt-brand__logo-link" style="color: rgb(1, 104, 250);"><span style="color: rgb(3, 26, 97);">chu</span>disk </a></span>
                    </div>
                    <!-- /brand logo -->
                </div>
                <!-- /login background section -->

                <!-- Login Content Section -->
                <div class="dt-login__content">
                    <!-- Login Content Inner -->
                    <div class="dt-login__content-inner">
                        <h1>Sign In</h1>
                        <!-- <p class="">Welcome back! Please signin to continue.</p> -->
                        <!-- Form -->
                        <form @submit.prevent="onSubmit">
                            <!-- Form Group -->
                            <div class="form-group">
                                <label for="email">Email address</label>
                                <input type="email" class="form-control" id="email" v-model="email" autofocus placeholder="youremail@email.com">
                            </div>
                            <!-- /form group -->

                            <!-- Form Group -->
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="password" v-model="password" placeholder="Enter your password" >
                            </div>
                            <!-- /form group -->
                            <!-- Form Group -->
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-block text-uppercase" :disabled="invalidForm">Login</button>
                               
                            </div>
                            <!-- /form group -->
                        </form>
                        <!-- /form -->
                    </div>
                    <!-- /login content inner -->
                </div>
                <!-- /login content section -->

            </div>
            <!-- /login content -->

        </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    data(){
        return{
            email : "test@test.com",
            password : "1234",
            error : "",
            rPath : ""
        }
    },
    computed :{
        invalidForm(){
            return !this.email || !this.password
        }
    },
    created() {
        this.rPath = this.$route.query.rPath || '/'
    },
    methods : {
        ...mapActions(['LOGIN']),
        onSubmit(){
            this.LOGIN({email : this.email , password : this.password})
            .then(_ => this.$router.push(this.rPath))
            
        }
    }
}
</script>