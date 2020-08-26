<template>
  <div class="login-container">
    <el-form ref="signUpForm" :model="signUpForm" :rules="signUpRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">
        {{ $t('Sign Up') }}
      </h3>
      <lang-select class="set-language" />
      <el-form-item prop="fName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="signUpForm.fname" name="fName" type="text" auto-complete="on" :placeholder="$t('First Name')" />
      </el-form-item>
      <el-form-item prop="lname">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="signUpForm.lname" name="lname" type="text" auto-complete="on" :placeholder="$t('Last Name')" />
      </el-form-item>
      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="signUpForm.email" name="email" type="text" auto-complete="on" :placeholder="$t('login.email')" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          v-model="signUpForm.password"
          :type="pwdType"
          name="password"
          auto-complete="on"
          placeholder="password"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleSignUp">
          Sign up
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import LangSelect from '@/components/LangSelect';
import { validEmail } from '@/utils/validate';
import { signup } from '@/api/auth';

export default {
  name: 'SignUp',
  components: { LangSelect },
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error('Please enter the correct email'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('Password cannot be less than 4 digits'));
      } else {
        callback();
      }
    };
    return {
      signUpForm: {
        fname: '',
        lname: '',
        name: '',
        email: '',
        password: '',
      },
      signUpRules: {
        fname: [{ required: true, trigger: 'blur' }],
        lname: [{ required: true, trigger: 'blur' }],
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = '';
      } else {
        this.pwdType = 'password';
      }
    },
    handleSignUp() {
      this.$refs.signUpForm.validate(valid => {
        if (valid) {
          this.signUpForm.name = this.signUpForm.fname + '  ' + this.signUpForm.lname;
          this.loading = true;
          const { data } = signup(this.signUpForm);
          console.log(data);
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  height: 120%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: auto auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .set-language {
    color: #fff;
    position: absolute;
    top: 40px;
    right: 35px;
  }
}
</style>
